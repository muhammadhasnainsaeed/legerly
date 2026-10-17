# Ledgerly agent manifest

## Product boundary

Ledgerly is a **frontend-only financial dashboard prototype**. It uses fictional
accounts and local browser state only. Do not add a real authentication service,
bank-linking provider, payment processor, analytics tracker, secrets, or real
financial data without an explicit product decision.

The source of truth for the intended experience is the Ledgerly Figma file:

- [Desktop dashboard](https://www.figma.com/design/a0cXdby4eoZKJVfsXzCVrJ?node-id=2-2)
- [Sign in](https://www.figma.com/design/a0cXdby4eoZKJVfsXzCVrJ?node-id=11-128)
- [Create account](https://www.figma.com/design/a0cXdby4eoZKJVfsXzCVrJ?node-id=11-191)
- [Bank connection flow](https://www.figma.com/design/a0cXdby4eoZKJVfsXzCVrJ?node-id=15-128)
- [Transfer review](https://www.figma.com/design/a0cXdby4eoZKJVfsXzCVrJ?node-id=15-132)

Use existing shadcn/ui-style components from `components/ui` for all interface
work. Do not introduce a second visual component library.

## Stack and commands

Next.js 15 App Router, React 19, TypeScript (strict), Tailwind 3, Radix primitives
styled as shadcn/ui. Package manager is **pnpm** (`pnpm-lock.yaml`); do not switch
to npm/yarn or regenerate the lockfile with another tool.

```bash
pnpm install
pnpm dev                      # http://localhost:3000
pnpm build                    # required verification before any handoff
pnpm exec tsc --noEmit        # required verification; currently passes clean
```

- There is **no test runner and no test script**. Do not claim tests pass; verify
  with `pnpm build` plus `pnpm exec tsc --noEmit`.
- **Do not rely on `pnpm lint`.** It maps to the deprecated `next lint`, there is
  no ESLint config in the repo, and it stops on an interactive setup prompt.
- There is no CI and no `.env`; the app needs no secrets to run.

## Architecture map

- `app/(auth)/*` and `app/(dashboard)/*` route files are thin one-liners that
  render a feature component. Real UI and state live in
  `components/<feature>/<name>-page.tsx`.
- Everything under `components/` is a client component (`"use client"`), including
  most `components/ui` primitives; interactivity relies on browser state, not
  server actions or route handlers.
- `components/layout/app-shell.tsx` (used by `app/(dashboard)/layout.tsx`) wraps
  every dashboard route with the sidebar and top nav. `app/(auth)` has its own
  layout. Add a new screen by adding a route file plus a feature component, not by
  editing `AppShell`.
- Path alias `@/*` maps to the **repo root**, e.g. `@/components/ui/button`,
  `@/lib/utils`.
- Demo data is centralized in `lib/mock-data.ts` (accounts, transactions, bills,
  `demoBanks`); money/date formatting helpers live in `lib/formatters.ts`;
  `cn()` is in `lib/utils.ts`. Keep new fake data here, not inline in components.
- `components/ui` is a **vendored** shadcn set with no `components.json`, so
  `npx shadcn add ...` will not work. Copy or hand-edit an existing primitive.

## Demo auth and local state (easy to misread)

- There is **no route protection or middleware**. Sign-in/sign-up only set
  `localStorage` and navigate; every dashboard route is reachable directly.
- Persisted keys: `ledgerly-demo` (set by auth, cleared on Exit demo) and
  `ledgerly-connected-bank` (set by the onboarding bank flow, read by the accounts
  page, cleared by Settings reset). `ledgerly-demo` is written but never read —
  do not assume a guarded flow exists.
- Transfers, bill payments, and preference changes are UI-only; nothing persists
  beyond the above keys.

## Roles and decision rights

| Role | Owner | May do | Must not do |
| --- | --- | --- | --- |
| Design and flow governor | Codex | Compare the running UI with Figma, set the visual direction and acceptance criteria, and make product-scope decisions. | Change behaviour outside an explicitly approved UI task, or push code. |
| Builder | OpenCode — build session | Implement accepted frontend changes one issue at a time; preserve existing behaviour. | Change scope, stage another agent's unfinished work, commit/push, or mark its own work accepted. |
| QA auditor | OpenCode — separate QA session | Reproduce bugs, test the browser flow, check responsive behaviour, keyboard access, build output, and Figma fidelity; write evidence-rich findings. | Edit the implementation it is auditing, approve its own build-session work, or push code. |
| Integrator and reviewer | GitHub Copilot | Review the OpenCode diff, request corrections, run the required checks, create atomic commits, and push the reviewed branch. | Add unrelated features, overwrite unstaged work, waive a failing check, or merge a branch without the required QA evidence. |

No role self-approves its own work. Codex decides visual scope, OpenCode builds,
a separate OpenCode QA session verifies, and Copilot independently integrates,
tests, commits, and pushes the accepted change.

## One shared language

Use GitHub Issues as the canonical shared work queue (remote:
`muhammadhasnainsaeed/legerly`). One issue represents one user-visible outcome.
Each issue, PR, and QA report must include the same identifier, e.g. `LED-24`.

When GitHub is unavailable, create `docs/agent-handoffs/LED-24.md` using this
format exactly:

```md
# LED-24 — Short outcome

## State
`proposed | ready | in-progress | ready-for-qa | blocked | accepted`

## Owner
`governor | qa | copilot`

## Figma target
- Node URL:
- Route or component:

## Expected result
- What should a person see and be able to do?

## Evidence
- Current behaviour:
- Steps to reproduce:
- Screenshot, recording, or build log:

## Acceptance criteria
- [ ] Visual hierarchy and key states match the Figma target at desktop and mobile sizes.
- [ ] Keyboard focus, labels, errors, and dialogs remain usable.
- [ ] `pnpm build` passes.
- [ ] No real financial data, credentials, or network integration was introduced.

## Decision and handoff
- Governor decision:
- QA retest result:
- PR / commit:
```

Never put account credentials, API keys, tokens, personal data, or screenshots of
real financial information into an issue, handoff, commit, or PR.

## Workflow

1. **Governor defines the outcome.** Reference the exact Figma node, route, scope,
   non-goals, and acceptance criteria. Mark the work `ready`.
2. **QA establishes the baseline.** Open a finding only with reproducible steps and
   an expected-versus-actual description. Severity: `P0` blocks build/security,
   `P1` breaks a core flow, `P2` noticeable UI or accessibility defect, `P3` polish.
3. **OpenCode build session implements one outcome per branch**, e.g.
   `fix/LED-24-transfer-review`. Keep mock data local, preserve the frontend-only
   boundary, and do not stage or overwrite another agent's in-progress files.
4. **OpenCode QA uses a separate session.** Re-test the changed route and its
   regression-prone paths at desktop and mobile widths. Attach exact reproduction
   steps, screenshots, and the `pnpm build` result.
5. **Copilot reviews and integrates.** Review the diff against the issue and Figma
   target, run the required validation, resolve only approved review comments, and
   commit/push. Copilot is the only role that commits and pushes in this workflow.
6. **Governor closes the loop.** Accept only if the user flow, visual intent, and
   project boundary remain intact; record a short decision if the implementation
   deliberately differs from Figma.

## Atomic commit and push rules for Copilot

Conventional Commit prefixes, e.g. `feat(ui): add bank connection selection flow`,
`fix(transfer): keep review details after validation error`,
`fix(a11y): label account connection dialog`, `docs(agents): add QA handoff protocol`.

- One commit = one independently reviewable outcome. Do not mix visual polish,
  behaviour change, generated files, and docs in one commit.
- Inspect both staged and unstaged changes first; never stage or overwrite another
  agent's in-progress files.
- Never commit `.next/`, `tsconfig.tsbuildinfo`, `.env` files, tokens, or user data.
- Do not force-push shared branches; never push directly to `main`.

## Ledgerly definition of done

A UI change is ready only when all of the following are true:

- It uses the existing shadcn/ui primitives and the Ledgerly violet tokens
  (`app/globals.css` CSS variables; `primary` is the violet accent).
- Its desktop view follows the target Figma layout, hierarchy, empty/loading
  states, and key success/error states.
- It remains usable at 320px, 768px, and desktop width.
- Labels, focus rings, error messages, icon-only controls, and dialogs work with a
  keyboard and screen reader.
- `pnpm build` and `pnpm exec tsc --noEmit` pass locally.
- It does not claim a real bank connection, money movement, or authentication.
- QA evidence, Copilot review result, and governor acceptance are linked from the
  issue or handoff file.

## Current priority sequence

1. Apply the Ledgerly violet token system consistently across every existing
   screen without removing a control or changing a user flow.
2. Check sign-in, create account, overview, accounts, activity, transfers, bills,
   insights, settings, and the bank-connection journey against Figma.
3. OpenCode builds the approved UI or functional follow-up; a separate OpenCode
   session performs QA while preserving the builder's evidence.
4. Copilot reviews, runs checks, creates atomic commits, and pushes only the
   accepted work.
