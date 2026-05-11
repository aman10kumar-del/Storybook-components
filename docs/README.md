# Documentation index (PODS AI WGMI)

**One-page link hub for agents (repo root):** [`AGENTS.md`](../AGENTS.md).

**UI agents — full ordered path + canonical handoff rules:** [`agents/ui-generation-sources.md`](agents/ui-generation-sources.md). **Terms:** [`agents/glossary.md`](agents/glossary.md).

| Folder / file | Audience | Purpose |
|-----------------|----------|---------|
| **[`agents/ai-agent-project-brief.md`](agents/ai-agent-project-brief.md)** | Coding agents, new contributors | What this repo is, where PODS source lives, how to run Storybook and tasks |
| **[`agents/ui-generation-sources.md`](agents/ui-generation-sources.md)** | Coding agents | Curated list of docs/rules/code paths to reference so generated UI matches PODS conventions |
| **[`setup-guide.html`](setup-guide.html)** | Anyone unzipping the repo | Open in a browser, no Node; run commands and ports in **[`agents/ai-agent-project-brief.md`](agents/ai-agent-project-brief.md)** |
| **[`design-system/design-system-changelog.md`](design-system/design-system-changelog.md)** | Design + engineering leads | Human-readable log of cross-flow component/token changes |
| **[`design-system/component-customizations.json`](design-system/component-customizations.json)** | Engineering (import / tooling) | Structured component specs and deltas for handoff (pair with changelog) |
| **[`layout-references/`](layout-references/)** | Product + engineering | Figma-backed screen inventory (`layouts.md`), generic pattern menu (`layout-pattern-catalog.md`) |

**Cursor rules** (token usage, Storybook IDs, layout patterns): **`.cursor/design.mdc`** and **`.cursor/tokens.mdc`** — see **`.cursor/README.md`**.

**Figma / layout / implementation / git:** **`prompts/hi-pods.md`** (repo root) — pick **MODE** **A**–**E** in the inputs block.

**Naming:** Markdown and JSON under **`docs/`** use **kebab-case** (e.g. `design-system-changelog.md`). **`README.md`** stays uppercase by common convention.
