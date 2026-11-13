# KOMA — Jotham Arimoro's manga-editorial portfolio

A complete, static, responsive portfolio. **No npm install or build step is required.** The entire application is authored in `index.html`, `styles.css`, and `app.js`, with local artwork assets.

## Open locally

- Open `index.html` in your browser. All navigation, language/theme switches, project case-study dialogs, and illustration animations work even from a local file.
- For a production-like local server: `python -m http.server 8080`, then visit `http://localhost:8080`.
- The Japanese/English copy and paper/ink theme selections persist in local storage when the browser allows it.
- All decorative motion respects `prefers-reduced-motion`.

## Publish

**Cloudflare Pages:** Upload this folder with the root `index.html`, or connect a repository. Framework preset: None; build command: (empty); output directory: `/`.

**Vercel:** Create a project using this folder as the root. Framework preset: Other; no build command. Serve the repository root as a static site.

**GitHub Pages:** Push the contents of this folder to a repository and configure Pages to publish from the root directory.

## Personalization

- `index.html`: semantic page sections, project links, contact email, and technical stack.
- `app.js`: all English/Japanese translation strings and case-study descriptions.
- `styles.css`: paper, ink, and red palette, responsive breakpoints, and the three hair-layer keyframes (`hairBackFlow`, `hairCrownFlow`, `hairFringeFlow`).
- `assets/hero-manga.webp`: the **original generated manga illustration**, preserved without a cartoon/vector redraw. This is an illustrative character, not a photograph of Jotham.
- `assets/hero-without-loose-hair.webp`: retouched base plate with the exposed locks removed. `assets/hair-back.png`, `assets/hair-crown.png`, and `assets/hair-fringe.png` contain transparent cutouts extracted from **the original illustration's real ink pixels**. The inline SVG controls these three layers with independent wind movement and subtle displacement. This is an SVG-controlled *layered raster rig*, not a fully editable Bézier/path vector; that tradeoff preserves the manga artwork's original texture and avoids approximate redrawn vectors. Face, clothing, cherry blossoms and red sun remain stationary. Motion honors `prefers-reduced-motion`.
- `assets/logo-mark.png` / `assets/logo-mark.webp` and favicon/apple-touch icons are direct raster crops of the user's supplied black/cream brushmark logo, not redrawn substitutes.
- `assets/Jotham_Arimoro_CV.docx`: the editable CV bundled for download. Replace it if you publish a newer CV.
- GitHub currently points to `github.com/boruto2468`. Adjust if necessary. LinkedIn was omitted because its URL was not provided.
- Project cards show **editorial illustrations**, not actual screenshots. The page explicitly discloses this distinction.

## Operational details

- It works offline after a supported browser visits the hosted site once. `sw.js` is registered only on HTTP(S)/localhost.
- **When deploying a change, update `CACHE` in `sw.js`** to invalidate the older cached shell.
- No third-party JS SDKs, embedded tracking scripts, databases, API keys, or backend services are included. Fonts are loaded from Google Fonts when online, with system fallbacks.
- The mail contact action uses `mailto:`; copying email uses the Clipboard API with a manual-copy fallback.
- Project links are external and open in a new tab with `rel="noopener noreferrer"`.

## Accessibility and QA

- Proper heading hierarchy and landmark navigation, keyboard focus styles, skip link, mobile-menu state, native focus-managed dialogs, descriptive alt text, text-based navigation, semantic links/buttons, and reduced-motion support.
- Test in desktop and mobile widths, in both languages and themes. Verify project URLs on your own device before publishing.

## Work history note

Case studies describe work and challenges, not unverified performance metrics or claims that every exploratory feature is publicly released. Keep any future success metrics backed by actual measurements.
