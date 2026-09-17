# Decon Art Website

Static sales site for DECON ART microcement services with a calculator and Netlify lead form.

## Current environment

- Production: <https://deconart.ge>
- Repository: <https://github.com/blackvativ/deconart-website>
- Hosting and lead capture: Netlify
- Domain registrar: namespace.ge
- Facebook: <https://www.facebook.com/profile.php?id=61588337703082>

This is the public marketing site. The separate private recipe catalog at
`deconart-finishes.vercel.app` is a different application and is not deployed
from this repository.

## Public sales scope

The authoritative public scope is `Microcement_Sales_Scope_Final_GE.docx`.
The site offers wall work (90 GEL/m²), floor/wet-area/selective ceiling work
(140 GEL/m²), iron doors (1,200 GEL/door), skirting (30 GEL/linear m), and
individually priced stairs, complex details, and heights. It serves residential
and commercial projects in Tbilisi and environs. Standard jobs have a minimum
of 30 m² or 2,500 GEL. DeconArt is currently not a VAT payer, so VAT is not
added to the published prices.

The calculator deliberately covers only wall, floor, wet-area, and selective
ceiling rates. It applies `max(rate × area, 2500)` and never invents a
complexity multiplier. Furniture and nonstandard surfaces, including the
prelaunch table collection, remain a separate interest path.

## Local development

Requirements: Python 3 for the preview server and Node.js for checks/builds. No package installation is required.

```bash
npm run dev
```

Open <http://127.0.0.1:4173>. You can also run the server directly:

```bash
python3 -m http.server 4173
```

Run the zero-dependency integrity checks before committing:

```bash
npm run check
```

Create the exact Netlify publish directory locally:

```bash
npm run build
```

Only the allowlisted website files in `dist/` are published. Source photos, documentation, and repository working notes stay outside the deploy output.

Read `AGENTS.md` before making content, product, deployment, or business-system
changes. It records the authoritative DeconArt sources, current strategy, and
approval boundaries.

## Deployment

The GitHub repository is already connected to Netlify and `deconart.ge` is already configured. `netlify.toml` runs the zero-dependency build and publishes `dist/`. Production publishing is therefore a Git push, not a new hosting setup. Confirm the intended changes, run `npm run check && npm run build`, then push the approved commit and verify the live URL.

## Form delivery

The contact form is prepared for `Netlify Forms`:

- Form name: `project-request`
- Uses standard HTML `POST` submission to `/thanks.html` for reliable Netlify handling
- Captures name, phone, residential/commercial space type, project type,
  quantity with its unit, location, current substrate, desired start, desired
  finish, known issues, and an optional message
- Requires the source-document intake fields and tells visitors to enter
  "unknown" when a detail has not yet been decided
- Explains that form data is processed through Netlify and that Messenger
  photos should use the same name and phone so the two submissions can be matched
- Also submits calculator context when the visitor carries an estimate into the form:
  - `estimated_rate`
  - `estimated_total`

After deployment to Netlify:

1. Open the site in Netlify.
2. Go to `Forms`.
3. Confirm that `project-request` appears after the first deploy.
4. Add email notifications to `berishvili.iko@gmail.com`.

Netlify path:

- `Site configuration` -> `Forms` -> `Form notifications` -> `Add notification` -> `Email notification`

## Release checklist

1. Run `npm run check && npm run build`.
2. Review the page at desktop and mobile widths.
3. Confirm the authoritative 90 GEL/m² wall and 140 GEL/m² floor/wet-area/
   selective-ceiling rates, 2,500 GEL project minimum, and non-calculator
   service details are still current.
4. Push only after publication is approved.
5. Verify `https://deconart.ge`, `/robots.txt`, `/sitemap.xml`, and `/og.png`.
6. Confirm Netlify still recognizes the `project-request` form.
7. Submit one production test lead and confirm its notification arrives.

## Notes

- Local file preview will not send form submissions anywhere; Netlify Forms works after deployment.
- If later you want CRM integrations, spam filtering, or WhatsApp/SMS notifications, the next clean upgrade is Netlify + Zapier or Make.
- Product-launch inputs and recommended conversion work are tracked in `NEXT-JOB.md`.
