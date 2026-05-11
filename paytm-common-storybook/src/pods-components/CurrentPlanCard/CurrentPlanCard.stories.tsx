import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import CurrentPlanCard from "./CurrentPlanCard";
import type { CurrentPlanDataPackChip } from "./CurrentPlanCard";
import Card from "../Card/Card";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import operatorAirtelUrl from "./story-assets/operator-airtel@3x.svg?url";
import storyStyles from "./CurrentPlanCard.stories.module.scss";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6678";

const DOCS = `
**Regions:** Contact **header** (Avatar logo + name / mobile + **Change** link) · **Current plan** (label + price, **Recharge** primary, description + **Plan Details** link, expiry) · **Add data pack** tray (\`background-offset-2-weak\` — footer wash vs white card; title + **Badge** notice/muted, horizontal **chips**).

**Primitives:** **Card**, **Avatar** (\`logo\` / \`regular\`), **Button** (\`link\` small, \`filled\` medium), **Badge** (\`notice\` + \`muted\`).

**Assets:** Operator mark — \`operator-airtel@3x.svg?url\` (root Vite Storybook).

**Story:** Outer **Card** uses **\`--surface-level-4\`** as the page wash; the component’s own **Card** is the white tile on top.
`;

const demoChips: CurrentPlanDataPackChip[] = [
  { id: "c1", price: "₹22", detail: "1 GB · 1 Day" },
  { id: "c2", price: "₹29", detail: "3 GB/ day · 3 Days" },
  { id: "c3", price: "₹33", detail: "9 GB · 3 Days" },
];

const StoryCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Card customClass={storyStyles.pageCanvasCard}>{children}</Card>
);

const meta: Meta<typeof CurrentPlanCard> = {
  title: "PODS Components - New/CurrentPlanCard",
  component: CurrentPlanCard,
  args: {
    operatorLogoSrc: operatorAirtelUrl,
    displayName: "Rahul Saini",
    mobileNumber: "9819808765",
    onChangeClick: action("change contact"),
    planPrice: "₹988",
    onRechargeClick: action("recharge"),
    planDescription: "28 Days - Unlimited 5G+3...",
    onPlanDetailsClick: action("plan details"),
    planExpiryText: "Plan expires at 12:30 pm tomorrow",
    dataPackBadgeLabel: "🏏 Cricket Special",
    dataPackChips: demoChips,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — RU. / Current Plan Card (252:6678)")}${DOCS}`,
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof CurrentPlanCard> = (args) => (
  <StoryCanvas>
    <CurrentPlanCard {...args} />
  </StoryCanvas>
);

export const NoDataPackTray: StoryFn<typeof CurrentPlanCard> = (args) => (
  <StoryCanvas>
    <CurrentPlanCard {...args} showDataPackSection={false} />
  </StoryCanvas>
);

NoDataPackTray.storyName = "Without data pack section";
