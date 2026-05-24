# Admin and Production Readiness Notes

- Admin login lives at `/admin/login`; the dashboard is `/admin`.
- Root admin credentials come from `ADMIN_EMAIL` plus `ADMIN_PASSWORD_HASH`. `ADMIN_PASSWORD` is only for first boot or local bootstrap so the server can hash and upsert the root admin.
- The admin cookie is named `admin_session`, is separate from the regular user session cookie, and is httpOnly. It is secure in production.
- `POST /api/admin/login` is rate-limited to 10 attempts per 15 minutes per IP.
- Add `VITE_API_BASE_URL` for the Vite client. Locally it should point at the Express server, for example `http://localhost:3001`; production should point at `https://repoid.space`.
- OAuth callback paths must match the actual Express route paths, not assumed NextAuth paths. The exact paths depend on whether the app uses Passport.js or a custom OAuth handler, so check the implemented Express routes before updating Google and GitHub OAuth consoles.
- The Vercel tool does not expose secret-setting here, so production verification assumes secrets are added through Vercel dashboard or CLI before deploy.
- Ensure `vercel.json` routes API traffic to the Express entry point and that Express serves the Vite `dist` folder with fallback routing. This keeps direct navigation to `/admin` and nested React routes from 404ing in production.
- Monthly pricing is controlled by `MONTHLY_PLAN_AMOUNT_PAISE=9900`.
