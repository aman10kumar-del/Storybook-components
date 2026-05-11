# Hi PODS — workflows from Figma or PRD (single entry)

**In Cursor:** type **`@`** and pick **`hi-pods.md`** (under `prompts/`) — the “Hi PODS” workflow.

**Use this one file.** Pick **one mode** below, paste the **inputs block**. The agent must **follow only that mode’s section** — do **not** run another mode’s steps (no sneaky B while doing C, no E unless **MODE E**). If the user needs multiple modes, they should **change MODE** in a new message or say so explicitly.

**Modes C and D** accept either **Figma** (`SPEC_SOURCE: figma`) or a **PRD** (`SPEC_SOURCE: prd`) as the primary spec. PRD may be pasted text, a file in the repo, or an attachment in chat (PDF/Word: extract text **best-effort**; **plain text / Markdown preferred**).

**Ground truth for composition, tokens, and reading order:** [`docs/agents/ui-generation-sources.md`](../docs/agents/ui-generation-sources.md).

| Mode | You want… |
|------|-----------|
| **A** | A **quick ASCII sketch in chat** (no repo edits, no code). |
| **B** | **`docs/layout-references/layouts.md`** updated from Figma (semantic inventory, no pixel gospel). |
| **C** | **Real code** in **`paytm-common-storybook`** (component/pattern + Storybook + tests + barrel when reusable). Spec: **Figma or PRD** (`SPEC_SOURCE`). |
| **D** | **Real code** in the **root Vite app** (`src/<feature>/`), composing PODS from npm alias. Spec: **Figma or PRD** (`SPEC_SOURCE`). |
| **E** | **Git finish:** review, commit, push (no Figma). |

**Project anchor:** [`AGENTS.md`](../AGENTS.md) → `.cursor/design.mdc`, `.cursor/tokens.mdc`, `paytm-common-storybook/`.

**Figma URLs:** `node-id=252-6644` in the URL → use `252:6644` in tools. Branch URLs: use branch file key as `fileKey` when applicable.

---

## Inputs (paste once)

```
MODE: (A | B | C | D | E)

# --- Figma / visual (A–D as needed) ---
FIGMA_URL:
(single URL with node-id — modes A, C, D when SPEC_SOURCE is figma; omit for screenshot-only A and for C/D when SPEC_SOURCE is prd)

FIGMA_URLS:
(one URL per line — mode B only; optional for multi-frame A if you list them in SCOPE)

SOURCE: (figma | screenshot | both)   # mode A only; attach image in client if screenshot

# --- Modes C, D: spec origin (required) ---
SPEC_SOURCE: (figma | prd)

# --- When SPEC_SOURCE is prd (modes C, D only) ---
PRD_SUMMARY:
(1–3 lines — product goal / user job)

PRD_BODY:
(paste Markdown or plain text; or write "see PRD_FILE / attachment" and put content there)

PRD_FILE:
(optional — repo-relative path to .md or .txt; omit if pasted in PRD_BODY or only attached in chat)

FLOWS_AND_SCREENS:
(bullet list — steps and screens this implementation must cover)

OUT_OF_SCOPE:
(optional — what not to build)

PRD_SCREENSHOTS:
(optional — attach images or list paths; use for layout when PIXEL_FIDELITY is yes)

# --- Mode B ---
OUTPUT_PATH: docs/layout-references/layouts.md

# --- Mode C ---
COMPONENT_NAME: (PascalCase)
SCOPE: (component | pattern)
PIXEL_FIDELITY: (yes | best-effort — default best-effort when SPEC_SOURCE is prd without PRD_SCREENSHOTS)

# --- Mode D ---
SCREEN_NAME: (PascalCase)
FEATURE_FOLDER: (e.g. my-feature — under src/)
ROUTE_OR_ENTRY: (e.g. hash #my-feature | path | "wire App.tsx only")
PIXEL_FIDELITY: (yes | best-effort — default best-effort when SPEC_SOURCE is prd without PRD_SCREENSHOTS)

# --- Mode E ---
COMMIT_HINT: (optional one line)
SKIP_IF_EMPTY: (yes | no — default yes: if clean tree, do not push)

# --- Any mode ---
SCOPE / NOTES:
(optional — flow name, mobile-only, a11y, variants, etc.)
```

---

## Shared: PRD (modes C and D)

When **`SPEC_SOURCE: prd`**:

1. **Gather spec** from **`PRD_BODY`**, **`PRD_FILE`** (read from repo), and/or **chat attachments** (PDF/DOCX: extract text best-effort; flag gaps as **`(inferred)`** or **`(unclear in PRD)`** in the reply).
2. **Scope** is **`FLOWS_AND_SCREENS`** + **`OUT_OF_SCOPE`**; do not invent major screens unless the PRD implies them — if ambiguous, implement the **minimum** clear path and list **assumptions** in the reply.
3. **Fidelity:** Default **`PIXEL_FIDELITY: best-effort`** for PRD-only. Treat **`PIXEL_FIDELITY: yes`** as valid only if **`FIGMA_URL`** and/or per-screen **`PRD_SCREENSHOTS`** are provided; otherwise set expectations in story/app docs and use **best-effort**.
4. **Traceability in docs:** Same structure as Figma-backed work, but **Source** = PRD: one line pointing to **`PRD_FILE`**, pasted excerpt, or “attached PRD”; **Figma** line = link/node ids **only if** `FIGMA_URL` present, else **“N/A — PRD spec”**.

When **`SPEC_SOURCE: figma`**, ignore PRD fields unless the user also pasted notes in **SCOPE / NOTES** — Figma remains the layout authority.

---

## Shared: Figma assets (modes C and D)

Applies when **`SPEC_SOURCE: figma`** (and optional screenshots with PRD). Figma/MCP exports are **slow** (server round-trips). **One pass into the repo**, then iterate on local files.

1. After design context (and optional screenshot), save rasters/SVGs under **`story-assets/`** (mode C) or **`src/<FEATURE>/assets/`** (mode D). Do **not** re-fetch the same ephemeral MCP URLs while coding.
2. **Batch** exports (one combined slice beats many layers). **@3x** when you need retina; avoid huge files.
3. **Screenshots** = layout check only; still export real logos/illustrations once.
4. **Root Storybook (Vite):** `vite-plugin-svgr` uses **`ReactComponent`** for **`paytm-common-storybook/**/*.svg`** only. For `<img src>` / URL props use **`import x from '...svg?url'`**.

---

## Mode A: Quick ASCII in chat

**Does not** edit the repo or **`layouts.md`**. **Does not** implement code.

1. If **FIGMA_URL** present: parse ids, `get_design_context` (or equivalent), **retry once** on recoverable failure; optional screenshot for hierarchy.
2. If **screenshot only**: infer regions; label guesses **`(inferred)`**.
3. If **both**: Figma for names/hierarchy; screenshot for overlaps/sticky areas.

**Reply only (unless user asks to save a file):**

1. One-line **purpose** (generic pattern language OK).
2. One **`ascii`** or **`text`** fenced block per screen (~22–46 char inner width; `+ - |`; **semantic labels only** — no px/hex/type sizes; sticky/scroll in **words** only).
3. Optional small table: region → PODS / Paytm component family or pattern phrase.
4. Short **gaps** bullet list if anything was unreadable.

Multiple frames → repeat per screen with a **heading** each.

---

## Mode B: Generate / update `layouts.md`

Output is **for AI and developers**: structure, flow, intent — **not** a frozen screenshot spec. **Cross-vertical:** write **Purpose** and structure in **generic pattern terms** where possible.

**Do not** put in the layouts file: hex/RGB, literal px, radii, font sizes, shadow strings, or “use `#…`” rules. Strip numbers from Figma before writing. ASCII boxes: **semantic labels only** (no `300px` in diagrams).

**Each screen** (each usable Figma frame): **Title**, **Figma** URL, **Purpose**, **Suggested Paytm composition** (component families from storybook), **Page structure** (relative layout only), **ASCII layout** (required, one block per screen), **Flow** to neighbors if multi-URL, **Diversity** (don’t make every block “title + card”).

**ASCII rules:** one fenced block per screen; `ascii` or `text`; ~22–46 chars wide; region names align with page structure; `~~~ sticky ~~~` / `(scroll)` in words.

**If Figma won’t load:** retry once; then **omit** that URL from the file (no placeholder sections). List skipped URLs in the reply; optional one-line **Pending Figma** at end of doc.

**Steps:** parse URLs → pull context → semantic mapping → write **OUTPUT_PATH** → reply with path, screen count, skipped URLs.

---

## Mode C: Implement in `paytm-common-storybook`

| Deliverable | Where |
|-------------|--------|
| Reusable UI | `src/pods-components/<Name>/` |
| Demo-only composition | `src/stories-common/…` |

**Default:** reusable pieces in **`pods-components`** (mirror `IconGrid`, `RecentRechargeCard`, …).

**Non-negotiables:** Reuse PODS primitives first. SCSS module + `../../commonStyles/mixin` (adjust depth). Tokens: `$padding-*`, `$gap-*`, `getColorVariable`, `getFontStyle` — not raw hex for covered semantics. **`React.memo`** on presentational default export; **`data-testid`** stable. **Story title** `PODS Components - New/<Name>` (or family per `.cursor` rules). **Docs:** **`parameters.docs.description.component`** — when **`SPEC_SOURCE: figma`**, include **`getFigmaLinkHTML`** from `stories-common/utils`; when **`SPEC_SOURCE: prd`**, no Figma link; PRD pointer + **Story docs (fidelity)** content only. Tests: colocated `*.test.tsx`. Barrel: **`pods-components/index.ts`** for reusable components.

**Story docs (fidelity):** In **`parameters.docs`** (or equivalent): **(1)** **Source** — Figma link or `fileKey` + node id when **`SPEC_SOURCE: figma`**; when **`SPEC_SOURCE: prd`**, PRD pointer (file path, title, or “attached”) and **“N/A — PRD spec”** for Figma if none; **(2)** **Intent** — one line: what the user is doing on this screen (from Figma or PRD); **(3)** **Match vs intentional diff** — short bullets: what **matches** the spec vs what is **deliberately generic** (reuse, token swap, missing asset, PRD ambiguity). If **`component-customizations.json`** / changelog mention this work, keep the **same facts** — no contradictions.

**Workflow (figma):** Parse URL → design context + screenshot + **assets to `story-assets/`** (shared Figma rules above) → **ASCII + mapping table** (region → PODS/tokens) → implement `tsx` / `module.scss` / `stories.tsx` / `test.tsx` → verify (`tsc` / targeted tests).

**Workflow (prd):** Read PRD (body, file, attachment) → **ASCII + mapping table** from **`FLOWS_AND_SCREENS`** (use **`PRD_SCREENSHOTS`** if present for regions) → same implementation targets as above → story docs per **Story docs (fidelity)** → verify (`tsc` / targeted tests).

**SVGR:** named **`ReactComponent`** for storybook package SVGs; **`?url`** when a string URL is needed.

---

## Mode D: Implement in root Vite app

Code lives under **`src/<FEATURE_FOLDER>/`**. **Compose** `@paytm-h5-common/paytm_common_ui` (alias → `paytm-common-storybook/src/index.ts`). Global tokens already in **`main.tsx`**. Prefer **`var(--…)`** in **`.module.css`**. **SVGR `ReactComponent`** only for **`paytm-common-storybook/**/*.svg`**; app SVGs: default asset handling or hand inline.

**Non-negotiables:** Same composition spirit as C. **Badge** for status chips; **Avatar** from PODS, not raw `<img>` unless spec demands. **No** Storybook title requirement; traceability: Figma and/or PRD per **`SPEC_SOURCE`** (see Mode C story-doc pattern, adapted for app — e.g. short comment block or README in feature folder only if the user asked). **App.tsx** / hash routing unless specified. **Do not** refactor unrelated shells or add library exports unless asked.

**Workflow (figma):** Parse URL → context + screenshot + assets under **`src/<FEATURE_FOLDER>/assets/`** → ASCII + table → **`ScreenName.tsx`** + **`.module.css`** → wire **App.tsx** → **`npm run build`** (or project `tsc`).

**Workflow (prd):** Shared **PRD** rules → ASCII + table from **`FLOWS_AND_SCREENS`** → assets only when PRD/screenshots provide them → same file targets → wire **App.tsx** → **`npm run build`** (or project `tsc`).

---

## Mode E: Commit and push

**No Figma.** Finish the worktree:

1. **`git status`**
2. **Stage** only what belongs (exclude build output, secrets, **`paytm-common-storybook/build-storybook/`**, etc.).
3. **Commit** — imperative subject; body if needed.
4. **Push** to **`origin`** (set upstream if missing).

Do **not** force-push unless the user explicitly asks. If push fails, explain and next step.

If **SKIP_IF_EMPTY: yes** (default) and there is nothing to commit, say so and **do not** push.

---

## Quality bars (short)

- **A:** Skeleton clear; not a pixel spec.
- **B:** Implementable from **`layouts.md`** + design system without Figma as literal contract.
- **C/D:** Typed surfaces; documents **spec** match (Figma and/or PRD) vs intentional generics; no unrelated refactors. PRD path: covers **`FLOWS_AND_SCREENS`**; lists assumptions when the PRD was thin.

---

## Related paths (browse, don’t duplicate here)

- Layout inventory: `docs/layout-references/layouts.md`, `layout-pattern-catalog.md`
- UI generation sources: `docs/agents/ui-generation-sources.md`
