# Rock The Treatment — Mobile Product Page, variation 1b (High-Conversion)

Standalone, dependency-free mobile product page for the **Large Women's Chemo Care Package**.
Migrated from [`Marketing-Bull/rtt-mobile-redesign-showcase`](https://github.com/Marketing-Bull/rtt-mobile-redesign-showcase) (`1b.html`), where it lived alongside variations 1a and 1c.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The page (formerly `1b.html`) |
| `product.css` | Base styles: layout, thumbnail ring, FAQ accordion |
| `app.js` | Gallery swap, quantity stepper, FAQ accordion, shipping countdown |
| `public/assets/uploads/**` | Only the images this page references |

No build step. Open `index.html` directly, or serve the folder with any static server:

```sh
npx serve .
```

Fonts (Inter, DM Serif Display) load from Google Fonts at runtime.

## Deploy

Works as-is on GitHub Pages, Netlify, Vercel, or Cloudflare Pages with the repo root as the publish directory.
