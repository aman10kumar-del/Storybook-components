# Sources to reference for UI generation (project ground truth)

**This file is the primary ordered inventory** for coding agents: *what to read, in what order, and which source wins when two docs could disagree.*  

**Other hubs are indexes only:** [`AGENTS.md`](../../AGENTS.md) (repo root), [`docs/README.md`](../README.md), [`.cursor/README.md`](../../.cursor/README.md) — they point here for the **full path list** and **canonical rules**, not duplicate depth.

**Shared vocabulary:** [`docs/agents/glossary.md`](glossary.md) — e.g. `LP-*`, inset owner, §9 shell, Hi PODS **MODE**s.

Use this list when you want generated UI to **match this repo’s PODS / Paytm conventions** (tokens, components, layout patterns, Storybook structure)—not generic web defaults.

**How to use it in Cursor:** `@`-mention the files you need, or rely on **`.cursor/design.mdc`** (always applied) plus **`.cursor/tokens.mdc`** when editing paths it scopes to.

**PODS components:** do not override **`pods-components`** internals from pattern SCSS (`:global` / deep selectors on `data-testid`, inner labels, etc.). Use **props** and **outer layout wrappers** only; new visuals belong in the **library** — see **`.cursor/design.mdc` §8 Don’t**.

---

## Reading order (follow this sequence for a new screen)

1. **`docs/layout-references/layouts.md`** — matching **screen** section, if any (**structure + intent** win here vs catalog).  
2. **`docs/layout-references/layout-pattern-catalog.md`** — pick **`LP-*`** only if step 1 has no match, or as a **PR tag** alongside `layouts.md`.  
3. **`.cursor/design.mdc`** — composition, gutters, headers, sheets (see its **“For implementation tasks”** block at top).  
4. **`.cursor/tokens.mdc`** — gap/radius/type **ladder** (numbers).  
5. **`paytm-common-storybook/configs/design-tokens.json`** + **generated** CSS/Sass + **existing stories** under `stories-common/` — concrete implementation.  
6. **Handoff (if applicable):** **`docs/design-system/component-customizations.json`** (machine) + **`docs/design-system/design-system-changelog.md`** (human) — see **Canonical handoff** below.

---

## Canonical handoff (JSON vs changelog vs Storybook)

| Source | Role | Wins when |
|--------|------|-----------|
| **`component-customizations.json`** | Structured fields (props, typography ids, file paths) for tooling and strict alignment | **Machine-parseable spec** for listed `entries[]` |
| **`design-system-changelog.md`** | Dated narrative, consumer actions, shipping notes | **Human context**; must **not contradict** the JSON for the same `id` |
| **Storybook** (`parameters.docs`, stories) | What reviewers **see**; Figma links and intent | **Visual/runtime truth** for shipped components; if story and JSON disagree, **fix the drift** — don’t guess |

**Rule:** For a given change, prefer **one JSON `id`** + **one changelog row** + **updated stories** together. If only one exists, treat **Storybook + `design.mdc`** as the fallback for behaviour.

---

## 1. Rules and agent hub (highest priority)

| File | Why it matters |
|------|----------------|
| [`AGENTS.md`](../../AGENTS.md) | Repo-root index only; **numbered reading order and canonical rules are in this file** (§ Reading order + § Canonical handoff). |
| [`.cursor/design.mdc`](../../.cursor/design.mdc) | Composition, Storybook paths, layout/sheet behaviour, do’s/don’ts. |
| [`.cursor/tokens.mdc`](../../.cursor/tokens.mdc) | Number semantics, gaps, radius, type scale, `SectionHeader` sizing. |
| [`.cursor/README.md`](../../.cursor/README.md) | How the two rule files relate and when each applies. |

---

## 2. Layout and screen structure (Figma-aligned + reusable shells)

| File | Why it matters |
|------|----------------|
| [`docs/layout-references/layouts.md`](../layout-references/layouts.md) | Figma-backed **screen inventory** — **canonical** for flows listed here. |
| [`docs/layout-references/layout-pattern-catalog.md`](../layout-references/layout-pattern-catalog.md) | **`LP-01`–`LP-50`** when `layouts.md` has **no** match; shorthand tags. |

---

## 3. Design tokens and generated styling

| File / folder | Why it matters |
|---------------|----------------|
| [`paytm-common-storybook/configs/design-tokens.json`](../../paytm-common-storybook/configs/design-tokens.json) | **Canonical token JSON** (colour, type, spacing, radius). |
| [`paytm-common-storybook/src/commonStyles/sass-generated/variables.css`](../../paytm-common-storybook/src/commonStyles/sass-generated/variables.css) | Semantic CSS variables (light/dark). |
| [`paytm-common-storybook/src/commonStyles/sass-generated/index.css`](../../paytm-common-storybook/src/commonStyles/sass-generated/index.css) | Global base after the pipeline. |
| [`paytm-common-storybook/src/commonStyles/_mixin.scss`](../../paytm-common-storybook/src/commonStyles/_mixin.scss) (and `_variables.scss`, `style-dictionary/*`) | SCSS mixins and token-backed partials used across components and stories. |

---

## 4. Design-system handoff (components + changelog)

| File | Why it matters |
|------|----------------|
| [`docs/design-system/component-customizations.json`](../design-system/component-customizations.json) | Structured deltas — **primary** for listed entry ids. |
| [`docs/design-system/design-system-changelog.md`](../design-system/design-system-changelog.md) | Narrative + consumer actions — **pairs** with JSON; same facts. |

---

## 5. Project orientation and workflows

| File | Why it matters |
|------|----------------|
| [`docs/agents/ai-agent-project-brief.md`](ai-agent-project-brief.md) | What the repo is, where PODS lives, how Storybook is wired. |
| [`docs/README.md`](../README.md) | Index of `docs/` areas (**detail list → this file**). |
| [`prompts/hi-pods.md`](../../prompts/hi-pods.md) | **Hi PODS** — set **MODE** **A**–**E**; follow **one** mode per task unless the user asks otherwise. **MODE C** and **MODE D** may use **`SPEC_SOURCE: figma`** or **`SPEC_SOURCE: prd`** (see that file’s Inputs block and **Shared: PRD**). |

---

## 6. Live code reference (not single docs—browse when implementing)

| Path | Why it matters |
|------|----------------|
| `paytm-common-storybook/src/pods-components/` | **Real components**—copy import paths, props, and patterns from here. |
| `paytm-common-storybook/src/stories-common/` | **Product-style screens** in Storybook—templates for new flows. |
| [`.cursor/design.mdc`](../../.cursor/design.mdc) §9 | **Device frame + page gutter + overlay attachment** — use for full-width Storybook previews. |
| `paytm-common-storybook/src/pods-components/index.ts` | Public export surface for the library. |
| Root [`.storybook/`](../../.storybook/) | Root Storybook 10 config and story globs into `paytm-common-storybook`. |

---

## Fidelity checklist (for new stories / patterns)

When adding or changing **MODE C** work in Storybook:

- **Source:** **Figma** — link or `fileKey` + `node-id` in docs (`getFigmaLinkHTML` pattern from `stories-common/utils` when applicable). **PRD** — pointer to pasted spec, attachment, or `PRD_FILE`; use **“N/A — PRD spec”** for Figma when there is no frame.  
- **Intent:** one line — what the user is doing on this screen.  
- **Honest diff:** bullet what **matches** the spec (Figma and/or PRD) vs what is **intentionally generic** for reuse or **unclear in the PRD**.

---

## Note on “training data”

Large models are **not** trained on your private repo. **Referencing these files in the session** (or enforcing them via Cursor rules) is what keeps output aligned with **this project’s** ground truth—not with generic training corpora.
