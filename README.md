# Frank Portfolio — two modes, one Vercel deployment

This project combines the professional portfolio and the original illustrated portfolio without merging their styles or JavaScript into one page.

- **`/`** — the formal, minimalist Next.js + TypeScript portfolio from the repository's `dev` branch, including the pencil cursor and ink-on-links effects.
- **`/creative`** — redirects to **`/creative/index.html`**, an isolated copy of the original hand-illustrated portfolio from `main`. Original image assets, CSS, animations, English/Japanese switch, and project details are retained.
- **No extra hosting or database is needed.** Both experiences are shipped from the same Next.js project on Vercel.

## Run locally

Use Node.js 20.9+ (Node.js 22 LTS recommended).

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the formal portfolio and `http://localhost:3000/creative` for the creative version.

```bash
npm run verify:dual  # integration and asset checks (no external dependencies)
npm run typecheck     # TypeScript checks (after npm install)
npm run build         # production Next.js build
```

## Hidden unlock

There are two entry points in the formal site's footer/header:

1. **Triple-click/tap “Frank.dev”** in the header within two seconds. Ordinary single clicks still scroll to the top.
2. **Use the discreet footer sentence**: “There's more to this portfolio than meets the eye.” The letters fade away in order after three seconds; the hit area is *actually disabled* for the next ~five seconds, then letters reappear in reverse order. It pauses while hovered/focused. On reduced-motion systems the hint stays visible and interactive.

Either interaction unlocks the feature and enters creative mode. Thereafter the footer shows a small **“Enter creative mode”** switch. The unlock is stored on the current device in `localStorage` (not an account).

The transition screen fades to the original portfolio's dark, vermilion-accented style, displays **“This is more my style.”** and **“ようこそ。”**, prefetches the creative document/CSS, and enters the creative site. The creative site has a persistent, accessible **“← Formal portfolio”** return control and a shorter “Back to business.” transition.

The formal homepage **always remains the default route for a new visitor**. A direct link to `/creative` also works; the hidden feature is a discovery mechanism, not security.

## Deploy to Vercel

1. Open your `formal-portfolio` repository's `dev` branch locally.
2. Copy the **contents of this folder** to the repository root, preserving any existing `package-lock.json` if it is already tracked. Do not copy just the `public/creative` folder; the formal React components and CSS also changed.
3. Run `npm install && npm run verify:dual && npm run typecheck && npm run build` locally, if dependencies are available.
4. Commit and push changes to **`dev`**:

   ```bash
   git switch dev
   git add .
   git commit -m "Add hidden creative portfolio mode"
   git push origin dev
   ```

5. In Vercel, check that the project is connected to `Boruto2468/formal-portfolio`, production branch `dev`, root directory `./`, framework **Next.js**. Vercel deploys the updated site on push.
6. After deployment, test `/` and `/creative` on desktop and mobile; verify the original creative assets and the return control.

> Do not merge `main` directly into `dev`. That would mix two independent codebases. The original `main` branch remains unchanged.

## Files and design decisions

- `components/CreativeEntrance.tsx` — Easter egg timing, logo detection, unlock persistence, and welcome loading screen; cleans up its timers/listeners on unmount.
- `app/creative-mode.css` — the letter-by-letter animation and transition styling; unaffected by creative CSS.
- `app/creative/page.tsx` — friendly `/creative` entry URL.
- `public/creative/` — the original static portfolio preserved as a separate document with assets.
- `public/creative/switch.js` — “Return to Formal” controller; no dependencies.
- `scripts/verify-dual-mode.mjs` — basic static checks for routes, animation behaviour, paths and service-worker isolation.

The original creative site's service-worker registration and manifest were intentionally omitted from the integrated version. That prevents its offline cache from competing with Next.js routes and deployment updates. Images are still served locally; only the web fonts are loaded from Google Fonts as before.

### Reduced motion and accessibility

`prefers-reduced-motion` disables the letter motion and page transition and leaves the hint permanently available. Disabled hints cannot be activated with pointer, tap, or keyboard until they reappear. Hover/focus pauses the cycle. The return control is always accessible by keyboard.

### Asset paths

Creative assets are prefixed with `/creative/`, so direct links and Vercel routing don't break them. The formal site's PDF CV remains under `public/assets/`.
