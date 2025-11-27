# KICKSPIRE – Move Different

A sleek, sneaker-first landing and shop experience built with vanilla HTML/CSS/JS plus Tailwind CDN. Features multi-page flows (home, shop, collections, story, cart) and a lightweight local cart store.

## Pages
- `index.html` – hero + feature strip, links to shop/collections/story/cart.
- `shop.html` – “Latest Drops” hero with product cards and add-to-cart buttons.
- `collection.html` – collection hero, horizontal showcases, filterable/sortable grid, quick view, load-more skeletons, recently viewed.
- `story.html` & `story-full.html` – brand narrative.
- `cart.html` – reads from shared cart store; supports qty updates, remove, totals, free-shipping hint.

## Styling & behavior
- `styles.css` – theme variables, glass nav, marquee, reveals, product hovers, modal/skeleton styles, featured shoe effect.
- `script.js` – mobile nav toggle, reveal observer, hero parallax guard, smooth anchor scroll, localStorage cart store (`ks_cart_items`) with `[data-cart-add]` handler and badge updater.

## Data stubs (`api/`)
- `products.json`, `collections.json`, `search.json`, `feature-flags.json`
- Cart flow samples: `cart.json`, `cart-add.json`, `cart-update.json`, `cart-remove.json`, `checkout.json`

## Cart wiring
- Any button with `data-cart-add` + `data-product-id`/`data-title`/`data-price`/`data-image` will add to the cart store.
- Badge target: `#nav-count` in nav links.
- Cart page consumes the store; state persists via localStorage.

## Quick start
1) Open `index.html` (or any page) in a browser.
2) Click “Explore Collection”/“Add to Cart” on Shop or Collections; open `cart.html` to verify items.
3) Filters/sort on `collection.html` update the grid client-side.

## Conventions & guardrails
- Keep IDs/classes used by JS (e.g., `mobile-menu-btn`, `mobile-menu`, `nav-count`, `[data-cart-add]`).
- Stick to ASCII; use HTML entities for arrows (`&rarr;`, `&darr;`) if needed.
- Preserve the black/zinc + lime aesthetic; avoid wholesale rewrites or reformatting.
- Reduce-motion friendly: animations guard for `prefers-reduced-motion`.

## Nice-to-haves to extend
- Swap JSON stubs for real endpoints; add auth/session cart.
- Hook filters/search to backend queries with pagination.
- Track inventory/limited drops flags server-side.
- Add analytics for filter/sort/quick-view events.
