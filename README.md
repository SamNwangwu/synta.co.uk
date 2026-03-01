# synta.co.uk

Synta marketing website. Deployed via Azure Static Web Apps.

## Local development

```bash
npm install
npm run dev
```

## Deployment

Push to `main` branch triggers auto-deploy via GitHub Actions.

## Authentication

`staticwebapp.config.json` enforces Entra ID authentication.  
To make the site public, remove the `routes` section from the config.

## Structure

- `/` — Home page (landing, products, blog previews, CTA)
- `/blog/m365-licence-waste` — Optimize blog post
- `/blog/azure-governance` — Govern blog post
