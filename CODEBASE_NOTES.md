# KICKSPIRE Codebase Notes & Guardrails

## Layout and assets
- `index.html`: main marketing page with Tailwind CDN, Font Awesome, Google Fonts (Inter, Syne). Uses custom CSS from `styles.css`, IntersectionObserver animations from `script.js`, and hard-coded product cards. Keep icons/links intact.
- `cart.html`: standalone cart page matching the site’s glassy, neon aesthetic; includes mobile menu toggle logic inline, preloaded cart items, quantity controls, summary, and free-shipping hint. Nav links point back to `index.html`.
- `styles.css`: theme variables, marquee, glass effect, reveal animations, hover effects, custom scrollbar, reduced-motion handling. Stick to existing palette and typography.
- `script.js`: handles mobile menu toggle, scroll reveal animations, hero parallax on desktop, smooth anchor scrolling, and navbar scroll effect. Avoid breaking IDs/classes it targets.
- External assets: Tailwind via CDN (`@tailwindcss/browser@4`), Font Awesome CDN, Google Fonts. Images are pulled from Unsplash; no local assets.

## Key behaviours
- Marquee loops text at the top of every page; keep structure to preserve masking/animation.
- Navbar has scroll glass effect; mobile menu slides in/out via `translate-x-full`.
- Product cards rely on existing classes (`product-card`, `add-btn`, `reveal`, etc.) and hover states from CSS.
- Cart icon on `index.html` must link to `cart.html` (fixed after prior mistake); leave badge markup unless intentionally updating counts.

## Constraints / rules to follow
- Do **not** overwrite or truncate `index.html`/`styles.css`/`script.js`; preserve existing UI and styling. If adding features, integrate minimally and keep the visual language (black/zinc background, lime accents, bold Syne headings).
- Use ASCII characters; replace special arrows with HTML entities (`&rarr;`, `&darr;`) if needed to avoid encoding glitches.
- Avoid unnecessary refactors or reformatting; keep indentation/spacing consistent with current files.
- When adding interactive elements, reuse existing patterns (Tailwind classes, simple vanilla JS) and ensure compatibility with `prefers-reduced-motion` considerations already present.
- If adding pages or sections, ensure nav/menu links stay valid and mobile menu IDs/classes remain unchanged.
- Remember user’s preference: “don’t overcomplicate, don’t overcheck; keep code blended with current style.”

## Quick file reference
- Main page: `index.html`
- Cart page: `cart.html`
- Styles: `styles.css`
- Behaviours: `script.js`
