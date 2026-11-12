# Kheun Lift

Run `npm install` and `npm run dev`, then open http://localhost:3002.
The home route `/` redirects to `/dashboard`. The public marketing page has been removed.

## Screens

- `/dashboard`: athlete overview, personal records, recent lifts, and top-three rankings.
- `/leaderboard`: sample exercise rankings with the sample athlete highlighted.
- `/profile`: sample athlete details, personal records, and lift ledger.
- `/log-lift`: editable UI preview with native discipline selection, load, reps, video URL, and notes. Submission is disabled. Inputs are not persisted.
- `/login` and `/register`: existing account placeholders.

## Structure

Route files stay in `app/`. The dashboard route group shares `components/layout/app-shell.tsx`
and `app-navigation.tsx`. The shell includes the demo notice, desktop navigation,
and mobile bottom navigation. Shared SVG icons remain in `components/ui/icon.tsx`.

Dashboard components and sample athlete data live in `features/dashboard/`.
Profile reuses the dashboard's personal-record and lift-history components.
Sample ranking data stays in `features/leaderboard/data/demo.ts`.

## Design

Based on the Home, Log Lift, Profile, and Leaderboard screens in the
Kheun Lift Redesign Stitch project (`12812117071399498758`). Navy surfaces,
muted gold accents, compact cards, monospaced metrics, and bottom navigation
follow the mobile reference, with a wider layout for desktop.

Colors and font stacks are defined in `app/globals.css`, using Tailwind utilities.
The font stacks use Plus Jakarta Sans and JetBrains Mono when installed, with
Segoe UI / sans-serif and Consolas / monospace fallbacks. No external font request
or new dependency is required.

## Preview limitations

All athlete data and ranking entries are samples. Sign-in, registration, profile
editing, lift saving, and Social are not connected. No sample verified status
represents a real verification. Route groups organize appearance and do not protect
routes. Connect the backend and enforce session protection before displaying any
private athlete data. The Vite frontend and both backends are unchanged.

## Checks

- `npm run lint`
- `npx --no-install tsc --noEmit --incremental false`

Do not run a production build without explicit approval (see `AGENTS.md`).
