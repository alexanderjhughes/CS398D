/**
 * Author: xhughes
 *
 * Notice: Github Copilot was used for autocomplete on this file
 * but was not used for suggestions or code generation. All code
 * was written by the author. For example, the first and last
 * elemnt in the routes object was written by the author and then
 * Copilot was used to autocomplete the middle element.
 *
 */

/* ------------------------------------------ Constants ----------------------------------------- */

/**
 * Routes
 */
const routes = {
    '': {
        'hash': '',
        'title': 'Alexander Hughes',
        'template': 'home.html',
    },
    'home': {
        'hash': '',
        'title': 'Alexander Hughes',
        'template': 'home.html',
    },
    'proj1': {
        'hash': '/proj1',
        'title': 'AH - Project 1',
        'template': 'proj1.html',
    },
};

/* ------------------------------------------ Functions ----------------------------------------- */

/**
 * Get the current route
 *
 * @returns {Object} current route
 */
const getCurrentRoute = () => {
    let view = location.hash.slice(2);
    console.log(view);
    if (!(view in routes)) {
        console.log(view);
        view = '';
    }
    return routes[view];
};

/**
 * Sets and retrieves the header
 *
 * @returns {Promise} header
 */
const header = async () => {
    const headerHTML = await fetch('./src/header.html').then(r => r.text());
    let header = document.getElementById('header');
    header.innerHTML = headerHTML;
    return header;
};

/**
 * Sets and retrieves the current body
 *
 * @returns {Promise} body
 */
const body = async () => {
    const route = getCurrentRoute();
    let template = route['template'];
    let title = route['title'];
    const bodyHTML = await fetch(`./src/${template}`).then(r => r.text());
    let body = document.getElementById('app');
    body.innerHTML = bodyHTML;
    document.title = title;
    return body;
};

/**
 * Sets and retrieves the given body template
 *
 * @returns {Promise} body
 */
const setBody = async (template) => {
    const bodyHTML = await fetch(`./src/${template}`).then(r => r.text());
    let body = document.getElementById('app');
    body.innerHTML = bodyHTML;
    return body;
};

/**
 * Switch the current view
 *
 * @param {*} view
 *
 */
const _switchView = (view) => {
    if (!(view in routes)) {
        view = '';
    }
    let hash = routes[view]['hash'];
    location.hash = hash;
};

/**
 * Update the current view
 *
 */
const _updateView = () => {
    const route = getCurrentRoute();
    let title = route['title'];
    document.title = title;
    console.log(route);
    setBody(route['template']);
};

/* -------------------------------------------- Main -------------------------------------------- */

/**
 * Main function to load the app
 *
 */
const app = async () => {
    await header();
    await body();

    document.addEventListener("click", e => {
        if (e.target.matches("[data-view]")) {
            e.preventDefault();
            _switchView(e.target.dataset.view);
            _updateView();
        };
    });
};

// Load the app
document.addEventListener("DOMContentLoaded", app);