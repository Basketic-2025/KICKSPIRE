# KICKSPIRE Codebase Notes (for agents)

## Pages and layout
- `index.html`: landing page; only hero + feature strip remain. Nav links to `shop.html`, `collection.html`, `story.html`, `cart.html`. Hero CTAs go to Shop and Collections. Uses Tailwind CDN, Font Awesome CDN, Google Fonts (Inter, Syne), custom styles in `styles.css`, behaviours in `script.js`.
- `shop.html`: dedicated “Latest Drops” hero plus product cards. Add-to-cart buttons carry `data-cart-add` attributes for the cart store.
- `collection.html`: collections hero, horizontal showcase cards, and a `#collection-grid` section with filters (category/size/color), sorting, item count, load-more with skeletons, quick-view modal hooks, and “Recently Viewed” (localStorage). “Explore Collection” links scroll here and preselect filters.
- `story.html`: story page; links to full story.
- `story-full.html`: expanded story with timeline, craft, community sections; uses the shared nav.
- `cart.html`: cart page pulling items from the shared cart store; supports qty changes, remove, totals, free-shipping hint, empty state.
- `cart.html`, `shop.html`, `collection.html`, `story.html`, `story-full.html`, `index.html`: nav includes text cart link with badge `#nav-count`.

## Styling
- `styles.css`: theme variables, glass nav, marquee, reveal animations, product card hovers, hero effects, scrollbar, reduced-motion overrides. Adds modal styles, skeleton shimmer, `#shop-featured-shoe` rotation/drop-shadow effect.

## Behaviour
- `script.js`: mobile menu toggle, IntersectionObserver reveal, hero parallax (guarded), smooth anchor scroll (ignores `href="#"`), navbar scroll styling.
- Cart store: localStorage key `ks_cart_items`; exposed as `window.cartStore` with `get/save/add/updateBadge`. Global click listener handles any `[data-cart-add]` button reading `data-product-id`, `data-title`, `data-price`, `data-image`.
- Cart badge: `#nav-count` updated via cart store.

## Collection page JS (inline in `collection.html`)
- Uses `collectionData` array to render grid with filters/sort and load-more. Applies filter pills (`data-filter`), size/color selects, sort select, clear button, item count.
- Quick view modal uses `data-quick` on “Quick View” buttons.
- “Explore Collection” links carry `data-filter-jump` to preselect a category and smooth-scroll to `#collection-grid`.
- Recently viewed persisted in localStorage key `ks_recent` and rendered in a strip.

## Cart page JS (inline in `cart.html`)
- Loads cart from `window.cartStore.get()`, renders items with qty controls, remove, totals, free-shipping threshold. Persists changes back to the store. Renders empty state if no items.
- Uses badge `#nav-count` for item count.

## API stubs (static JSON under `api/`)
- `products.json`: products with categories, sizes, colors, popularity, limited flags, and meta for pagination/filters/feature flags.
- `collections.json`: collection slugs with hero, description, and product IDs.
- `search.json`: stubbed search response with hints.
- `feature-flags.json`: toggles for limited drops, low stock, quick view.
- `cart.json`, `cart-add.json`, `cart-update.json`, `cart-remove.json`, `checkout.json`: sample cart/checkout responses (totals, thresholds).

## Guardrails
- Keep ASCII; use `&rarr;`, `&darr;` if needed.
- Preserve existing visual language (black/zinc, lime accent, bold Syne) and IDs/classes targeted by JS.
- Avoid overwriting whole files unless intentional; keep spacing/structure consistent.
- When adding interactivity, follow existing vanilla JS patterns and reduced-motion considerations.
- Nav/mobile menu IDs must stay (`mobile-menu-btn`, `close-menu-btn`, `mobile-menu`).

## Quick references
- Main JS: `script.js`
- Styles: `styles.css`
- Pages: `index.html`, `shop.html`, `collection.html`, `story.html`, `story-full.html`, `cart.html`
- API stubs: `api/*.json`
