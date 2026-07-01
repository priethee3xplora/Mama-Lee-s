# Sweet Crumbs Bakery — Mama Lee's

A homemade bakery website for Sweet Crumbs (run by Sarah Rakhunwana), based in Pretoria, South Africa. Features a full single-page app experience with tabs for Home, Menu, Custom Cakes, About Us, Order Online, and Contact.

## Stack

- **Frontend**: Vite + Tailwind CSS v4 + TypeScript/JavaScript
- **Port**: 5000 (webview)
- **Start**: `npm run dev`

## Architecture

The project follows a component-based HTML + modular JS approach:

### HTML Components (`components/`)
Each tab section is a self-contained HTML snippet (no full doc wrapper):
- `header.html` — Sticky nav, basket dropdown, mobile menu, toast notification
- `home.html` — Hero, popular treats grid, highlights
- `menu.html` — Category filter, search, menu items grid
- `custom.html` — Custom cake request form, inspiration gallery
- `about.html` — Chef bio, timeline, values, Instagram grid
- `order.html` — Quick pre-order boxes, checkout form
- `contact.html` — Contact form, map, hours
- `footer.html` — Floating WhatsApp button + footer

### JS Modules (`src/js/`)
- `main.js` — Entry point: fetches all components via `fetch()`, injects into DOM, binds window globals, calls init renders
- `state.js` — Shared reactive state (cart, currentTab, selectedCategory, searchQuery, selectedFulfillment, uploadedFileName)
- `navigation.js` — `switchTab`, `toggleMobileMenu`
- `toast.js` — `showToast`
- `basket.js` — Cart CRUD, `updateBasketUI`, localStorage persistence
- `menu.js` — `renderMenu`, `renderPopularTreats`, `filterMenuCategory`, `handleMenuSearch`
- `helpers.js` — `renderTimeline`, `renderValues`, `renderInspirationGallery`, `renderInstagramShowcase`, `renderQuickBoxes`
- `customCake.js` — `submitCustomCakeForm`, `switchThemeOption`, `handleCakeFileUpload`
- `order.js` — `processCheckoutForm`, `setFulfillment`
- `contact.js` — `submitGeneralContact`
- `data.js` — Re-exports from `../data.ts`
- `mobileMenu.js` — Re-exports `toggleMobileMenu` from navigation

### Data
- `src/data.ts` — All static data (menu items, popular treats, timeline, values, gallery, Instagram posts)
- `src/types.ts` — TypeScript types

## Notes
- `components/ogcode.html` is the original monolithic reference file — do NOT modify it
- All form submissions route to WhatsApp (`wa.me/27821134567`)
- Local asset images (`/src/assets/images/`) don't exist; replaced with Unsplash URLs in components
- Window globals are bound in `main.js` after component HTML is loaded — inline `onclick` handlers depend on this
- Vite imports TS files directly from JS modules (Vite handles the transpilation)

## User Preferences
- Maintain the component separation architecture going forward
