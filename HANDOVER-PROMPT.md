# HANDOVER PROMPT — paste this into a new AI session (Codex / Cursor / Claude / etc.)

---

You are taking over development of the **界外 OUTLAW** website — a Hong Kong premium nutrition brand selling instant cream of rice (即食純米糊). Before you do **anything**, follow these steps.

## STEP 0 — Read the full handover doc first

Open and read `HANDOVER.md` in the project root **completely** before suggesting or making any changes. It contains:
- Repository, deployment, and live URL
- Tech stack and (intentional) architectural decisions
- Full site structure and design system
- **Design Decisions & Rationale** — the "why" behind every choice. This is the most important section. Read it twice.
- Known issues and roadmap

Do not skim. The owner has already iterated through several rounds of feedback that are encoded in those decisions; ignoring them will require rework.

## STEP 1 — Understand the project at a glance

- **Repo**: https://github.com/edberli/outlaw-cr (branch: `main`)
- **Live**: https://edberli.github.io/outlaw-cr/
- **Local**: `/Users/winstonli/Documents/app`
- **Stack**: vanilla HTML + CSS + JS. **No framework, no bundler, no `package.json`, no build step.** This is deliberate.
- **Files**: `index.html` (~750 lines), `styles.css` (~1700 lines), `script.js` (~210 lines), `images/` folder.
- **Deploy**: GitHub Pages auto-builds on push to `main`. No CI.
- **Locale**: Traditional Chinese (繁體 / 港式) for body copy, English for display headings.
- **Credentials**: There are **none**. No API keys, no env vars, no secrets. Static site.

## STEP 2 — Critical rules — DO NOT do these without explicit owner permission

1. **DO NOT introduce a framework** (React, Vue, Next, Astro, Svelte, etc.). The vanilla-stack choice is deliberate — see HANDOVER.md §7.4.
2. **DO NOT add a build tool** (Vite, Webpack, esbuild, Parcel) or a `package.json`.
3. **DO NOT introduce TypeScript with a compile step.** If you need type hints, use JSDoc.
4. **DO NOT change the nutrition numbers** (378 kcal / 66g C / 13g P / 6.4g F / 122mg Na per 100g). They are real owner-supplied data.
5. **DO NOT change the certifications** (FDA Reg. 10809608958 / ISO 22000:2018 by CTI / Halal by JAKIM / SGS). Real claims only.
6. **DO NOT remove or rename items in the Coming Soon list** (EAA, Creatine, Glutamine, Pre-workout, 南非醉茄 GABA, Magnesium Bisglycinate). That's the actual roadmap.
7. **DO NOT use generic fitness photos** (gym shots, athletes, weights). Imagery must be **rice-related only** — rice fields, rice paddies, rice grains, rice in bowls.
8. **DO NOT use Unsplash short-slug photo IDs** (`photo-FxGYroqWfb4` format). Only timestamp IDs (`photo-1632703272582-41359d52bfa9`) work as direct CDN URLs.
9. **DO NOT shrink the logos.** Header 88px, loader 180px, footer 160px. The logo PNGs have built-in transparent padding — sizes were tuned with that in mind.
10. **DO NOT change the hero image** without permission — `photo-1605296867304-46d5465a13f1` is owner-approved.
11. **DO NOT wire up the cart / product links** to a real backend. They are intentional placeholders pending the e-commerce stack decision.
12. **DO NOT add analytics, pixels, or trackers** without asking.
13. **DO NOT translate the site to Simplified Chinese or English-only.** It is a single-locale Traditional Chinese (HK) site.
14. **DO NOT remove the page loader, custom cursor, or scroll animations.** They are part of the brand experience — see HANDOVER.md §7.7, §7.8.
15. **DO NOT make the design louder.** No bright colours, no gradients, no shouty CTAs. The Japanese-minimalist restraint is the brand differentiation — see HANDOVER.md §7.1.
16. **DO NOT shorten the page loader below 1.4s.** It's a deliberate brand pause, not a performance bug — see HANDOVER.md §7.8.
17. **DO NOT skip the `git push origin main`** after edits — the live site only updates on push.

## STEP 3 — Design direction summary

- **Aesthetic**: Japanese-minimalist editorial (日系極簡). Reference: lyft-fit.com.
- **Palette**: warm off-white background (`#f5f4ef`), near-black text (`#3a3a3a`), muted gold accent (`#c8a44e`) used **sparingly**. Two dark sections: certifications and footer.
- **Typography**: Archivo (English headings), Noto Sans TC (Chinese), Space Grotesk (small labels / tags). Three-font system, all loaded from Google Fonts via single `<link>`.
- **Layout**: lots of whitespace, full-bleed image strips with parallax, generous section padding, tight letter-spacing on display headings.
- **Tone**: confident, restrained, single-minded. Specific numbers > vague adjectives. Hong Kong–style Traditional Chinese.
- **Imagery**: rice only. Rice fields, paddies, grains, bowls. No gym, no models, no generic food.
- **Animation**: scroll-reveal via IntersectionObserver, parallax, stagger reveal on grids, count-up on stats, 1.4s page loader, lerp-smoothed custom cursor.

## STEP 4 — Local development

```bash
cd /Users/winstonli/Documents/app
# Static server (no install):
/opt/homebrew/bin/python3 -m http.server 8000
# Or live-reload (one-time `npm i -g live-server` first):
/opt/homebrew/bin/npx live-server --no-browser
```

Open `http://localhost:8000` (or `:3000` for live-server).

Edit any of `index.html`, `styles.css`, `script.js` and refresh. No build step.

## STEP 5 — Deploy

```bash
git add -A
git commit -m "your message"
git push origin main
# Wait <1 minute, then check https://edberli.github.io/outlaw-cr/
```

If GitHub Pages doesn't auto-rebuild for some reason:
```bash
gh api repos/edberli/outlaw-cr/pages/builds -X POST
```

## STEP 6 — When you're not sure, ASK

The owner's preferences are encoded in HANDOVER.md §7 (Design Decisions & Rationale). When a request is ambiguous, **default to the existing pattern** rather than introducing a new one. If you're considering a structural change (new framework, new section type, new colour, new image style), **ask the owner first**.

---

## TL;DR for the impatient AI

Read HANDOVER.md. Don't add a framework. Don't change the nutrition or cert data. Don't add gym photos. Don't shrink the logos. Don't shorten the loader. Keep it Japanese-minimalist, Traditional Chinese, vanilla HTML/CSS/JS, deployed via GitHub Pages on push to `main`. When unsure, ask the owner.
