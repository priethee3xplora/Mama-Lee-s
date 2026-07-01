---
name: Sweet Crumbs component architecture
description: How the bakery SPA loads HTML components and wires JS globals — critical ordering constraint
---

`src/js/main.js` fetches all component HTML files via `fetch('/components/*.html')` and injects them into `#header`, `#app`, and `#footer` divs. Only after all fetches resolve does it call render functions and bind `window.*` globals.

**Why:** Inline `onclick="switchTab(...)"` handlers in the component HTML fire against `window.switchTab`. If the window binding happens before the HTML is injected (e.g. in a module-level side effect), the DOM elements don't exist yet. If it happens after, the handlers work correctly.

**How to apply:** Always keep `window.* = fn` assignments at the bottom of `init()` in `main.js`, after all `loadComponent()` awaits complete. Never move them to module-level or DOMContentLoaded on individual modules.

Shared mutable state lives in `src/js/state.js` as a plain object export. All modules import from it directly — no event emitter needed for this scale.
