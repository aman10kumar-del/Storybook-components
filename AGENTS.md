# Agent index — PODS AI WGMI

**Start here** instead of searching the whole tree. This file is a **link hub**; depth lives in the targets below.

**Ordered “what to read first” for UI work:** [`docs/agents/ui-generation-sources.md`](docs/agents/ui-generation-sources.md) (primary inventory + **which source wins**). **Vocabulary:** [`docs/agents/glossary.md`](docs/agents/glossary.md).

| Need | Where |
|------|--------|
| **What this repo is** + run commands + Storybook | [`docs/agents/ai-agent-project-brief.md`](docs/agents/ai-agent-project-brief.md) |
| **Setup guide** — **no tooling:** [`docs/setup-guide.html`](docs/setup-guide.html) (open in browser). Run commands and ports: [`docs/agents/ai-agent-project-brief.md`](docs/agents/ai-agent-project-brief.md) |
| **All documentation** (changelog, JSON handoff, layouts) | [`docs/README.md`](docs/README.md) |
| **Cursor rules** (tokens, Storybook titles, layout patterns) | [`.cursor/design.mdc`](.cursor/design.mdc) · [`.cursor/tokens.mdc`](.cursor/tokens.mdc) · [`.cursor/README.md`](.cursor/README.md) |
| **UI generation — file list to @-mention** (layouts, tokens, prompts) | [`docs/agents/ui-generation-sources.md`](docs/agents/ui-generation-sources.md) |
| **PODS source** (components, tokens, stories) | `paytm-common-storybook/` → `src/pods-components/`, `src/stories-common/`, `configs/design-tokens.json` |
| **Root app** (Vite shell, not the design system) | `src/` at repo root |
| **Layout flows + pattern IDs (`LP-*`)** | [`docs/layout-references/layouts.md`](docs/layout-references/layouts.md), [`docs/layout-references/layout-pattern-catalog.md`](docs/layout-references/layout-pattern-catalog.md) |
| **Component handoff (machine-readable)** | [`docs/design-system/component-customizations.json`](docs/design-system/component-customizations.json) + [`docs/design-system/design-system-changelog.md`](docs/design-system/design-system-changelog.md) |
| **Figma → layouts, code, git** (pick **MODE** A–E in one paste block) | [`prompts/hi-pods.md`](prompts/hi-pods.md) — **shortcut:** greeting-only **hi** / **hello** shows the mode menu (`.cursor/hi-pods-chat.mdc`) |

**Common commands** (from repo root): `npm run dev` · `npm run storybook` · `npm run check:doc-links` (validates relative links in `docs/`, `prompts/`, `AGENTS.md`, `.cursor/README.md`) · see the brief for ports and library-only Storybook.
