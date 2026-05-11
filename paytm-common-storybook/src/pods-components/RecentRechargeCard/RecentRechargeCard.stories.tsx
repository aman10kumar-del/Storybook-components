import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import RecentRechargeCard from "./RecentRechargeCard";
import { getFigmaLinkHTML } from "../../stories-common/utils";

/* Root Storybook (Vite + vite-plugin-svgr) only exposes `ReactComponent` for SVGs under
   paytm-common-storybook — use `?url` when the API needs an image URL string (e.g. Avatar logo). */
import operatorAirtelUrl from "./story-assets/operator-airtel@3x.svg?url";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6644";

const DOCS = `
**Mapping:** **Card** wraps the full row (leading + copy + menu) · **Avatar** \`type="logo"\` \`size="regular"\` (48×48) · **menu_overflow** ultra-icon 24×24.

**Type:** Primary **title4-medium**; phone + recharge line **body-regular**, **text-neutral-strong** (matches Figma 16/20 + 14/20).

**Assets:** Operator artwork is a combined circle + mark export (\`@3x\` SVG for sharp rasterisation). Swap \`operatorLogoSrc\` for other operators.

**Story canvas:** **\`--surface-level-4\`** page background so the card reads like production.
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

const meta: Meta<typeof RecentRechargeCard> = {
  title: "PODS Components - New/RecentRechargeCard",
  component: RecentRechargeCard,
  args: {
    operatorLogoSrc: operatorAirtelUrl,
    displayName: "Rahul Saini",
    mobileNumber: "9819808765",
    lastRechargeSummary: "Last recharged ₹2,000 on 23 Sep",
    onMenuClick: action("menu"),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — RU / Recent Recharge Card (252:6644)")}${DOCS}`,
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof RecentRechargeCard> = (args) => (
  <Shell>
    <RecentRechargeCard {...args} />
  </Shell>
);

export const WithoutMenuAction: StoryFn<typeof RecentRechargeCard> = (args) => (
  <Shell>
    <RecentRechargeCard {...args} onMenuClick={undefined} />
  </Shell>
);

WithoutMenuAction.storyName = "Menu icon only (no handler)";
