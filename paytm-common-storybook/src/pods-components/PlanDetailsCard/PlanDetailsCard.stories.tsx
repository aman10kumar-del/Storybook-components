import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import Card from "../Card/Card";
import PlanDetailsCard from "./PlanDetailsCard";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import operatorAirtelUrl from "../CurrentPlanCard/story-assets/operator-airtel@3x.svg?url";

import storyStyles from "./PlanDetailsCard.stories.module.scss";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6647";

const DOCS = `
**Regions:** **Header** (Avatar logo + name / mobile + **Change**) · **Separator** · **Plan Amount:** label · **Plan row:** **Price** column (headline + per-day only) beside **Validity / Data** · **Badge row:** optional primary/muted pill on its own full-width row below · **Description** (subtext, ~4-line clamp) · full-width **Button** \`tonal\` \`medium\` **View More Details** + \`chevron_down\`.

**Primitives:** **Card**, **Avatar**, **Button** (link small + tonal medium), **Separator** (hairline), **Badge**, ultra-icon \`chevron_down\`.

**Story:** Outer **Card** uses **\`--surface-level-4\`** as the page wash.
`;

const StoryCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Card customClass={storyStyles.pageCanvasCard}>{children}</Card>
);

const meta: Meta<typeof PlanDetailsCard> = {
  title: "PODS Components - New/PlanDetailsCard",
  component: PlanDetailsCard,
  args: {
    operatorLogoSrc: operatorAirtelUrl,
    displayName: "Rahul Saini",
    mobileNumber: "9819808765",
    onChangeClick: action("change"),
    planAmountLabel: "Plan Amount:",
    headlinePrice: "₹30",
    priceSubtitle: "₹10/ Day",
    badgeLabel: "Super Saver ~ Rs. 326/month",
    validityValue: "365 Days",
    dataValue: "2.5 GB/ day + 3GB",
    description:
      "Enjoy truly unlimited local, STD and Roaming Calls on any Network, 100 National SMS for 1 Enjoy truly unlimited local, STD and Roaming Calls on any Network, 100 National SMS for 1... ",
    viewMoreLabel: "View More Details",
    onViewMoreClick: action("view more"),
    viewMoreAriaExpanded: false,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(
          FIGMA,
          "Figma — RU / Plan Details (252:6647)",
        )}${DOCS}`,
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof PlanDetailsCard> = (args) => (
  <StoryCanvas>
    <PlanDetailsCard {...args} />
  </StoryCanvas>
);

export const WithoutBadge: StoryFn<typeof PlanDetailsCard> = (args) => (
  <StoryCanvas>
    <PlanDetailsCard {...args} badgeLabel="" />
  </StoryCanvas>
);

WithoutBadge.storyName = "Without badge";
