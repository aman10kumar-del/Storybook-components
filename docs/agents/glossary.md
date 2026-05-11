# Glossary — PODS AI WGMI (agents + humans)

Short definitions **used across** `docs/`, `.cursor/*.mdc`, and `prompts/hi-pods.md`. Keeps vocabulary stable so LLMs and reviewers mean the same thing.

| Term | Meaning |
|------|---------|
| **PODS** | Paytm’s H5 UI kit in this repo: components + tokens under `paytm-common-storybook/`, consumed as `@paytm-h5-common/paytm_common_ui`. |
| **Hi PODS** | [`prompts/hi-pods.md`](../../prompts/hi-pods.md) — one workflow file; set **MODE A–E** for ASCII, `layouts.md`, Storybook code, Vite app, or git. **MODE C** / **MODE D** use **`SPEC_SOURCE: figma`** or **`SPEC_SOURCE: prd`**. |
| **MODE** | Letter **A–E** in Hi PODS; follow **only** that mode’s section unless the user asks for multiple steps explicitly. |
| **`layouts.md`** | `docs/layout-references/layouts.md` — Figma-backed **screen inventory**; **wins** over **`LP-*`** when both describe the same flow. |
| **`LP-*` / pattern catalog** | `docs/layout-references/layout-pattern-catalog.md` — **50 reusable shells**; use when no `layouts.md` match, or as a **tag** next to a `layouts.md` flow. |
| **`design.mdc`** | `.cursor/design.mdc` — **composition** rules (insets, rhythm, Storybook IDs, BottomSheet attach, cards/lists). |
| **`tokens.mdc`** | `.cursor/tokens.mdc` — **numeric ladder** (gaps, radii, type steps); not composition law. |
| **`design-tokens.json`** | `paytm-common-storybook/configs/design-tokens.json` — **canonical** token definitions; generated Sass/CSS must follow it. |
| **Inset owner** | The **one** layer that owns horizontal (or vertical) spacing at a boundary — page shell, Card, BottomSheet, etc. See **`.cursor/design.mdc` §8–§9**. |
| **Page gutter** | Side margins of the scroll column (often **12px** / `$margin-horizontal-m`); see **§9** device shell. |
| **§9 shell** | **`.cursor/design.mdc` §9** — mobile preview frame, gutter, portal host for sheets inside the frame. |
| **Semantic-only ASCII** | Diagrams in `layouts.md` use **region labels**, not literal px/hex from Figma. |
| **`component-customizations.json`** | Machine-readable handoff entries; pairs with **changelog** for the same change **id**. |
| **Storybook title** | Path-like id e.g. `PODS Components/Button` — see **`.cursor/design.mdc`** for naming buckets. |
