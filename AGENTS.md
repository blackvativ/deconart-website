# DeconArt website working context

Read this file before changing the DeconArt website.

## Source of truth

- Production site: <https://deconart.ge>
- GitHub: <https://github.com/blackvativ/deconart-website>
- Hosting: Netlify. The live response is served by Netlify and `deconart.ge` uses Netlify DNS (`dns1`–`dns4.p07.nsone.net`).
- Registrar: namespace.ge (user-confirmed on 2026-09-16).
- Facebook: <https://www.facebook.com/profile.php?id=61588337703082>
- Current strategy/project record: [Deconart tabletops](https://app.notion.com/p/3cd8eceaa6fd81b587fbed0878c0919e) in the canonical Shared Projects database.
- Business-system rules: `EVERYTHING OBSIDIAN/EVERYTHING/85 Systems/Business Operating System/BUSINESS SYSTEM.md` in the parent workspace.
- Local brand, recipes, finishes, and operational notes: `EVERYTHING OBSIDIAN/EVERYTHING/Business/20 Deconart/` in the parent workspace.

## Do not confuse the two DeconArt sites

1. `deconart.ge` is the public sales website in this repository. It is a static Netlify site with a quote calculator and Netlify lead form.
2. `deconart-finishes.vercel.app` is a separate private finishes/recipe catalog stored locally under `Business/20 Deconart/App`. It is hosted on Vercel and is not the public marketing site.

## Current public facts

- Brand: DECON ART / Deconart (formerly DecoNut; renamed 2026-08-05).
- Primary offer: microcement services for residential and commercial interiors
  in Tbilisi and environs: wall, floor, bathroom/wet area, shower, stair,
  skirting, iron door, and selective ceiling projects.
- Published rates: wall 90 GEL/m²; floor, bathroom/shower, and selective
  ceiling 140 GEL/m²; iron door 1,200 GEL/door; skirting 30 GEL/linear m.
  Standard project minimum: 30 m² or 2,500 GEL. DeconArt is currently not a
  VAT payer, so VAT is not added to the published prices.
- Furniture and nonstandard surfaces are separate custom projects. Kitchen
  backsplashes are not part of the standard offer.
- Public address: Tbilisi, Ioseliani St. 107.
- Public phone: +995 577 789 990.
- Published finishes: Sage Mist, Linen, Pearl, Warm Stone, Glacier, Forest Sage.
- Lead form name: `project-request`; submissions are handled by Netlify Forms and redirect to `/thanks.html`.
- No Instagram link, product shop, cart, or Shopify storefront is currently present.

## Current business direction

The active Notion project shifts DeconArt toward modern dining and coffee tables:

- Tops: MDF coated with real DeconArt microcement.
- Legs: primarily stainless steel; acrylic is optional.
- First finishes: Sage Mist, Warm Stone, and the real beige board sample.
- Use real finish/sample photos in renders, never generic concrete textures.
- Assumed sizes are only placeholders until Iko confirms dimensions: dining about 180×90 cm and coffee about 120×60 cm.
- Default finished heights: dining 75 cm; coffee 40–45 cm; assumed top thickness 3 cm.
- Start with one table, one size, two or three colors, and one leg style; make and photograph real showroom pieces before adding a full shop.
- Existing wall/floor jobs continue until Iko explicitly decides otherwise.

## Approval boundaries

- Do not buy from 1688, message suppliers, message clients, publish production changes, move money, or change the CRM architecture without Iko's explicit approval.
- Do not invent product dimensions, pricing, delivery terms, workshop ownership, showroom status, or supplier facts.
- Structural DeconArt/Notion changes require the workspace `AGENTS.md` process: inspect the live schema, obtain approval, preserve legacy records, then update the business-system documentation and snapshot.
- Never store credentials or private customer data in this repository.

## Technical shape

- Static HTML/CSS/JavaScript: `index.html` and `thanks.html`.
- `npm run build` copies only public files into `dist/`; Netlify publishes that directory through `netlify.toml`.
- The build has no third-party dependencies.
- Optimized local images live under `assets/`; keep the original source files until a separate cleanup is approved.
- `og.png` is the generated 1200×630 social-sharing card.
- `robots.txt`, `sitemap.xml`, and `_headers` are part of the Netlify deployment.
- Use `npm run dev` (or `python3 -m http.server 4173`) for local preview.
- Use `npm run check && npm run build` before committing.
