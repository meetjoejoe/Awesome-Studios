# Local Windows setup with npm

Use Node.js 22 or newer. From the extracted project folder, run:

```powershell
npm install
npm run check
npm test
npm run build
npm run dev
```

Open `http://localhost:3000` after the development server starts. Do not run `npm run check`, `npm test`, or `npm run build` before `npm install`; those commands depend on locally installed TypeScript, Vitest, Vite, and esbuild binaries.

Create a file named `.env` in the project root and add the environment variables required by your deployment. Never commit `.env` or put real API keys in the repository. At minimum, local admin credentials are:

```text
ADMIN_LOGIN_USERNAME=caleb01
ADMIN_LOGIN_PASSWORD=replace-this-password-before-production
```

The managed deployment has the requested credentials configured server-side. For local use, set the password yourself in `.env`; use a new strong password before making the site public. The app keeps OAuth sign-in available as a second admin-login option.

If npm reports `ERESOLVE`, first confirm that the project contains the updated `package.json` and `package-lock.json`, then run:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

The previous conflict came from an unused `@builder.io/vite-plugin-jsx-loc` dependency; it has been removed from the updated package configuration. Do not use `--force` unless you are troubleshooting an older copy of the ZIP.

For the database, apply the existing Drizzle migrations and then run `database/team_roster_seed.sql` to load the 25 supplied profiles. The production-ready ZIP includes that seed file.
