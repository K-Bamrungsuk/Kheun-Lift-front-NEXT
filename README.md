# Kheun Lift (Next.js frontend)

Copy `.env.example` to `.env` and set `NEXT_PUBLIC_API_URL=http://localhost:3001`
(the Go API in `../kheun-lift-backend-go`). Then run `npm install` and `npm run dev`,
and open http://localhost:3002. `/` redirects to `/dashboard`.

## Screens

- `/login`, `/register`: register logs you in right away.
- `/dashboard`: athlete overview, personal records, last 5 lifts, and the top 3 of a
  random leaderboard. New users see an onboarding form (gender + body weight) until
  they fill it in.
- `/leaderboard`: verified lifts by exercise, gender and weight class; the filters
  live in the URL.
- `/log-lift`: submit a lift with a video URL (opens as a modal from the nav).
- `/profile`: details, records, lift ledger, log out, delete account.
  `/profile/edit` and `/profile/picture` open as modals from the profile page.

## Structure

- `app/`: routes only. `(app)` is the signed-in group (shell + `@modal` slot),
  `(auth)` is login/register.
- `features/<name>/`: components, `api.ts` (browser calls), `api-server.ts`
  (server calls), `types.ts`.
- `lib/api.ts` / `lib/api-server.ts`: fetch to Go; the server version forwards the
  session cookie.
- `proxy.ts` sends visitors without a `kheun_session` cookie to `/login`; the `(app)`
  layout checks the session with Go.

## Design

Based on the Home, Log Lift, Profile, and Leaderboard screens in the
Kheun Lift Redesign Stitch project (`12812117071399498758`). Navy surfaces,
muted gold accents, compact cards, monospaced metrics, and bottom navigation
follow the mobile reference, with a wider layout for desktop.

Colors and font stacks are defined in `app/globals.css`, using Tailwind utilities.
The font stacks use Plus Jakarta Sans and JetBrains Mono when installed, with
Segoe UI / sans-serif and Consolas / monospace fallbacks. No external font request
or new dependency is required.

## Checks

- `npm run lint`
- `npx --no-install tsc --noEmit --incremental false`

Do not run a production build without explicit approval (see `CLAUDE.md`).
