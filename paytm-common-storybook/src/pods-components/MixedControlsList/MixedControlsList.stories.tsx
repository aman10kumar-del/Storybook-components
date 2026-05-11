import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import MixedControlsList from "./MixedControlsList";
import { getFigmaLinkHTML } from "../../stories-common/utils";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-7055";

const DOCS = `
**Mapping:** **Card** (radius **3xl**, borderless, no padding) · **List** + **ListItem** · row 1 **trailing switch** (off by default in Figma) · rows 2–3 **trailing chevron** · **Separator** hairlines between rows 1–2 and 2–3 (none after row 3).

**Icons (ultra-icons):** visibility off · info (circle) · help & support · chevron right 24px.

**Type:** List primary line uses **body-medium** (List default). Figma label is Title 4 / Medium 16/20 — close system match; use List overrides later if product requires **title4-medium** here.

**Story canvas:** **\`--surface-level-4\`** background.
`;

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      padding: 16,
      maxWidth: 400,
      boxSizing: "border-box",
      background: "var(--surface-level-4)",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof MixedControlsList> = {
  title: "PODS Components - New/MixedControlsList",
  component: MixedControlsList,
  args: {
    onHidePaymentActiveChange: action("hidePaymentActiveChange"),
    onContactSupportClick: action("contactSupport"),
    onHelpClick: action("help"),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — Global / List - Mixed Controls (252:7055)")}${DOCS}`,
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof MixedControlsList> = (args) => (
  <Shell>
    <MixedControlsList {...args} />
  </Shell>
);

export const HidePaymentOn: StoryFn<typeof MixedControlsList> = (args) => (
  <Shell>
    <MixedControlsList {...args} hidePaymentActive />
  </Shell>
);
