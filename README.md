# Decon Art Website

Static landing page for DECON ART with a calculator and a lead form.

## Current environment

- Production: <https://deconart.ge>
- Repository: <https://github.com/blackvativ/deconart-website>
- Hosting and lead capture: Netlify
- Domain registrar: namespace.ge
- Facebook: <https://www.facebook.com/profile.php?id=61588337703082>

This is the public marketing site. The separate private recipe catalog at
`deconart-finishes.vercel.app` is a different application and is not deployed
from this repository.

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
- Captures name, phone, project type, area, location, and an optional note
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
3. Confirm the 90 GEL/m² and 110 GEL/m² starting prices are still current.
4. Push only after publication is approved.
5. Verify `https://deconart.ge`, `/robots.txt`, `/sitemap.xml`, and `/og.png`.
6. Confirm Netlify still recognizes the `project-request` form.
7. Submit one production test lead and confirm its notification arrives.

## Notes

- Local file preview will not send form submissions anywhere; Netlify Forms works after deployment.
- If later you want CRM integrations, spam filtering, or WhatsApp/SMS notifications, the next clean upgrade is Netlify + Zapier or Make.
- Product-launch inputs and recommended conversion work are tracked in `NEXT-JOB.md`.
