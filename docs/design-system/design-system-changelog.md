# Design system changelog (PODS / `paytm_common_ui`)

Tracks **core component and token changes** made in this workspace that affect **multiple product flows**. For day-to-day spacing and composition rules, see **`.cursor/design.mdc`** (includes consumer TextField / list-avatar patterns in **§13**). **Structured handoff (JSON):** add or extend entries in **`docs/design-system/component-customizations.json`** for component-level specs devs can parse or import. **Index:** **`docs/README.md`**.

| Date | Package / area | Change | Consumer action |
|------|----------------|--------|-----------------|
| **2026-04-09** | **Header Default** (`paytm-common-storybook` → `HeaderDefault`) | **Large** layout (two rows: back row + title row): the **main title** uses the **Display 3 — Bold** text style (`getFontStyle(display3-bold, …)` → `typography.scale.display3` + `typography.weight.bold`, colour `text-neutral-strong`). In Figma this is often labelled **Header Large / extended**; in code it is **`size="large"`** (not a separate `extended` prop). **JSON:** `docs/design-system/component-customizations.json` → entry id **`header-default-large-main-title-typography`**. | After publishing/installing a build that includes this SCSS, no app override is needed. If you still ship an older **paytm_common_ui** build that used a smaller title on that row, either upgrade the package or keep a temporary local style override until aligned. |
| **2026-04-08** | `@paytm-h5-common/paytm_common_ui` **3.1.0** (source: `paytm-common-storybook/`) | **`ListItem`** supports **`trailing.type === "avatar"`** with the same **`avatar`** + optional **`size`** (`"small"` \| `"regular"`) as **`leading`** avatars. Use for **beneficiary / identity** rows inside **mixed** lists where other rows have no leading chrome, so labels stay aligned. SCSS: **`.trailingAvatar`**, **`.leadingAvatar`** (flex-shrink). Story: **List → WithTrailingAvatarMixedRows**. Tests: **`List.test.tsx`** — *trailing avatar present*. | **Types + runtime:** Publish **3.1.0** (or install a local build) so **`node_modules`** contains the updated **`ListItem`** implementation — **npm `^3.0.3` alone does not render** trailing avatars. Until published types include **`TrailingAvatar`**, add a small local type bridge if your app needs it. **Build library:** `npm run prepare` in `paytm-common-storybook/` (requires working **rollup** toolchain; if **`prepare` fails** (e.g. **svgo**), fix the toolchain or build in CI and install the resulting **`dist/`**). **`file:`** install runs **`prepare`** unless **`npm install --ignore-scripts`** — then run **`prepare`** manually after. |

## How to add an entry

**Canonical order for one handoff:** (1) add or update **`component-customizations.json`** with a stable **`id`** and structured fields — **source of truth for machine-readable facts**; (2) add the matching **table row here** with the same **`id`** referenced in prose — **narrative and consumer actions**; (3) update **Storybook** (`parameters.docs`, stories) so what ships matches both — **if story and JSON disagree, fix the drift**. Do **not** let the changelog contradict the JSON for the same change.

1. **Date** — use the shipping or merge date of the change.  
2. **Package / area** — npm name + version bump, or folder (e.g. tokens, Storybook).  
3. **Change** — what APIs, visuals, or tokens changed; link Storybook stories or Figma when useful.  
4. **Consumer action** — version bump, codemod, or feature flag if applicable.

Keep entries **short**; link PRs or tickets in your git host instead of duplicating full specs here.
