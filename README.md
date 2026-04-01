# Decon Art Website

Static landing page for DECON ART with a calculator and a lead form.

## Recommended setup

Use `Netlify` for hosting and form handling.

Why this fits this project:

- Single static `index.html`, so there is no backend to maintain.
- Netlify can detect the HTML form and store submissions automatically.
- Netlify can send instant email notifications for new leads.
- Pointing a Georgian domain to Netlify is straightforward with DNS records.

## Form delivery

The contact form is prepared for `Netlify Forms`:

- Form name: `project-request`
- Uses standard HTML `POST` submission to `/thanks.html` for reliable Netlify handling
- Captures contact form fields
- Includes an `email` field so Netlify notification emails can use `Reply-To`
- Also submits calculator data:
  - `estimated_rate`
  - `estimated_area`
  - `complexity_factor`
  - `estimated_total`

After deployment to Netlify:

1. Open the site in Netlify.
2. Go to `Forms`.
3. Confirm that `project-request` appears after the first deploy.
4. Add email notifications to `berishvili.iko@gmail.com`.

Netlify path:

- `Site configuration` -> `Forms` -> `Form notifications` -> `Add notification` -> `Email notification`

## Domain

If you buy the domain from a Georgian provider, keep the registrar there and just point DNS to Netlify.

Typical options:

- Use Netlify DNS if your registrar allows custom nameservers.
- Or keep the registrar DNS and add the `A` / `CNAME` records Netlify gives you.

## Suggested launch flow

1. Create GitHub repo.
2. Push this folder.
3. Import the repo into Netlify.
4. Deploy with no build command.
5. Connect the custom domain.
6. Add the email notification to `berishvili.iko@gmail.com`.
7. Submit one real test lead.

## Notes

- Local file preview will not send form submissions anywhere; Netlify Forms works after deployment.
- If later you want CRM integrations, spam filtering, or WhatsApp/SMS notifications, the next clean upgrade is Netlify + Zapier or Make.
