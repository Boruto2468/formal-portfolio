import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const base = process.cwd();
const read = (file) => fs.readFileSync(path.join(base, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(base, file));

const formal = read('components/PortfolioContent.tsx');
const entrance = read('components/CreativeEntrance.tsx');
const css = read('app/creative-mode.css');
const creative = read('public/creative/index.html');
const creativeJs = read('public/creative/app.js');
const switchJs = read('public/creative/switch.js');

assert.match(formal, /CreativeEntrance/, 'Secret entrance is mounted in the formal footer');
assert.match(formal, /nav-logo/, 'Formal logo exists for triple-click unlock');
assert.match(entrance, /clicks\.length >= 3/, 'Triple-click unlock is in place');
assert.match(entrance, /clicks\.filter\(time => now - time <= 2000\)/, 'Clicks must occur within two seconds');
assert.match(entrance, /visible:\s*3000/, 'Visible phase lasts three seconds');
assert.match(entrance, /hidden:\s*4350/, 'Hidden phase plus exit transition lasts about five seconds');
assert.match(entrance, /disabled=\{!interactive \|\| discovered\}/, 'Link is truly disabled while hidden and while transitioning');
assert.match(entrance, /prefers-reduced-motion/, 'Reduced-motion support present');
assert.match(css, /secret-letter-out/, 'Per-letter exit animation present');
assert.match(css, /secret-letter-in/, 'Reverse per-letter entry present');
assert.match(creative, /id="formalEscape"/, 'Return-to-formal control present');
assert.match(creative, /\/creative\/styles\.css/, 'Creative stylesheet isolated');
assert.match(creative, /\/creative\/app\.js/, 'Creative script isolated');
assert.match(switchJs, /window\.location\.assign\('\/'\)/, 'Return navigates to formal root');
assert.doesNotMatch(creativeJs, /serviceWorker\.register/, 'No conflicting creative service worker');
assert.ok(exists('app/creative/page.tsx'), 'Friendly /creative route exists');
assert.ok(exists('public/assets/Jotham_Arimoro_CV.pdf'), 'Formal CV is present');

// All directly referenced creative image assets must be inside the creative directory.
for (const match of creative.matchAll(/(?:src|href|content)="(\/creative\/assets\/[^"#?]+)"/g)) {
  assert.ok(exists('public' + match[1]), `Missing creative asset: ${match[1]}`);
}
console.log('All dual-mode integration checks passed.');
