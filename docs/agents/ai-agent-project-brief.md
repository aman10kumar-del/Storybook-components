# Project brief for AI agents — PODS AI WGMI

**Quick link index (repo root):** [`AGENTS.md`](../../AGENTS.md).

**What to read first for UI implementation (ordered list + canonical handoff):** [`ui-generation-sources.md`](ui-generation-sources.md). **Shared terms:** [`glossary.md`](glossary.md).

This document orients coding agents and assistants working in this repository. It explains **what the workspace is**, **where the real UI system lives**, and **which files to treat as source of truth** for Paytm PODS (design tokens, components, and Storybook).

---

## 1. What this workspace is

**Display name:** `pods-ai-wgmi` (root `package.json`).

This is a **local development and experimentation workspace** built around Paytm’s **PODS** mobile UI kit, published as **`@paytm-h5-common/paytm_common_ui`**. The repo combines:

1. A **small Vite + React** shell app at the repository root (placeholder UI: “PODS AI WGMI”).
2. A **vendored or mirrored copy** of the Paytm common UI library under **`paytm-common-storybook/`**, which is the **canonical source tree** for PODS components, design tokens, generated CSS, and the library’s own Storybook configuration.
3. A **root-level Storybook 10** setup (Vite-based) that **imports stories from** `paytm-common-storybook/src` so you can browse and extend PODS stories without only relying on the library’s older internal Storybook toolchain.

**PODS** in this context means Paytm’s **component and token system** for H5 (web) experiences: colours, typography, spacing, radius, and a large set of React components (buttons, sheets, headers, lists, etc.).

---

## 2. Repository layout (high level)

| Area | Role |
|------|------|
| Root `src/` | Minimal React app entry (`App.tsx`, `main.tsx`). Not the design system. |
| Root `.storybook/` | Storybook 10 + Vite; story globs include `paytm-common-storybook` paths. |
| `paytm-common-storybook/` | **Main library source**: `src/pods-components/`, `src/stories-common/`, `configs/design-tokens.json`, Style Dictionary + Sass pipeline, Rollup build, library `package.json` as `@paytm-h5-common/paytm_common_ui`. |
| `.cursor/design.mdc` | **Agent-oriented rules**: token usage, Storybook story IDs, layout and BottomSheet patterns, do’s/don’ts. Agents should treat this as the operational guide when changing UI. |

---

## 3. Packages and dependencies

### Root workspace (`pods-ai-wgmi`)

- **Runtime:** React 19, Vite 6, TypeScript.
- **Consumes** `@paytm-h5-common/paytm_common_ui` from npm (see root `package.json`) for experiments that use the **published** package.
- **Storybook:** 10.x with addons (docs, a11y, Vitest browser tests, MCP, etc.).

### Library (`paytm-common-storybook/package.json`)

- **Name:** `@paytm-h5-common/paytm_common_ui` (version in that file is authoritative for this tree).
- **Build:** Rollup, TypeScript; **tokens** flow through **Style Dictionary** → generated Sass/CSS.
- **Peers:** `react`, `react-dom` (broad compatibility in the published package).
- **Publishing:** Configured for Paytm Nexus registries (see `publishConfig`); contributors typically use internal `.npmrc` as described in `paytm-common-storybook/README.md`.

When you **edit components or tokens** in this repo, you are almost always editing **`paytm-common-storybook/`**, not the tiny root `src/` app.

---

## 4. Design tokens and styling

**Canonical JSON:** `paytm-common-storybook/configs/design-tokens.json`

Contains (among other things):

- **`color-primitives`** and **`color-semantics`** — feed semantic CSS variables (e.g. `--text-neutral-strong`, `--surface-level-1`).
- **`typography.scale`** and **`typography.weight`** — type ramp used in Storybook and SCSS.
- **`number-primitives`** and **`number-semantics`** — spacing, gap, padding, margin, radius (SCSS variables and docs reference these).

**Generated runtime CSS** (after the token pipeline / Sass build):

- `paytm-common-storybook/src/commonStyles/sass-generated/variables.css` — semantic variables, light/dark via `prefers-color-scheme`.
- `paytm-common-storybook/src/commonStyles/sass-generated/index.css` — global base styles.

**Agent rule of thumb:** Prefer **semantic CSS variables** and **number-semantics** over raw hex or arbitrary pixels. Extend tokens in JSON and regenerate rather than hardcoding in product code. Full tables and patterns live in **`.cursor/design.mdc`**.

---

## 5. Components and Storybook

### Where components live

- Implementation: `paytm-common-storybook/src/pods-components/**`
- Foundation reference stories (colours, typography, icons, number system): `paytm-common-storybook/src/stories-common/**`
- Public exports: `paytm-common-storybook/src/pods-components/index.ts` (and package `exports` in library `package.json`).

### Story conventions

- Active stories use CSF under `pods-components` and `stories-common`.
- Stable story “paths” for docs and deep links look like **`PODS Components/Button`**, **`PODS Typography/Typography`**, etc. A full inventory is listed in **`.cursor/design.mdc`** (sections 5–7).

### Two Storybook entry points

1. **Root:** `npm run storybook` — Storybook **10**, Vite, includes stories from `paytm-common-storybook` per `.storybook/main.ts`.
2. **Library-only:** `npm run storybook:paytm` — runs the script inside `paytm-common-storybook` (Webpack-based Storybook **7** in that package’s devDependencies, port **6006** per its scripts).

Agents should know **which** Storybook the user is running; behaviour and addons can differ slightly between 10 (root) and 7 (nested).

---

## 6. How to run common tasks

From the **repository root**:

| Task | Command |
|------|---------|
| Vite dev server | `npm run dev` |
| Root Storybook (PODS stories included) | `npm run storybook` (default port **6010** in root scripts — confirm in `package.json` if it changes) |
| Nested library Storybook | `npm run storybook:paytm` |

From **`paytm-common-storybook/`** (library maintenance):

- Token → CSS generation, icon list, Sass watch, Rollup build, Jest, and Storybook test-runner are defined in that folder’s `package.json` (`setup:dev`, `setup:prod`, `storybook`, `test-storybook`, etc.).

---

## 7. Testing and quality

- Root Storybook can integrate **Vitest** browser tests (see devDependencies and `.storybook` addons).
- The library package uses **Jest** + **React Testing Library** for unit tests under `pods-components`, and **Storybook test-runner** with **light/dark** themes (`PODS_THEME` env) for visual/regression-style runs.

---

## 8. Product and layout conventions (agents)

`.cursor/design.mdc` is lengthy on purpose. The most important recurring themes:

- **Token-first UI:** semantic colours, typography scale, number system — no one-off literals when a token exists.
- **Mobile framing:** sections on **mobile preview shell**, **BottomSheet** portal attachment (`attachToElementID`), and **avoiding double horizontal padding** between shell gutters and component roots (`data-testid` table).
- **Composition:** Header vs SectionHeader vs Card vs List; spacing between sections (`gap.4xl`); last list row without a divider; Card radius and padding rules.

When implementing screens or stories, **read the relevant section in `design.mdc`** before inventing layout or colour values.

---

## 9. Related documentation

- **`docs/README.md`** — index of all top-level documentation in this repo.
- **`docs/design-system/design-system-changelog.md`** — cross-flow component and token changes; **`docs/design-system/component-customizations.json`** — structured handoff entries.
- **`docs/layout-references/`** — screen layouts (`layouts.md`) and pattern catalog (`layout-pattern-catalog.md`).
- **`paytm-common-storybook/README.md`** — contributor workflow (JIRA, branch from staging, reviewers), install via Paytm registry, import example.
- **`.cursor/design.mdc`** — single best reference for **agent prompts** tied to this codebase (tokens, Storybook titles, responsive shell, BottomSheet).

---

## 10. Summary for quick model context

> This repo is **PODS AI WGMI**: a React/Vite workspace used to work with Paytm’s **PODS** design system. The **real source** is **`paytm-common-storybook/`** (`@paytm-h5-common/paytm_common_ui`): tokens in **`configs/design-tokens.json`**, components in **`src/pods-components`**, global CSS generated under **`src/commonStyles/sass-generated`**. Root **`npm run storybook`** loads those stories via Storybook 10. Agent behaviour for tokens and layout should follow **`.cursor/design.mdc`**.

When in doubt: **change the library tree, reference tokens from JSON/generated CSS, and validate in Storybook (light and dark).**
