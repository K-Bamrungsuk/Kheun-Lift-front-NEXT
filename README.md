# Kheun Lift Next.js frontend

The app needs the Go API from `../kheun-lift-backend-go` running on port 3001.
Copy `.env.example` to `.env` and set `NEXT_PUBLIC_API_URL=http://localhost:3001`.
Run `npm install` and `npm run dev`, then open http://localhost:3002.
`/` redirects to `/dashboard`.

## Screens

- `/login` and `/register`. Registering logs the user in right away.
- `/dashboard` shows the athlete overview, personal records, the last 5 lifts,
  and the top 3 of a random leaderboard. New users see an onboarding form for
  gender and body weight until they fill it in.
- `/leaderboard` ranks verified lifts by exercise, gender and weight class.
  The URL holds the filters.
- `/log-lift` submits a lift with a video URL. The navigation link opens it as a modal.
- `/profile` shows details, records and the lift ledger, with log out and
  delete account buttons. The profile page opens `/profile/edit` and
  `/profile/picture` as modals.

## Structure

- `app/` holds routes only. `(app)` is the signed-in group with the shell and
  the `@modal` slot. `(auth)` holds login and register.
- `features/<name>/` holds components, `api.ts` for browser calls,
  `api-server.ts` for server calls, and `types.ts`.
- `lib/api.ts` and `lib/api-server.ts` call Go. The server version forwards
  the session cookie.
- `proxy.ts` sends visitors without a `kheun_session` cookie to `/login`.
  The `(app)` layout then checks the session with Go.

## Design

The design comes from the Home, Log Lift, Profile and Leaderboard screens in
the Kheun Lift Redesign Stitch project, id `12812117071399498758`. Navy surfaces,
muted gold accents, compact cards and bottom navigation follow the mobile
reference, with a wider layout for desktop.

Colors and the font are in `app/globals.css`. The app uses IBM Plex Sans Thai
from `next/font/google`, one family for Latin and Thai text, with Segoe UI and
sans-serif as fallbacks.

## Checks

- `npm run lint`
- `npx --no-install tsc --noEmit --incremental false`

Do not run a production build without explicit approval. Rule 5 in `CLAUDE.md` sets this.
