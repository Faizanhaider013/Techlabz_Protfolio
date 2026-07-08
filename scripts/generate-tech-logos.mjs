/**
 * One-off generator for `lib/tech-logos.generated.ts`.
 *
 * Pulls official logo geometry from `devicon` (full-colour originals) and
 * `simple-icons` (single-path marks) so no path data is ever hand-typed, then
 * inlines it — the site ships zero icon dependencies at runtime.
 *
 * simple-icons dropped the OpenAI mark after v13 (trademark request), so the
 * OpenAI glyph is read from a pinned v13 install.
 *
 *   npm i --no-save devicon simple-icons@16 svgpath
 *   npm i --no-save --prefix ./_si13 simple-icons@13
 *   node scripts/generate-tech-logos.mjs      # run from the repo root
 */
import fs from "node:fs";
import * as si16 from "simple-icons";
import * as si13 from "../_si13/node_modules/simple-icons/index.mjs";
import svgpath from "svgpath";

/* ------------------------------------------------------------------ */
/*  Tight bounding box so every mark optically fills its slot          */
/* ------------------------------------------------------------------ */

/** Exact extrema of a cubic Bézier on one axis (endpoints + derivative roots). */
function cubicExtrema(p0, p1, p2, p3, hit1) {
  hit1(p0); hit1(p3);
  const a = -p0 + 3 * p1 - 3 * p2 + p3;
  const b = 2 * (p0 - 2 * p1 + p2);
  const c = p1 - p0;
  const at = (t) => {
    const u = 1 - t;
    return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
  };
  const roots = [];
  if (Math.abs(a) < 1e-9) { if (Math.abs(b) > 1e-9) roots.push(-c / b); }
  else {
    const disc = b * b - 4 * a * c;
    if (disc >= 0) {
      const s = Math.sqrt(disc);
      roots.push((-b + s) / (2 * a), (-b - s) / (2 * a));
    }
  }
  for (const t of roots) if (t > 0 && t < 1) hit1(at(t));
}

/** Bounding box of a path `d`, with an optional element transform applied. */
function pathBBox(d, transform, hit) {
  let p = svgpath(d);
  if (transform) p = p.transform(transform);
  p = p.unarc().unshort().abs();
  let x = 0, y = 0, sx = 0, sy = 0;
  p.iterate((seg) => {
    const c = seg[0];
    if (c === "M" || c === "L") { x = seg[1]; y = seg[2]; if (c === "M") { sx = x; sy = y; } hit(x, y); }
    else if (c === "H") { x = seg[1]; hit(x, y); }
    else if (c === "V") { y = seg[1]; hit(x, y); }
    else if (c === "C") {
      cubicExtrema(x, seg[1], seg[3], seg[5], (v) => hit(v, y));
      cubicExtrema(y, seg[2], seg[4], seg[6], (v) => hit(x, v));
      x = seg[5]; y = seg[6]; hit(x, y);
    } else if (c === "Q") {
      // Elevate the quadratic to a cubic, then reuse the exact solver.
      const c1x = x + (2 / 3) * (seg[1] - x), c1y = y + (2 / 3) * (seg[2] - y);
      const c2x = seg[3] + (2 / 3) * (seg[1] - seg[3]), c2y = seg[4] + (2 / 3) * (seg[2] - seg[4]);
      cubicExtrema(x, c1x, c2x, seg[3], (v) => hit(v, y));
      cubicExtrema(y, c1y, c2y, seg[4], (v) => hit(x, v));
      x = seg[3]; y = seg[4]; hit(x, y);
    } else if (c === "Z") { x = sx; y = sy; }
  });
}

/** Split top-level shape elements out of the sprite body. */
function contentBBox(markup) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const hit = (px, py) => {
    if (!Number.isFinite(px) || !Number.isFinite(py)) return;
    minX = Math.min(minX, px); maxX = Math.max(maxX, px);
    minY = Math.min(minY, py); maxY = Math.max(maxY, py);
  };
  // <defs> geometry is never painted directly — exclude it.
  const painted = markup.replace(/<defs>[\s\S]*?<\/defs>/g, "");
  const attr = (tag, n) => {
    const m = tag.match(new RegExp(`\\b${n}="([^"]+)"`));
    return m ? m[1] : null;
  };
  for (const m of painted.matchAll(/<path\b[^>]*>/g)) {
    const d = attr(m[0], "d");
    if (d) pathBBox(d, attr(m[0], "transform"), hit);
  }
  for (const m of painted.matchAll(/<circle\b[^>]*>/g)) {
    const cx = +attr(m[0], "cx"), cy = +attr(m[0], "cy"), r = +attr(m[0], "r");
    hit(cx - r, cy - r); hit(cx + r, cy + r);
  }
  for (const m of painted.matchAll(/<rect\b[^>]*>/g)) {
    const x = +attr(m[0], "x"), y = +attr(m[0], "y");
    hit(x, y); hit(x + +attr(m[0], "width"), y + +attr(m[0], "height"));
  }
  for (const m of painted.matchAll(/<polygon\b[^>]*points="([^"]+)"/g)) {
    const nums = m[1].trim().split(/[\s,]+/).map(Number);
    for (let k = 0; k + 1 < nums.length; k += 2) hit(nums[k], nums[k + 1]);
  }
  if (!Number.isFinite(minX)) return null;
  return { minX, minY, w: maxX - minX, h: maxY - minY };
}

const r2 = (n) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/*  Source readers                                                     */
/* ------------------------------------------------------------------ */

/** Strip wrapper <svg>, xml decl, comments, <title>. Namespace all ids. */
function prepare(rawSvg, id) {
  let body = rawSvg
    .replace(/<\?xml[^>]*\?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .trim();

  // Namespace gradient / clip ids so 30 inlined sprites never collide.
  const ids = [...new Set([...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))];
  for (const old of ids) {
    const next = `${id}-${old}`;
    body = body.replaceAll(`id="${old}"`, `id="${next}"`);
    body = body.replaceAll(`url(#${old})`, `url(#${next})`);
    body = body.replaceAll(`href="#${old}"`, `href="#${next}"`);
  }
  return body.replace(/\s{2,}/g, " ").replace(/>\s+</g, "><");
}

/** Give shapes that would otherwise default to black an explicit fill. */
function fillDefaults(body, color) {
  return body.replace(/<(path|circle|rect|polygon|ellipse)\b((?:(?!fill=)[^>])*?)(\/?)>/g,
    (_m, tag, attrs, close) => `<${tag}${attrs} fill="${color}"${close}>`);
}

function devicon(slug, file) {
  const raw = fs.readFileSync(`node_modules/devicon/icons/${slug}/${file}.svg`, "utf8");
  return raw;
}

function simpleIcon(pkg, key, hex) {
  const icon = pkg[key];
  if (!icon) throw new Error(`simple-icons: missing ${key}`);
  return `<svg viewBox="0 0 24 24"><path fill="${hex ?? `#${icon.hex}`}" d="${icon.path}"/></svg>`;
}

/* ------------------------------------------------------------------ */
/*  The roster                                                         */
/* ------------------------------------------------------------------ */

const NIGHT = "#071321"; // card background — used to invert light-on-dark marks
const WHITE = "#ffffff";

/** name, sprite id, raw svg, optional post-processing */
const sources = [
  ["React", "react", devicon("react", "react-original")],
  ["Next.js", "nextjs", devicon("nextjs", "nextjs-original"),
    // Devicon ships the black-circle mark; invert it to the white-circle
    // variant Vercel publishes for dark backgrounds.
    (s) => s.replace(/<circle([^>]*)\/>/, `<circle$1 fill="${WHITE}"/>`)
            .replace(/stop-color="#fff"/g, `stop-color="${NIGHT}"`)],
  ["Node.js", "nodejs", devicon("nodejs", "nodejs-original")],
  ["TypeScript", "typescript", devicon("typescript", "typescript-original")],
  ["JavaScript", "javascript", devicon("javascript", "javascript-original")],
  ["Python", "python", devicon("python", "python-original")],
  ["TensorFlow", "tensorflow", devicon("tensorflow", "tensorflow-original")],
  ["PyTorch", "pytorch", devicon("pytorch", "pytorch-original")],
  ["OpenAI", "openai", simpleIcon(si13, "siOpenai", WHITE)],
  ["Claude", "claude", simpleIcon(si16, "siClaude")],
  ["Google Gemini", "gemini",
    // Gemini's mark is published as a gradient, not a flat fill.
    simpleIcon(si16, "siGooglegemini", "url(#grad)").replace("<path",
      `<defs><linearGradient id="grad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">` +
      `<stop stop-color="#4285F4"/><stop offset=".5" stop-color="#9B72CB"/><stop offset="1" stop-color="#D96570"/>` +
      `</linearGradient></defs><path`)],
  ["LangChain", "langchain", simpleIcon(si16, "siLangchain")],
  ["MongoDB", "mongodb", devicon("mongodb", "mongodb-original")],
  ["PostgreSQL", "postgresql", devicon("postgresql", "postgresql-original"),
    // Its outline paths default to black and vanish on a dark card.
    (s) => fillDefaults(s, "#e8f1fa")],
  ["MySQL", "mysql", devicon("mysql", "mysql-original"),
    // The stock dolphin is #00618A — near-invisible on a #071321 card.
    (s) => s.replaceAll('fill="#00618A"', 'fill="#6fb3d4"')],
  ["Redis", "redis", devicon("redis", "redis-original")],
  ["Docker", "docker", devicon("docker", "docker-original")],
  ["Kubernetes", "kubernetes", devicon("kubernetes", "kubernetes-original")],
  ["AWS", "aws", devicon("amazonwebservices", "amazonwebservices-original-wordmark"),
    (s) => s.replaceAll('fill="#252f3e"', `fill="${WHITE}"`)],
  ["Microsoft Azure", "azure", devicon("azure", "azure-original")],
  ["Google Cloud", "googlecloud", devicon("googlecloud", "googlecloud-original")],
  ["Git", "git", devicon("git", "git-original")],
  ["GitHub", "github", devicon("github", "github-original"),
    (s) => s.replaceAll('fill="#181616"', `fill="${WHITE}"`)],
  ["Linux", "linux", devicon("linux", "linux-plain"),
    // The full-colour Tux is a 190 KB mesh; the silhouette is the shippable mark.
    (s) => fillDefaults(s, "#f5c542")],
  ["Nginx", "nginx", devicon("nginx", "nginx-original")],
  ["Firebase", "firebase", devicon("firebase", "firebase-original")],
  ["Supabase", "supabase", devicon("supabase", "supabase-original")],
  ["Vercel", "vercel", devicon("vercel", "vercel-original"),
    (s) => fillDefaults(s, WHITE)],
  ["Netlify", "netlify", devicon("netlify", "netlify-original")],
];

const out = [];
for (const [name, id, rawIn, transform] of sources) {
  const raw = transform ? transform(rawIn) : rawIn;
  const body = prepare(raw, id);
  const bb = contentBBox(body);
  if (!bb) throw new Error(`no bbox for ${name}`);
  // 4% breathing room so strokes/antialiasing are never clipped.
  const pad = Math.max(bb.w, bb.h) * 0.02;
  const viewBox = `${r2(bb.minX - pad)} ${r2(bb.minY - pad)} ${r2(bb.w + pad * 2)} ${r2(bb.h + pad * 2)}`;
  out.push({ id, name, viewBox, body, aspect: r2(bb.w / bb.h) });
}

const header = `/**
 * Official technology marks, inlined as an SVG <symbol> sprite.
 *
 * GENERATED by \`_gen-logos.mjs\` from the \`devicon\` (full-colour originals)
 * and \`simple-icons\` packages — do not hand-edit. Each viewBox is cropped to
 * the mark's true bounding box so every logo optically fills its slot.
 *
 * Logos are the trademarks of their respective owners and appear here solely
 * to identify the technologies Tech Labz works with (nominative fair use).
 */

export type TechLogo = {
  /** Sprite symbol id. */
  id: string;
  name: string;
  viewBox: string;
  /** Inner SVG markup. Static, generated — safe to inline. */
  body: string;
  /** width / height of the cropped mark; wordmarks are > 2. */
  aspect: number;
};

export const techLogos: TechLogo[] = ${JSON.stringify(out, null, 2)};
`;

fs.writeFileSync("lib/tech-logos.generated.ts", header);
console.log(`wrote lib/tech-logos.generated.ts — ${out.length} logos, ${(header.length / 1024).toFixed(1)} KB`);
for (const o of out) console.log("  ", o.id.padEnd(14), o.viewBox.padEnd(30), "aspect", o.aspect);
