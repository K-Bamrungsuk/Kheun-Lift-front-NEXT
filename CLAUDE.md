@AGENTS.md

# Kheun Lift Next.js frontend

Powerlifting leaderboard app. Users log Squat / Bench / Deadlift lifts with a
video link. Lifts are ranked by exercise and weight class, and only `verified`
lifts appear on the leaderboard.

This repo is the **new frontend that will be deployed** (Next.js 16, React 19,
TS, Tailwind 4). It is wired to the Go API; no demo data is left. `AGENTS.md` (imported above) is
written by `next dev` and holds only the Next.js notes; read it before writing
Next code, this version has breaking changes.

Sibling folders under `../` (each its own git repo):

| Folder | Role |
|---|---|
| `../kheun-lift-backend-go` | New backend, will be deployed (Go, Gin, pgx, goose) |
| `../kheun-lift-backend` | Old bootcamp backend (Express, Prisma), **reference only** |
| `../Kheun-Lift-frontend` | Old bootcamp frontend (React, Vite, zustand), **reference only** |

- The main plan is `../kheun-lift-backend-go/PLAN.md` (decisions,
  architecture, backend tasks by Phase 1 to 7). `PLAN.md` here holds frontend
  tasks with the same Phase numbers. Tick tasks as they are done.
- Do not edit the two old repos unless the user asks. Use them to see how
  features worked before.

## Rules

### 1. Require approval before making changes
Before modifying code or adding anything to the project, show the user
the proposed changes, affected files, and reasons.
Wait for explicit approval before creating, editing, deleting, or
renaming files. If the scope changes, request approval again.

Read-only inspection is allowed before approval.

### 2. Require approval for database changes
Never modify database schemas or data without explicit approval.
This includes running migrations, seed scripts, and any commands
that write to the database.

Explain the intended operation and its impact before requesting approval.
Approval for code changes does not imply approval for database changes.

### 3. Tests only for risky logic, with approval
Create test files only when the user approves them as part of the change.
Keep tests small and focused on risky logic: auth, passwords, OTP,
weight class lookup, leaderboard ranking. No tests for simple code.

### 4. Review with Ponytail before making changes
Always use the Ponytail plugin's applicable skills to review relevant
code before proposing changes.

Identify unnecessary code, duplication, and over-engineering.
Propose the smallest change that preserves existing logic and behavior.
Include any proposed cleanup in the approval request; do not remove
code without approval.

If Ponytail is unavailable, inform the user before proceeding.

### 5. Do not run builds automatically
Do not run build commands unless the user explicitly requests a build.
This includes builds for validation, reviews, or completing a task.

### 6. Git is the user's job
Never commit, stage, push or move files with git unless the user asks in
that message. When work is ready, suggest a short commit message and list
its files. If the work should be split, give one message and file list
per commit, in order. The user commits.

### 7. Code style
The goal is code a new developer can read quickly. Keep each change small.

- **Comments.** Write a comment only for a "why" the code cannot show, in one
  line. Do not describe what the code does. Ask before adding a new comment.
  Keep: `// Go answers 415 without this header on a JSON body`.
  Cut: `// The /lifts/[id] page and its intercepted modal both use this component.`
- **try/catch.** Catch an error only where you handle it: show a message to
  the user, redirect, or call `notFound()`. Do not wrap code that cannot throw,
  and do not catch only to rethrow.
- **Error handling.** Handle only the statuses you can act on, such as 401 to
  `/login` and `isNotFound(error)` to a 404 page. Rethrow the rest so
  `app/error.tsx` shows them. Do not add a branch for each status.
- **Types.** No `any`. Type data from outside as `unknown` and narrow it.
  Avoid `as`. API types come from zod schemas in `features/*/types.ts`
  (`z.infer`); every fetch passes its schema.
- **Nesting.** Use early returns instead of nested `if`. When JSX nests more
  than about 5 levels, or one component holds several jobs, split out a
  component. Example: `lift-detail.tsx` keeps `CaptionForm`, `LiftMenu` and
  `DeleteLiftDialog` out of its own body.

## How the apps fit together

- Next runs on port `3002`; the Go API runs on `3001` (port 3000 is taken on
  this machine).
- Auth uses an httpOnly cookie, `kheun_session` (SameSite=Lax). There is no JWT.
- Next calls Go directly, cross-origin, at `NEXT_PUBLIC_API_URL` (no `rewrites`).
  Prod: Next on `app.<domain>`, Go on `api.<domain>` (same site).
- Go allows only one origin, `APP_ORIGIN` (e.g. `http://localhost:3002`);
  any other origin gets 403 on POST/PATCH/DELETE.
- Browser calls use `credentials: "include"`. Server Components forward the
  cookie from `cookies()` as a `Cookie` header. In production, Go sets the cookie
  `Domain` to `.<domain>` so `app.<domain>` also gets it.
- Go endpoints match the old Express API: `/auth`, `/users`, `/exercises`,
  `/lifts`, `/leaderboards`, `/weight-classes`. Every success answer is
  `{message, data}`; `request` returns the parsed `data`.
- No endpoint exists yet to verify or reject lifts.
- `PATCH /lifts/:id` edits a caption and `DELETE /lifts/:id` deletes a lift.
  The lift detail modal calls both.
