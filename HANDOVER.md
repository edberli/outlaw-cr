# 界外 OUTLAW — AI Handover Document

> **Purpose**: This document hands over the entire 界外 OUTLAW (Cream of Rice) website project to another AI tool (Codex / Cursor / Claude / etc.) so it can continue development seamlessly. Read this **completely** before touching any code.

---

## 1. Project Overview

### 1.1 What this is
A **brand marketing single-page website** for **界外 OUTLAW**, a Hong Kong–based premium nutrition brand selling **instant cream of rice (即食純米糊)** — a fast-digesting, gluten-free carbohydrate source aimed at serious athletes and fitness enthusiasts.

### 1.2 Who uses it
- **Primary audience**: Hong Kong / Greater China fitness enthusiasts, bodybuilders, physique competitors, serious gym-goers (age ~20–40) who care about clean carb sourcing.
- **Secondary audience**: Anyone interested in clean-label, gluten-free meal-prep alternatives.
- **Tone**: Premium, restrained, Japanese-minimalist (日系極簡). Not loud, not "broey," not generic-supplement-brand.

### 1.3 Brand essence
- Name: **界外 OUTLAW** — "outside the boundary" / "refusing to settle"
- Single-product focus: cream of rice. Future SKUs (supplements) coming.
- Origin story: Founder is a fitness enthusiast frustrated by carb prep (rice/sweet potato/oats are slow or cause GI issues). Sources rice from Chiang Rai, Northern Thailand (600m+ elevation jasmine rice).
- Core promise: **100% Thai jasmine rice powder. One ingredient. 60-second prep.**

### 1.4 Languages on the site
- **Primary copy**: Traditional Chinese (繁體中文 / 港式)
- **Headings & accents**: English (Archivo / Space Grotesk)
- The site is *not* bilingual — it's a single-locale site with Chinese body copy and English typographic accents. Do NOT add an English-only version unless explicitly asked.

---

## 2. Repository & Deployment

### 2.1 Git
- **Remote**: `https://github.com/edberli/outlaw-cr.git`
- **Default branch**: `main`
- **Owner / GitHub user**: `edberli`
- **Local path**: `/Users/winstonli/Documents/app`

### 2.2 Deployment — GitHub Pages
- **Live URL**: https://edberli.github.io/outlaw-cr/
- **Build type**: `legacy` (no Jekyll config / no GitHub Actions — just serves HTML from the branch root)
- **Source branch**: `main`
- **Source path**: `/` (project root)
- **HTTPS enforced**: yes
- **Custom domain**: none (currently `edberli.github.io/outlaw-cr/`)
- **404**: default

To trigger a manual rebuild after an edge case where Pages doesn't auto-build:
```bash
gh api repos/edberli/outlaw-cr/pages/builds -X POST
```

To check Pages status:
```bash
gh api repos/edberli/outlaw-cr/pages
```

### 2.3 Push workflow
There is **no CI**. Every `git push origin main` to the repo root triggers a GitHub Pages rebuild. Verify changes appear at the live URL after push (usually <1 minute).

---

## 3. Credentials & Third-Party Integrations

### 3.1 API keys / tokens / secrets
**There are none.** This is a fully static HTML site.
- No `.env` file
- No backend
- No database
- No analytics tags currently installed (no GA, no GTM, no Meta Pixel)
- No payment processor
- No headless CMS
- No email/form submission service
- No environment variables anywhere

If you need to add analytics, payment, forms, etc., **ask the owner first**.

### 3.2 Third-party services in use (no auth required)
| Service | Purpose | URL pattern | Notes |
|---|---|---|---|
| **Google Fonts** | Typography (Archivo, Noto Sans TC, Space Grotesk) | `fonts.googleapis.com` / `fonts.gstatic.com` | Loaded via `<link>` in `<head>`. No key. |
| **Unsplash CDN** | Lifestyle / hero / rice imagery | `images.unsplash.com/photo-{id}?w=...&q=...` | Direct CDN URLs, no auth, no API. **Important**: only timestamp-based photo IDs (e.g. `photo-1605296867304-46d5465a13f1`) work — short slug IDs do NOT. |

### 3.3 Owner / contact placeholders inside the site
These are **placeholder strings** you can find in `index.html`:
- Email: `hello@outlaw.hk` (link in footer — currently a `mailto:` only, no inbox configured)
- Social links: `#` placeholders for Instagram and WhatsApp (not yet wired up)
- Cart button: `Cart (0)` placeholder, no e-commerce backend

---

## 4. Tech Stack

### 4.1 Stack at a glance
| Layer | Choice |
|---|---|
| HTML | Hand-written, single `index.html`, no templating |
| CSS | Hand-written, single `styles.css`, ~1700 lines, CSS custom properties |
| JS | Hand-written, single `script.js`, ~210 lines, vanilla ES6+ |
| Framework | **None** (no React / Vue / Svelte / Next) |
| Bundler | **None** (no Webpack / Vite / esbuild) |
| Package manager | **None** (no `package.json`, no `node_modules`) |
| Build command | **None** — files are served as-is |
| Backend | **None** |
| CMS | **None** |
| Hosting | GitHub Pages |

**This is a deliberate architectural choice.** See §7.4 for rationale.

### 4.2 Files in repo root
```
/
├── index.html          (~750 lines — entire site markup)
├── styles.css          (~1700 lines — all styles + design tokens)
├── script.js           (~210 lines — vanilla JS interactions)
├── images/
│   ├── logo-white.png  (white-on-dark version of brand mark)
│   ├── logo-black.png  (black-on-light version of brand mark)
│   ├── product-orange.png  (Classic flavour silver bag)
│   ├── product-green.png   (Matcha flavour silver bag)
│   └── product-gold.png    (Original flavour silver bag)
├── .gitignore          (ignores .DS_Store, node_modules/, .claude/)
├── .claude/            (LOCAL ONLY — gitignored — Claude Code config)
│   ├── launch.json     (dev server presets)
│   └── settings.local.json
├── HANDOVER.md         (this file)
└── HANDOVER-PROMPT.md  (paste-into-AI onboarding prompt)
```

### 4.3 Local development

**Option A — Python static server (no install):**
```bash
cd /Users/winstonli/Documents/app
/opt/homebrew/bin/python3 -m http.server 8000
# Open http://localhost:8000
```

**Option B — Live Server with hot reload (one-time global install):**
```bash
npm install -g live-server
cd /Users/winstonli/Documents/app
/opt/homebrew/bin/npx live-server --no-browser
# Open http://localhost:3000
```

> If `python3` or `npx` errors with "No such file or directory", the system Python at `/usr/bin/python3` is permission-restricted on this Mac — always use the **Homebrew** versions at `/opt/homebrew/bin/`. The `.claude/launch.json` already hardcodes these paths.

If port 8000 is occupied:
```bash
lsof -ti:8000 | xargs kill -9
```

### 4.4 Browser support target
- **Modern evergreen browsers only** (Chrome, Safari, Firefox, Edge — last 2 versions).
- Heavy use of `IntersectionObserver`, CSS custom properties, `clamp()`, `aspect-ratio`, CSS Grid, `mix-blend-mode`. No IE11 support, no polyfills.
- **Mobile-first responsive**, breakpoints at `1024px` and `768px`.

---

## 5. Site Structure

It's a **single-page site** (`index.html`) with anchor-link navigation. Sections in order:

| # | Section | ID / class | Notes |
|---|---|---|---|
| 1 | Page Loader | `.page-loader` | 1.4s timed-out CSS animation, then `revealHero()` fires |
| 2 | Custom Cursor | `.cursor-dot` | Lerp-smoothed dot, blends via `mix-blend-mode: difference` |
| 3 | Header | `.site-header` | Logo + nav. Switches white↔black logo based on `.hero-visible` class |
| 4 | Mobile Overlay | `.mobile-overlay` | Hamburger-triggered fullscreen menu |
| 5 | Hero | `.hero` | Full-viewport image (Unsplash), giant headline "INSTANT CREAM OF RICE" |
| 6 | Marquee Strip | `.marquee` | Infinite-scroll text strip of product attributes |
| 7 | Brand Statement | `.brand-statement` | Manifesto-style large quote |
| 8 | Explainer ("What is COR") | `.explainer` | 3 paragraphs explaining cream of rice |
| 9 | Image Strip | `.image-strip` | Full-width parallax rice-field photo |
| 10 | **Products** | `#products` `.products` | 3 SKU cards (Classic / Matcha / Original) |
| 11 | Nutrition Table | `#nutrition` `.nutrition` | Real per-100g nutrition data |
| 12 | Comparison Table | `.comparison` | Cream of rice vs oats / rice / sweet potato |
| 13 | Split Visual | `.split-visual` | Two parallax rice photos side-by-side |
| 14 | **Ritual** | `#ritual` `.ritual` | 3-step "how to use" |
| 15 | Ingredient Spotlight | `.ingredient` | Thailand sourcing story with stats (600m+ / 100% / 48hr) |
| 16 | **Certifications** | `.certifications` | DARK SECTION — FDA / ISO 22000:2018 / Halal / SGS |
| 17 | **Philosophy** | `#philosophy` `.philosophy` | 6-card "why cream of rice" benefits grid |
| 18 | Lifestyle Image Strip | `.image-strip-short` | Aerial rice paddy parallax |
| 19 | **About** | `#about` `.about` | Brand story + 4 count-up stats |
| 20 | Coming Soon | `.coming-soon` | 6 future-product cards (EAA, Creatine, Glutamine, Pre-workout, GABA, Magnesium) |
| 21 | **FAQ** | `#faq` `.faq` | 6 accordion questions |
| 22 | CTA | `.cta-section` | "準備好突破界限" + Shop Now button |
| 23 | Footer | `#contact` `.site-footer` | Big logo (inverted), 4-column nav, copyright |

### 5.1 Anchor routes
The header nav links to: `#products`, `#ritual`, `#philosophy`, `#about`, `#faq`. Smooth-scroll handler in `script.js` adds an 80px top offset to clear the fixed header.

---

## 6. Design System

### 6.1 Design tokens (CSS custom properties in `:root`)
Located at top of `styles.css`:
```css
:root {
  --bg:         #f5f4ef;   /* warm off-white — main background */
  --bg-dark:    #1a1a1a;   /* near-black — certifications section, footer details */
  --surface:    #eae9e3;   /* slightly darker beige — cards, surfaces */
  --text:       #3a3a3a;   /* body text — soft charcoal, not pure black */
  --text-muted: #8a8a85;   /* secondary copy, captions */
  --heading:    #1a1a1a;   /* heading text */
  --white:      #fafaf7;   /* warm white (NOT #ffffff) */
  --accent:     #c8a44e;   /* muted gold — used SPARINGLY, only for emphasis */
  --ease:       cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
}
```

### 6.2 Typography
Three Google Fonts:
1. **Archivo** (400–900) — primary heading + English display type. Hero, section titles, big numbers.
2. **Noto Sans TC** (300–900) — Traditional Chinese body and headings. Pair this for any 中文 text.
3. **Space Grotesk** (400–700) — small caps, tags, labels (e.g. `001 — 認識米糊`), navigation, footer.

Loaded via single `<link>` in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=Noto+Sans+TC:wght@300;400;500;700;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 6.3 Spacing & rhythm
- Sections use generous vertical padding (`100px`+ top/bottom on desktop, scales down on mobile).
- `.section-container` is the standard width container — max-width ~1400px with horizontal padding.
- Grid gaps are typically 40–80px.
- Letter-spacing is intentionally TIGHT on display headings (often `-0.03em` or tighter) — this is part of the editorial-magazine feel.

### 6.4 Imagery rules (CRITICAL — read §7.2 for rationale)
- **Only rice-related imagery**. Rice fields, rice grains, rice in bowls. Aerial rice paddy shots. Golden hour rice landscapes.
- **No** generic fitness photos (gym, weights, athletes).
- **No** fashion / clothing photos.
- **No** generic food photography (meals, ingredients other than rice).
- **No** stock-looking happy-customer shots.
- All imagery is currently sourced from Unsplash CDN. To find new images, use Unsplash search and extract the timestamp-based photo ID (format `photo-1632703272582-41359d52bfa9`). Short slug IDs (`photo-FxGYroqWfb4`) do NOT work as direct CDN URLs.

### 6.5 Logo system
There are **two logo files** in `images/`:
- `logo-white.png` — for use on dark backgrounds
- `logo-black.png` — for use on light backgrounds

Logo placements and the rules:
| Location | Logo file | CSS technique | Size |
|---|---|---|---|
| Header (over hero / dark) | `logo-white.png` | `.site-header.hero-visible .logo-white { display: block }` | `height: 88px` |
| Header (after scroll / light) | `logo-black.png` | default `.logo-black { display: block }` | `height: 88px` |
| Loader | `logo-white.png` | static | `height: 180px`, centered via flexbox on `.loader-inner` |
| Footer | `logo-black.png` + `filter: invert(1)` | trick: invert the black logo to white because the file has built-in padding that makes a separate white asset awkward in the dark footer | `height: 160px` |

> **Why the footer uses `filter: invert(1)` on the black logo**: The logo PNG has built-in transparent padding (the actual mark is smaller than the canvas). Using `filter: invert(1)` on the black version produces a clean white mark on the dark footer without needing yet another asset. If you swap the logo files, re-test all four placements.

### 6.6 Animation patterns
- **Reveal on scroll**: Add `data-reveal` attribute → `IntersectionObserver` toggles `.revealed` class. CSS handles the actual transition (translateY + opacity).
- **Stagger reveal in grids**: `.products-grid`, `.philosophy-grid`, `.ritual-grid`, `.cert-grid`, `.coming-grid` use a separate observer that staggers children by 120ms.
- **Parallax**: Add `data-parallax="0.1"` (or any float) → JS reads `getBoundingClientRect()` and applies `translateY()` based on viewport center offset × speed factor.
- **Count-up**: Add `data-count="100"` → cubic-ease-out animation from 0 to target over 1500ms when scrolled into view.
- **Page loader**: Hardcoded 1400ms before fade-out, then 200ms before hero text reveals.

---

## 7. Design Decisions & Rationale (MOST IMPORTANT)

> Every choice here was deliberate. Read this section carefully — these are the **owner's preferences** distilled. Violating them will require rework.

### 7.1 Why Japanese-minimalist (日系極簡), not Western fitness-bro
**Decision**: Whitespace-heavy editorial layout, restrained palette, tiny tags, large display headings, thin lines, muted gold accent.

**Why**: The owner explicitly referenced **lyft-fit.com** as the design language target. The brand is positioned as **premium and considered**, not loud and aggressive. Most competing supplement brands shout — going quiet is the differentiation. Treat the site like a fashion editorial or design magazine, not like a Bodybuilding.com page.

**Implications**:
- Don't add bright colours, gradients, neon accents, or "energy" graphics.
- Don't add chunky shadows, 3D effects, or glassmorphism.
- Don't add "TRY NOW!" / "LIMITED TIME!" / urgency banners.
- Lots of white(ish) space is correct, not a bug.

### 7.2 Why rice-only imagery
**Decision**: Every photo on the site shows rice (fields, grains, paddies) or product packaging. No gym shots, no athletes, no clothing.

**Why**: The owner gave direct feedback that earlier images felt **"勁普通"** (very generic) and **"唔合乎我個網站嗰個感覺"** (didn't match the site's feel). The brand is monomaniacally focused on one ingredient — the imagery must reinforce that. Generic fitness shots make it look like every other supplement brand.

**Implications**:
- When adding new images, search Unsplash for: "rice field", "rice paddy", "jasmine rice", "rice grains", "thai rice", "rice harvest". Avoid: "fitness", "gym", "workout", "athlete", "nutrition", "food".
- The HERO image (`photo-1605296867304-46d5465a13f1`) is approved by the owner and should not be changed without permission.

### 7.3 Why use real nutrition data, real certifications, real product list
**Decision**: The numbers in the nutrition table (378 kcal / 66g carbs / 13g protein / 6.4g fat / 122mg sodium per 100g), the cert list (FDA Reg. No. 10809608958, ISO 22000:2018 by CTI, Halal by JAKIM, SGS), and the future-product list (EAA, Creatine, Glutamine, Pre-workout, 南非醉茄 GABA, Magnesium Bisglycinate) are **real data the owner provided**, not placeholders.

**Why**: The owner sent handwritten/photographed reference notes specifically so this data would be accurate. Editing these to "round numbers" or "more impressive figures" would be wrong.

**Implications**:
- DO NOT round, embellish, or change nutrition numbers.
- DO NOT add certifications the brand doesn't actually have.
- DO NOT remove items from the Coming Soon list — those are the actual roadmap.
- If adding a new nutrient row or cert, ask the owner for the real value first.

### 7.4 Why no framework / no build tool
**Decision**: Vanilla HTML + CSS + JS. No React, no Vite, no `package.json`, no build step.

**Why**:
- The site is a **brand presence, not an app**. There's no auth, no state, no routing, no API — no problem a framework would solve.
- GitHub Pages serves static files for free, instantly. Adding a framework means adding a build pipeline (CI, secrets, lockfile, dependency security, etc.) for zero user-facing benefit.
- The owner wants to be able to edit the HTML directly and see results immediately.
- Page weight stays minimal — fast on mobile, no JS framework cost.

**Implications**:
- DO NOT introduce React / Next / Vue / Svelte / Astro etc. without explicit permission.
- DO NOT introduce a bundler (Vite, Webpack, esbuild, Parcel).
- DO NOT introduce TypeScript build-step (TS in browser is fine if loaded via CDN, but no tsc compile step).
- DO NOT add a `package.json` "to organize dependencies" — keep it CDN-link based.
- If you absolutely need a small library, prefer `<script src="https://cdn.jsdelivr.net/...">` over npm install.

### 7.5 Why a dark `.certifications` section
**Decision**: The Certifications section is the only mid-page section with `--bg-dark` background, with gold-accent SVG icons and white text on 4 cards.

**Why**: Visual rhythm — breaking the long beige page with a dark editorial pause makes the certifications feel **more premium and authoritative**, which reinforces the trust signal that certifications are supposed to convey. It's the "luxury watch ad" treatment for a quality claim.

**Implications**:
- Keep this section dark. If you add more trust/quality content, dark treatment is also appropriate.
- The footer is also dark — these are the only two dark areas. Don't make the rest of the page dark.

### 7.6 Why three fonts (Archivo + Noto Sans TC + Space Grotesk)
**Decision**: Display / heading uses Archivo (geometric grotesque). Chinese uses Noto Sans TC. Small labels and tags use Space Grotesk (futuristic-monospace-ish).

**Why**: Editorial Japanese-minimalist sites almost always pair a **strong sans-serif display face** with a **smaller-weight UI/label face** plus a proper Chinese face. Mixing weights (light Chinese + heavy English headings) is the exact magazine-spread aesthetic the brand wants. Space Grotesk's compressed lowercase makes the "001 — Tag" labels look intentional, not afterthoughts.

**Implications**:
- Don't replace with serif fonts (the brand isn't trying to feel old/vintage).
- Don't replace with rounded fonts (the brand isn't trying to feel friendly/playful).
- If you add a new typeface, it must be a clean sans-serif and there should be a clear job for it.

### 7.7 Why custom cursor
**Decision**: A small dot follows the mouse with a 0.15 lerp. Hovering over interactive elements scales it up. `mix-blend-mode: difference` makes it visible on any background.

**Why**: It's a **luxury / fashion-site signature move** (think Acne Studios, COS, etc.). Pairs with the editorial design language. Subtle enough not to annoy, distinctive enough to register as "this site cares."

**Implications**:
- Don't remove the cursor.
- Don't make it bigger / more colourful / more "playful" — restraint is the point.
- It's already disabled on touch devices implicitly (mouse events don't fire).

### 7.8 Why the hero loader takes 1.4 seconds
**Decision**: 1400ms hard timeout before the loader fades and the hero reveals.

**Why**: The loader isn't really loading anything — it's a **performative pause** that establishes ceremony before the brand experience starts. Like a film studio logo before a movie. Skipping it would make the entrance feel cheap.

**Implications**:
- Don't shorten it to "improve perceived performance" — perceived performance is not the goal here, brand presence is.
- If actual loading time exceeds 1.4s, the loader can stay longer — but don't make it artificially shorter.

### 7.9 Why logo sizes are larger than typical
**Decision**: Header logo 88px, loader logo 180px, footer logo 160px.

**Why**: The owner provided the logo PNG files which have **built-in transparent padding** around the actual mark. This means the rendered logo always *looks* about 60% of its CSS height. The owner gave explicit feedback **"Logo 太細個啦"** (logo is too small) and **"Footer 嗰個 logo 都太細"** twice — sizes were iteratively bumped to current values to compensate for the built-in padding.

**Implications**:
- Don't shrink these sizes "for cleaner UI."
- If the logo PNG files are ever replaced with tighter-cropped versions, the CSS heights should be re-tuned downward.

### 7.10 Why no Cart / e-commerce yet
**Decision**: The "Cart (0)" link in the header is a static `#` placeholder. Product cards link to `#`.

**Why**: This is currently a **brand presence site only**. E-commerce will come later (likely Shopify or a similar headless solution) when the owner is ready. Adding a fake cart now would either be misleading or scope-creep into building a backend that isn't requested.

**Implications**:
- Don't wire up "add to cart" buttons until the owner confirms the e-commerce stack.
- Don't add a checkout flow or payment integration without explicit permission.
- If e-commerce is added, integrate via the lightest possible path (Shopify Buy Button SDK or a single-page Stripe Checkout) to preserve the no-build philosophy.

### 7.11 Why Traditional Chinese (繁體 / 港式) not Simplified
**Decision**: All Chinese copy is Traditional Chinese with Hong Kong–style phrasing (e.g. "嗰個", "啲", "係"-leaning).

**Why**: The brand is Hong Kong–based and the primary audience is HK + 海外華人 markets that read Traditional Chinese. Simplified-Chinese audiences are not the primary target.

**Implications**:
- Use 繁體 for all new copy.
- Match the existing tone — direct, slightly informal, confident. Not "marketing-speak."
- If you're an AI that defaults to Simplified, manually convert.

### 7.12 Why Chiang Rai / 600m / 48hr / single-ingredient story
**Decision**: The product story is highly specific: Chiang Rai, Northern Thailand, 600m+ elevation, 48-hour low-temperature milling, 100% jasmine rice, single-ingredient formula.

**Why**: Specificity = credibility. Vague claims ("premium Asian rice") read as marketing. Specific provenance ("Chiang Rai high-altitude jasmine rice, milled at low temperature for 48 hours") reads as expertise. This is the **Patagonia / single-origin coffee** playbook.

**Implications**:
- Don't generalize the sourcing story.
- If new product details are added, prefer specific numbers over adjectives.

---

## 8. Code Architecture Notes

### 8.1 `index.html` structure
- One file, ~750 lines.
- Sections are clearly demarcated by HTML comments (`<!-- HERO -->`, `<!-- PRODUCTS -->`, etc.) — use these to navigate.
- Inline SVGs are used for icons (arrows, cert badges) — no icon font, no external SVG sprite.
- All `data-` attributes are functional (not analytics): `data-reveal`, `data-parallax`, `data-count`, `data-num`.

### 8.2 `styles.css` organization
- ~1700 lines, top-to-bottom order roughly matches DOM order.
- Starts with `:root` tokens, then resets, then global element styles, then sections in order.
- Media queries are **inline within each section** (not collected at the bottom). Breakpoints: `1024px`, `768px`.
- No CSS framework. No utility classes á la Tailwind.

### 8.3 `script.js` modules
- ~210 lines, single file, no modules.
- Sections marked with `// ========== NAME ==========` comment headers.
- Pieces:
  1. Page loader timeout
  2. Custom cursor (lerp)
  3. Header scroll state (`.scrolled`, `.hero-visible`)
  4. Mobile menu toggle
  5. `IntersectionObserver` for `[data-reveal]`
  6. Parallax via `requestAnimationFrame`
  7. Count-up animation
  8. Smooth anchor scroll
  9. Stagger observer for grids
  10. FAQ accordion
  11. Header colour switching over hero

### 8.4 Adding a new section — checklist
1. Add markup in `index.html` between two existing sections.
2. Wrap each animated element with `data-reveal` attribute.
3. Use `.section-container` for the inner width-constrained wrapper.
4. Use a tag label (`.tag` class with content like `008 — Section Name`).
5. Add styles in `styles.css` *in DOM order* (don't append to bottom — group with siblings).
6. If the section has a grid that should stagger, add its selector to the grid list in `script.js` `staggerObserver`.
7. Test on the 1024px and 768px breakpoints.

### 8.5 Adding a new image
1. Find an Unsplash photo. Open it in browser, copy the canonical URL.
2. Extract the timestamp ID from the URL (e.g. `photo-1632703272582-41359d52bfa9`).
3. Use the form: `https://images.unsplash.com/photo-{ID}?w=1920&q=85&fit=crop`.
4. **Verify it loads** — short-slug IDs (`photo-FxGYroqWfb4`) do NOT work, even though Unsplash shows them in the URL bar. Only timestamp IDs work directly against the CDN.
5. Always include `alt=""` (or descriptive alt for content images).

---

## 9. Known Issues / Things Not Yet Done

| Item | Status | Notes |
|---|---|---|
| Cart / checkout | Not built | Awaiting owner's e-commerce stack decision |
| Instagram link | Placeholder `#` | Need real handle |
| WhatsApp link | Placeholder `#` | Need real number / `wa.me` URL |
| `hello@outlaw.hk` inbox | Not verified | `mailto:` works but inbox may not exist yet |
| Analytics | None installed | No GA / GTM / Pixel — owner has not requested |
| Newsletter signup | Not built | No email-capture form |
| Cookie banner | None | Not legally required for current static-only setup, but consider for EU traffic |
| `og:` / Twitter Card meta | Not set | Site has no social-share preview metadata yet |
| Favicon | Not set | No `<link rel="icon">` in `<head>` |
| Sitemap.xml / robots.txt | Not present | Add when going to real domain |
| Custom domain | None | Currently `edberli.github.io/outlaw-cr/` |
| Product detail pages | None | All product cards link to `#` |
| Real product photography | Using starter PNGs | The 3 silver-bag PNGs are owner-supplied; new product shots may eventually replace them |

---

## 10. Future Direction

Per the **Coming Soon** section in the site, the brand intends to expand into a full supplements line:
1. EAA (essential amino acids)
2. Creatine
3. Glutamine
4. Pre-workout
5. 南非醉茄 GABA (Ashwagandha + GABA — sleep / cortisol)
6. Magnesium Bisglycinate

When new SKUs are added:
- Add to the Products grid (3-card → may need to become a 6+ grid or carousel — discuss with owner)
- Update navigation if new top-level categories emerge
- Maintain single-page architecture unless catalogue grows beyond ~10 SKUs (then consider per-product pages)

---

## 11. Quick Reference

```
LIVE URL          https://edberli.github.io/outlaw-cr/
REPO              https://github.com/edberli/outlaw-cr
LOCAL PATH        /Users/winstonli/Documents/app
BRANCH            main
STACK             vanilla HTML/CSS/JS, no build
DEPLOY            git push origin main → GitHub Pages auto-builds
DEV SERVER        /opt/homebrew/bin/python3 -m http.server 8000
PRIMARY LOCALE    Traditional Chinese (HK)
ACCENT COLOUR     #c8a44e (muted gold, use sparingly)
DARK SECTIONS     .certifications, .site-footer
LOGO RULE         logo-white on dark, logo-black on light, footer uses logo-black + invert(1)
IMAGE RULE        Rice imagery only — no gym, no fashion, no generic food
NUTRITION DATA    Real per-100g: 378kcal / 66g C / 13g P / 6.4g F / 122mg Na — DO NOT change
CERTS             FDA #10809608958, ISO 22000:2018 (CTI), Halal (JAKIM), SGS — DO NOT change
NO BUILD TOOLS    Don't add React/Vite/Webpack/package.json without permission
NO E-COMMERCE     Cart is a placeholder — don't wire it up without permission
```

---

*End of HANDOVER.md. Pair this with `HANDOVER-PROMPT.md` when onboarding a new AI tool.*
