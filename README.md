# Awesome Studios

Awesome Studios is a full-stack entertainment studio platform for an African creative company based in Nigeria. The public experience is editorial and cinematic; the studio console is practical, protected, and database-backed.

## Included in this build

- Public home, About, Team, Contact, Talent intake, Search, and archive routes for comics, games, video, animation, music, projects, characters, universes, artwork, releases, and updates.
- One shared functional navigation system with desktop Explore dropdown, responsive mobile drawer, search, Studio Login, theme toggle, and ambient sound toggle.
- Persistent dark/light theme tokens that change surfaces and contrast without changing the Manrope, Space Grotesk, and DM Mono typography.
- Original ambient instrumental sound bed with user-initiated playback to respect browser autoplay rules.
- Database-backed CMS content records and workflow statuses: draft, submitted, in review, approved, rejected, scheduled, published, and archived.
- Protected admin console pages for Overview, Content, Inbox, Team, and Audit Log.
- Server-side role enforcement for regular users, Department Admins, and Super Admins.
- Private contact and talent submissions stored server-side, with Resend notification delivery configured for `calebabugh7@gmail.com`.
- Cloudinary signed-upload signature endpoint with provider secrets kept server-side.
- Audit log writes for administrative content actions.
- Mobile-first responsive layouts, semantic labels, visible focus states, and reduced-motion-aware CSS.

## Development

```bash
pnpm install
pnpm check
pnpm test
pnpm build
```

The managed WebDev runtime supplies the application database and Manus session runtime. Provider secrets are stored outside the repository. Read `DEPLOYMENT.md` for Resend sender verification, Vercel configuration, admin authorization, audio asset handling, and the team-data note.

## Production note

The supplied Vercel URL currently returns `404 NOT_FOUND`, so it is not serving this project yet. Connect the repository/build to Vercel and add the production environment variables described in `DEPLOYMENT.md`. The managed WebDev preview is the verified running target for this build.
