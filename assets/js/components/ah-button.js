// TODO: Add event listener and debouncer to button and dispatch event
class AHButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.initialPropValues();
        this.shadowRoot.innerHTML = `
            <style>
                .button {
                    width: 5.5rem;
                    height: 2rem;
                    background-color: ${this.backgroundColor};
                    color: ${this.color};
                    font-weight: bold;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                @media screen and (min-width: 768px) {
                    .button {
                        width: 10rem;
                        height: 3rem;
                    }
                }
            </style>
            <div class="button" id="button">${this.buttonText}</div>
        `;
    }

    static get tagName() {
        return "ah-button";
    }

    static get attributes() {
        return {
            buttonText: "buttonText",
        };
    }

    static get observedAttributes() {
        return Object.values(AHButton.attributes);
    }

    initialPropValues() {
        this.buttonText = this.getAttribute("button-text") || "Button";
        this.color = this.getAttribute("color") || "white";
        this.backgroundColor = this.getAttribute("background-color") || "rgb(0, 183, 255)";
    }
}

window.customElements.define(AHButton.tagName, AHButton);

export default AHButton;