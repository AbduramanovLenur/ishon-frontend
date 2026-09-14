# Ishon frontend

React, TypeScript and Vite frontend for https://app.ishonhr.uz.

## Local development

Use Node.js 24, run `npm ci`, copy `.env.example` to `.env`, set
`VITE_API_BASE_URL`, and run `npm run dev`.

## GitHub Actions

`.github/workflows/frontend.yml` runs `npm ci`, ESLint and the TypeScript/Vite
production build for pull requests to `main`, pushes to `main`, and the initial
CI/CD setup branch. Build artifacts are retained for seven days.

After a merge to `main`, the deployment job publishes the exact checked build to
`/var/www/ishon-frontend` on `185.185.82.253`. Manual runs deploy only when run
against `main`. Production deployment jobs are serialized and never interrupted
by a newer deployment. The public API build setting is `https://api.ishonhr.uz`.
Vite settings are embedded in browser code and must never contain secrets.

### Server setup

Use the existing `deploy` SSH account. Grant it write access to
`/var/www/ishon-frontend` and install a dedicated frontend public key in
`~/.ssh/authorized_keys` with the `restrict` option. The existing Nginx
configuration already serves this directory with SPA fallback and uncached HTML;
no Nginx reload is needed for deployments.

The frontend repository uses these GitHub Actions secrets:

- `DEPLOY_SSH_KEY`: the dedicated account's private Ed25519 key.
- `DEPLOY_KNOWN_HOSTS`: the server host-key entry for `185.185.82.253`, verified
  through the existing trusted administrator SSH connection.

The deployment uploads assets before atomically replacing `index.html`, then
checks that the public HTTPS endpoint serves the exact new HTML. Existing hashed
assets are retained so open browser sessions can still load their old chunks.
Monitor disk usage and clean up old assets during scheduled maintenance.
A failed HTTPS check marks deployment failed; it does not automatically roll back.
To roll back, revert the application commit on `main` and merge the revert to
build and deploy that version again.

Production credentials are used only by the deployment job on `main`.
Local `.env` files are ignored; `.env.example` remains tracked.
