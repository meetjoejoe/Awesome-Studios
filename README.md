# Awesome Studios

Awesome Studios is a full-stack entertainment studio platform for an African creative company based in Nigeria. The public experience is editorial and cinematic; the studio console is intentionally practical and information-dense.

## Implemented in this build

- Public home, about, team, contact, talent intake and search routes.
- Database-backed content models for comics, games, videos, animation, music, projects, characters, universes, artwork, releases and updates.
- Content workflow statuses: draft, submitted, in review, approved, rejected, scheduled, published and archived.
- Server-side role enforcement for regular users, Department Admins and Super Admins.
- Public queries only return published content whose publication date has arrived.
- Private contact and talent submissions stored server-side.
- Cloudinary signed-upload signature endpoint with secrets kept server-side.
- Resend notification helper that reports provider configuration truthfully and never claims delivery when the provider was not called successfully.
- Audit log model and audit writes for administrative content actions.
- Dark theme by default, with a persistent light-theme option from the existing theme context.
- Mobile-first responsive layouts, semantic labels, visible focus states and reduced-motion-aware CSS.

## Local development

```bash
pnpm install
pnpm check
pnpm test
pnpm build
```

The managed WebDev runtime supplies the application database and Manus session runtime. The supplied Supabase, Google, Cloudinary and Resend variables are stored as server-side project secrets. Supabase is preserved as the intended production backend configuration; this WebDev scaffold currently uses its managed Drizzle database for the running application so migrations and preview verification remain reproducible.

## Production configuration still required

Set `RESEND_FROM_EMAIL`, `ADMIN_NOTIFICATION_EMAIL` and `PUBLIC_SITE_URL` when the sending domain and deployment domain are known. Configure the Google OAuth consent screen and redirect URL in the provider dashboard, and configure the real production callback / site URLs once the final host is available. Cloudinary upload presets and transformation policies should be finalized before accepting large media uploads. Do not commit `.env` files or provider secrets.
