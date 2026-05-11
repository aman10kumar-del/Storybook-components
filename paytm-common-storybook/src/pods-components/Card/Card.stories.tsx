import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import Card from "./Card";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import storyStyles from "./Card.stories.module.scss";

const PODS_CARD_DOCS = `
### PODS layout rules (\`.cursor/design.mdc\`)

Reference **§8** (composition), **§9** (shell inset vs component roots), and **§11** (screen layout — card sections).

| Topic | Rule |
|-------|------|
| **Padding** | Default shell uses **\`padding-horizontal-3xl\` / \`vertical-3xl\`** (\`Card.module.scss\`). Use **compact** top/bottom (**\`unit-2\`**) only for **list / row-stack** cards so row chrome is not doubled. |
| **Radius (product)** | Section cards on neutral washes: **\`number-semantics.radius.3xl\`** — override via **\`customClass\`** (see **Section tile on page wash**). The library default is still **\`radius-l\`** on **\`cardWrapper\`**. |
| **Border** | Default: **\`1px\` \`--border-neutral-weak\`**. On a **page wash** (\`--surface-level-4\`), **borderless** tiles use **fill + radius** only — **\`border: none\`** on **\`customClass\`** (§11 *Card — borderless section tiles on wash*). |
| **Inset** | **Card** often **owns** inner horizontal inset; strip duplicate **ListItem** / **TextField** gutters when the card is the inset owner (§11 *Avoid double padding*). |
| **Section chrome** | **SectionHeader** for the section label usually stays **outside** the card; avoid duplicating the screen H1 (§11 *Section titles*). |
| **Lists** | Last **ListItem**: **\`separator={false}\`** or **\`separator={index < length - 1}\`** (§11 *List row dividers*). |
`;

export default {
  title: "PODS Components/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `${getFigmaLinkHTML(
          "https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=255-2199&t=WP7dIHNEohJG5iLp-0",
        )}${PODS_CARD_DOCS}`,
      },
    },
  },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => (
  <Card
    {...args}
    onClick={() => {
      action("onClick")();
    }}
  >
    <div style={{ textAlign: "center", color: "var(--text-neutral-strong)" }}>
      <h1 style={{ margin: 0 }}>Card Heading</h1>
      <section>Card Body</section>
    </div>
  </Card>
);

/** Library default: \`border-neutral-weak\` hairline and \`radius-l\` on \`cardWrapper\`. Product screens often override per §11 (see **Section tile on page wash**). */
export const Default = Template.bind({});

const SectionTileTemplate: StoryFn<typeof Card> = (args) => (
  <div className={storyStyles.pageWash}>
    <Card
      {...args}
      customClass={[storyStyles.podsSectionTile, args.customClass].filter(Boolean).join(" ")}
      onClick={() => {
        action("onClick")();
      }}
    >
      <div style={{ textAlign: "center", color: "var(--text-neutral-strong)" }}>
        <h1 style={{ margin: 0, fontSize: "1.125rem" }}>Section tile</h1>
        <p style={{ margin: "0.5rem 0 0", color: "var(--text-neutral-moderate)" }}>
          §11 pattern: <code>radius-3xl</code>, no border, <code>surface-level-1</code> on{" "}
          <code>surface-level-4</code> wash.
        </p>
      </div>
    </Card>
  </div>
);

/** §11 **Card corner radius** + **borderless section tiles on page wash** — recommended for category hubs, grouped content, and list bodies on \`--surface-level-4\`. */
export const SectionTileOnPageWash = SectionTileTemplate.bind({});
