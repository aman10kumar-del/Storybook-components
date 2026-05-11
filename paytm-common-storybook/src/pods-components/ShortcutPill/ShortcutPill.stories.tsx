import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import { ReactComponent as BankIcon } from "../../assets/ultra-icons/standard/bank.svg";
import ShortcutPill from "./ShortcutPill";
import ShortcutPillRow from "./ShortcutPillRow";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import storyStyles from "./ShortcutPill.stories.module.scss";

const FIGMA_DEFAULT =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6599";
const FIGMA_GRAPHIC =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6628";
const FIGMA_ROW =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=214-3319";

const DOCS = `
**vs Chips:** Taller pill, two-line label, circular **well** for brand or illustration, **1px** hairline border — more emphasis than **PODS Components/Chips**.

**Variants:** \`brand\` (8px gap) · \`graphic\` (12px gap, larger art in the well). **Well:** \`lg\` = **48px** (\`unit-12\`), \`md\` = **42px** (no exact token — flag if design system adds **42px** primitive).

**Row:** \`ShortcutPillRow\` = horizontal **scroll** (\`overflow-x: auto\`), **8px** gutter, optional **12px** leading inset (Figma).

**Layout stories:** Same **content-area** shell as **Enter mobile** / **Search plans** (not inside Card).
`;

const Shell: React.FC<{ children: React.ReactNode; narrow?: boolean }> = ({
  children,
  narrow,
}) => (
  <div className={storyStyles.contentArea}>
    <div className={narrow ? storyStyles.narrowPhone : undefined}>{children}</div>
  </div>
);

const meta: Meta<typeof ShortcutPill> = {
  title: "PODS Components - New/ShortcutPill",
  component: ShortcutPill,
  parameters: {
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA_DEFAULT, "Figma — default / brand")}${getFigmaLinkHTML(
          FIGMA_GRAPHIC,
          "Figma — big graphic",
        )}${getFigmaLinkHTML(FIGMA_ROW, "Figma — horizontal row")}${DOCS}`,
      },
    },
  },
};

export default meta;

const brandGraphic = (
  <BankIcon aria-hidden />
);

export const DefaultBrand: StoryFn<typeof ShortcutPill> = (args) => (
  <Shell>
    <ShortcutPill
      {...args}
      graphic={brandGraphic}
      onClick={action("onClick")}
    />
  </Shell>
);
DefaultBrand.args = {
  title: "Axis Bank",
  subtitle: "A/c 5678",
  variant: "brand",
  wellSize: "lg",
  textDensity: "default",
};

export const BigGraphic: StoryFn<typeof ShortcutPill> = (args) => (
  <Shell>
    <ShortcutPill
      {...args}
      graphic={<span className={storyStyles.graphicDemo} aria-hidden />}
      onClick={action("onClick")}
    />
  </Shell>
);
BigGraphic.args = {
  title: "Gold Coins",
  subtitle: "15,075",
  variant: "graphic",
  wellSize: "lg",
  textDensity: "default",
};

export const Disabled: StoryFn<typeof ShortcutPill> = (args) => (
  <Shell>
    <ShortcutPill {...args} graphic={brandGraphic} />
  </Shell>
);
Disabled.args = {
  title: "HDFC Bank",
  subtitle: "A/c 2345",
  disabled: true,
};

export const HorizontalScrollRow: StoryFn = () => (
  <Shell narrow>
    <ShortcutPillRow>
      <ShortcutPill
        title="Anisha"
        subtitle="2 GB • ₹1,299"
        variant="brand"
        wellSize="md"
        textDensity="compact"
        graphic={brandGraphic}
        onClick={action("pill-Anisha")}
      />
      <ShortcutPill
        title="Papa"
        subtitle="1 GB • ₹299"
        variant="brand"
        wellSize="md"
        textDensity="compact"
        graphic={brandGraphic}
        onClick={action("pill-Papa")}
      />
      <ShortcutPill
        title="Axis Bank"
        subtitle="A/c 5678"
        variant="brand"
        wellSize="md"
        textDensity="default"
        graphic={brandGraphic}
        onClick={action("pill-Axis")}
      />
      <ShortcutPill
        title="HDFC Bank"
        subtitle="A/c 2345"
        variant="brand"
        wellSize="md"
        textDensity="default"
        graphic={brandGraphic}
        onClick={action("pill-HDFC")}
      />
      <ShortcutPill
        title="Gold Coins"
        subtitle="15,075"
        variant="graphic"
        wellSize="lg"
        textDensity="default"
        graphic={<span className={storyStyles.graphicDemo} aria-hidden />}
        onClick={action("pill-Coins")}
      />
    </ShortcutPillRow>
  </Shell>
);

HorizontalScrollRow.storyName = "Row — horizontal scroll (narrow)";
