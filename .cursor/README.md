# Cursor rules (PODS AI WGMI)

Short map for humans and agents. **Project agent hub:** **`AGENTS.md`** (repo root). **Docs index:** **`docs/README.md`**. **Numbered reading order + “what wins” for generated UI:** **`docs/agents/ui-generation-sources.md`** · **glossary:** **`docs/agents/glossary.md`**. Design handoff: **`docs/design-system/`**; agent brief: **`docs/agents/`**; layouts: **`docs/layout-references/`**.

## Files here

| File | Role | When it applies |
|------|------|------------------|
| **`design.mdc`** | Colours, typography usage, Storybook story paths, layout/sheet patterns, component do’s/don’ts | **Always** (`alwaysApply: true`) |
| **`hi-pods-chat.mdc`** | Short greeting → Hi PODS **MODE A–E** menu + pointer to **`prompts/hi-pods.md`** (skipped if the same message includes a real task) | **Always** (`alwaysApply: true`) |
| **`tokens.mdc`** | Tables: number-semantics, gaps, radius, type scale, **`SectionHeader`** sizes | Glob-scoped (`paytm-common-storybook/**` + `src/**/*.{css,scss,tsx,ts}`) — loads only when editing UI files |

## Why these files?

**`design.mdc`** carries behaviour and naming you need on almost every task. **`hi-pods-chat.mdc`** is a small always-on shortcut so you need not **`@`** **`prompts/hi-pods.md`** just to see the mode list. **`tokens.mdc`** is reference-heavy; scoping it avoids loading duplicate tables into every chat. If you are editing **`paytm-common-storybook/configs/design-tokens.json`** only, **`design.mdc`** still applies; open any matching path (e.g. a **`.scss`** file under Storybook) or `@`-mention the token rule if your Cursor build needs an explicit nudge.

## Layout-doc workflow

Regenerate or extend **`docs/layout-references/layouts.md`**, implement from Figma, or finish git — use **`prompts/hi-pods.md`** at repo root (**MODE B**, **C**, **D**, or **E**). **Shortcut:** a greeting-only message (**hi**, **hello**, …) should surface the same mode list via **`hi-pods-chat.mdc`**; you can still **`@`** **`prompts/hi-pods.md`** anytime.

## Optional Cursor convention

Official Cursor examples sometimes use **`.cursor/rules/*.mdc`**. This repo keeps **`.cursor/*.mdc`** at the folder root; the onboarding brief lives at **`docs/agents/ai-agent-project-brief.md`**. Moving rules into **`rules/`** would work but needs a repo-wide link update.
