import { ContextProvider, ContextRequestEvent } from "../tiny-context.js";

customElements.define('theme-panel', class extends HTMLElement {
    themeProvider = new ContextProvider(this, 'theme', 'light');
    toggleProvider = new ContextProvider(this, 'theme-toggle', () => {
        this.themeProvider.value = this.themeProvider.value === 'light' ? 'dark' : 'light';
    });

    #unsubscribe;

    connectedCallback() {
        this.dispatchEvent(new ContextRequestEvent('theme', (theme, unsubscribe) => {
            this.className = 'panel-' + theme;
            this.#unsubscribe = unsubscribe;
        }, true));
    }

    disconnectedCallback() {
        this.#unsubscribe?.();
    }
});

customElements.define('theme-toggle', class extends HTMLElement {

    #unsubscribe;

    connectedCallback() {
        this.innerHTML = '<button>Toggle</button>';
        this.dispatchEvent(new ContextRequestEvent('theme-toggle', (toggle) => {
            this.querySelector('button').onclick = toggle;
        }));
        this.dispatchEvent(new ContextRequestEvent('theme', (theme, unsubscribe) => {
            this.querySelector('button').className = 'button-' + theme;
            this.#unsubscribe = unsubscribe;
        }, true));
    }

    disconnectedCallback() {
        this.#unsubscribe?.();
    }
});

window.reparent = () => {
    const toggle = document.querySelector('theme-toggle');
    const first = document.querySelector('theme-panel#first');
    const second = document.querySelector('theme-panel#second');
    if (toggle.parentNode === second) {
        first.append(toggle);
    } else {
        second.append(toggle);
    }
}