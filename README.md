# Kheun Lift

Run `npm install` and `npm run dev`, then open http://localhost:3000.
The home route `/` shows the public landing page. The dashboard preview is at `/dashboard`.
`/login`, `/register`, `/leaderboard`, and `/profile` are navigable placeholders.

## File structure

```text
app/
  layout.tsx                   # Root metadata and global styles
  globals.css                  # Shared theme, focus styles, safe-area spacing
  page.tsx                     # Public landing route
  icon.svg                     # Kheun Lift browser icon
  not-found.tsx                # Branded 404 page
  (auth)/
    layout.tsx                 # Shared account-page appearance
    login/page.tsx             # Login placeholder
    register/page.tsx          # Registration placeholder
  (dashboard)/
    layout.tsx                 # Shared workspace shell
    dashboard/page.tsx         # Route entry and metadata
    leaderboard/page.tsx       # Rankings placeholder
    profile/page.tsx           # Athlete profile placeholder
components/
  layout/app-shell.tsx         # Desktop header and floating mobile navigation
  layout/app-navigation.tsx    # Shared menu data and active route highlighting
  ui/icon.tsx                  # Shared SVG icons
features/
  public/
    components/public-landing.tsx
  dashboard/
    components/dashboard-overview.tsx
    data/demo.ts               # Explicit sample data, no API calls
  leaderboard/
    data/demo.ts               # Sample ranking data shared by Public and Dashboard
public/                        # Static assets
```

Keep route files small. Shared UI belongs in `components`; components and data
used by one feature belong together in `features/<feature>`. Shared domain data
stays with its owning feature. When implementing account forms, put them in
`features/auth/`; profile content belongs in `features/profile/`. The placeholder
content stays directly in route files until those features are implemented.
Add API clients, validation, and state only when a feature needs them.

The landing page follows the original Vite Public page, with a hero, sample
leaderboard, and How it works section. Account links open placeholder pages;
login and registration do not submit or save anything. Session redirects are not
connected yet. Route groups organize appearance and do not protect routes.

The dashboard is a public UI preview with sample records, activity, leaderboard,
and athlete profile. Navigation links open the prepared routes. It does not read or
save account data. Connect the backend and add session protection before showing
private athlete data. The existing Vite frontend and both backends are unchanged.

The visual reference is the original Vite frontend's Home page: black and yellow,
rounded cards, a desktop header and a floating mobile navigation bar. At the
768px breakpoint, the single column becomes a 320px profile column beside the
leaderboard. Add Lift and Social stay disabled in this preview.

## Checks

- `npm run lint`
