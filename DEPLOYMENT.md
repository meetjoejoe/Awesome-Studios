# Production deployment

## Current verified state

The application builds with `pnpm build`, passes `pnpm check`, and passes the complete Vitest suite. The managed preview contains the public site, complete navigation, theme switching, ambient sound control, CMS archive routes, protected admin console, inbox, team profile manager, and audit log.

## Resend

The project secrets are configured as follows:

- `ADMIN_NOTIFICATION_EMAIL=calebabugh7@gmail.com`
- `RESEND_FROM_EMAIL=Awesome Studios <onboarding@resend.dev>`

The Resend key was validated against the send endpoint without dispatching an email. Before production, replace `onboarding@resend.dev` with a sender on a verified Awesome Studios domain in Resend. The contact and talent procedures call the server-side Resend helper after storing the submission, so the admin inbox remains the source of truth even if delivery is temporarily unavailable.

## Vercel

The supplied URL `https://awesome-studios-wz98.vercel.app/` currently returns Vercel `404 NOT_FOUND`, which means it is not serving this repository/build. It needs to be connected to the Awesome Studios repository and configured with the project root and build settings. Use the project root as the repository root, install with `pnpm install`, build with `pnpm build`, and serve the generated Node entry with `pnpm start`. Add the server-side secrets from the WebDev project to Vercel's Production environment; never commit them to this ZIP.

The managed WebDev runtime is the verified deployment target for this build because it supplies the application database, OAuth session runtime, and environment bindings. If deploying to Vercel, the production database URL, JWT/session secret, OAuth values, Resend values, storage values, and public site URL must all be supplied explicitly.

## Sound

The original ambient bed is uploaded to managed WebDev storage at `/manus-storage/awesome-studios-ambient_b4d540b0.mp3`. The public header exposes a user-initiated sound toggle; audio does not autoplay, which avoids browser autoplay blocking. If the app is moved outside WebDev, copy the bundled `assets/awesome-studios-ambient.mp3` to the public asset location or replace `SOUND_URL` in `client/src/contexts/SoundContext.tsx` with the deployed CDN URL.

## Admin access

`/admin` is protected by the existing Manus OAuth session and server-side role checks. The owner account is promoted during user upsert. To add other administrators, update the `users.role` value to `admin`, `department_admin`, or `super_admin` in the database. The admin console has Overview, Content, Inbox, Team, and Audit Log pages.

## Team data

The supplied 25-person roster is loaded into `team_members` as published records, with niche/role fields and replaceable DiceBear initials mockups. The public Team page renders all 25 profiles. Super Admins can edit names, ranks, image URLs, display order, and publication state from the Team manager.

## Verification commands

```bash
pnpm install
pnpm check
pnpm test
pnpm build
```
