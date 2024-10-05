# tiny-context

A minimal implementation of the web components [context protocol](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md).

This allows for state management and dependency injection in a vanilla web components project in a way that's compatible with third party web components that adhere to the context protocol.

Part of the [Plain Vanilla Web](https://plainvanillaweb.com) project.

There are other implementations of this protocol:
- [@lit/context](https://lit.dev/docs/data/context/)
- [wc-context](https://blikblum.github.io/wc-context/)

## Using

Drop `tiny-context.js` somewhere in your project.

Provide a value from a custom element:

```js
import { ContextProvider } from './tiny-context.js';

class extends HTMLElement {
    themeProvider = new ContextProvider(this, 'theme', 'light');

    ...

    toggleTheme() {
        this.themeProvider.value = this.themeProvider.value === 'light' ? 'dark' : 'light'
    }
}
```

Subscribe to a value from a custom element that is a descendant of the provider's element:

```js
import { ContextRequestEvent } from './tiny-context.js';

class extends HTMLElement {
    #unsubscribe;
    connectedCallback() {
        this.dispatchEvent(new ContextRequestEvent(
            /* context = */ 'theme', 
            /* callback = */ (theme, unsubscribe) => {
                /* do something with theme value */
                this.#unsubscribe = unsubscribe;
            },
            /* subscribe = */ true
        ));
    }
    disconnectedCallback() {
        this.#unsubscribe?.();
    }
}
```

The callback will be called once on subscribe, and every time that the provider's value changes.

It is recommended to subscribe to values from connectedCallback and to unsubscribe from disconnectedCallback.
Subscribing multiple times without unsubscribing will call the callback multiple times.

To fetch a value only once, pass `false` as the (third) subscribe parameter. 
No unsubscribe function will be provided to the callback.

## Example

Run the `example` folder as a static site and browse to it:

```sh
npx http-server example
```

The examples shows a provider, a one-time consumer and a subscribed consumer.
