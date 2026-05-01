import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { writeFileSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const fontsDir = (pkg) => path.join(root, 'node_modules/@fontsource', pkg, 'files');

// Montserrat: latin 400 + 700
for (const f of ['montserrat-latin-400-normal.woff2', 'montserrat-latin-700-normal.woff2']) {
  GlobalFonts.registerFromPath(path.join(fontsDir('montserrat'), f), 'Montserrat');
}

// Noto Sans KR: 700 weight (all subsets for full Korean coverage)
const notoDir = fontsDir('noto-sans-kr');
for (const f of readdirSync(notoDir).filter(f => f.endsWith('-700-normal.woff2'))) {
  GlobalFonts.registerFromPath(path.join(notoDir, f), 'Noto Sans KR');
}

// ── Design constants ──────────────────────────────────────────────
const W = 1200;
const H = 630;
const PURPLE = '#3D2C8D';
const LIME   = '#C8D84A';
const WHITE  = '#FFFFFF';
const LEFT   = 80;

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Background
ctx.fillStyle = PURPLE;
ctx.fillRect(0, 0, W, H);

// Top-right lime triangle
ctx.beginPath();
ctx.moveTo(860, 0);
ctx.lineTo(W, 0);
ctx.lineTo(W, 270);
ctx.closePath();
ctx.fillStyle = LIME;
ctx.fill();

// Bottom lime line (thin, with side margins)
ctx.fillStyle = LIME;
ctx.fillRect(LEFT, 592, W - LEFT * 2, 2);

// ── Line 1: 진료 안내문 만들기 ────────────────────────────────────
ctx.font = 'bold 72px "Noto Sans KR", "Montserrat", sans-serif';
ctx.fillStyle = WHITE;
ctx.fillText('진료 안내문 만들기', LEFT, 240);

// ── Line 2: BY ────────────────────────────────────────────────────
ctx.font = '400 40px "Montserrat", sans-serif';
ctx.fillStyle = WHITE;
ctx.fillText('BY', LEFT, 318);

// ── Line 3: BRAND ONE. (mixed-color) ─────────────────────────────
ctx.font = 'bold 56px "Montserrat", sans-serif';
const y3 = 408;
let x = LEFT;

for (const [text, color] of [
  ['BRA', WHITE],
  ['ND',  LIME ],
  [' ',   WHITE],
  ['O',   LIME ],
  ['NE.', WHITE],
]) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y3);
  x += ctx.measureText(text).width;
}

// ── Save ──────────────────────────────────────────────────────────
const out = path.join(root, 'public/og-image.png');
writeFileSync(out, canvas.toBuffer('image/png'));
console.log(`✓ OG image generated: public/og-image.png (${W}×${H})`);
