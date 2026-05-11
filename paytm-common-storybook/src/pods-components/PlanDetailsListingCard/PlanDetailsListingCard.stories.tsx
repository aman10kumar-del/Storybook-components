import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import Card from "../Card/Card";
import PlanDetailsListingCard from "./PlanDetailsListingCard";
import { getFigmaLinkHTML } from "../../stories-common/utils";

/** Footer marks: 72×72 @3× PNGs (copied from `~/Desktop/images/RU/*.png` into `story-assets/`). */
import benefit5gUrl from "./story-assets/plan-details-benefit-5g@3x.png?url";
import benefitAmazonUrl from "./story-assets/plan-details-benefit-amazon@3x.png?url";
import benefitAirtelUrl from "./story-assets/plan-details-benefit-airtel@3x.png?url";
import benefitJioUrl from "./story-assets/plan-details-benefit-jio@3x.png?url";

import storyStyles from "./PlanDetailsListingCard.stories.module.scss";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6682";

const DOCS = `
**Regions:** **Badge** (positive + muted) · **Price column** (headline + per-day line) · **Validity / Data** pairs · optional **chevron** · **Plan Details** (title4 + primary text) · row of **24×24** circular footer slots.

**Primitives:** **Card**, **Badge**, ultra-icons (\`chevron_right\`). Footer marks: \`story-assets/plan-details-benefit-*@3x.png\` (source: \`Desktop/images/RU\`, 72×72).

**Story:** Outer **Card** uses **\`--surface-level-4\`** as the page wash; inner **Card** is the white listing tile.
`;

const demoFooterIcons = [
  <img key="5g" src={benefit5gUrl} alt="" />,
  <img key="amazon" src={benefitAmazonUrl} alt="" />,
  <img key="airtel" src={benefitAirtelUrl} alt="" />,
  <img key="jio" src={benefitJioUrl} alt="" />,
];

const StoryCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Card customClass={storyStyles.pageCanvasCard}>{children}</Card>
);

const meta: Meta<typeof PlanDetailsListingCard> = {
  title: "PODS Components - New/PlanDetailsListingCard",
  component: PlanDetailsListingCard,
  args: {
    badgeLabel: "Free Unlimited 5G",
    headlinePrice: "₹30",
    priceSubtitle: "+ ₹10/Day",
    validityValue: "2 Days",
    dataValue: "1.5 GB/Day",
    planDetailsLabel: "Plan Details",
    showChevron: true,
    onSpecRowClick: action("spec row"),
    onPlanDetailsClick: action("plan details"),
    footerIcons: demoFooterIcons,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(
          FIGMA,
          "Figma — RU / Plan Details Listing Card (252:6682)",
        )}${DOCS}`,
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof PlanDetailsListingCard> = (args) => (
  <StoryCanvas>
    <PlanDetailsListingCard {...args} />
  </StoryCanvas>
);

export const ReadOnlyRow: StoryFn<typeof PlanDetailsListingCard> = (args) => (
  <StoryCanvas>
    <PlanDetailsListingCard
      {...args}
      onSpecRowClick={undefined}
      onPlanDetailsClick={undefined}
    />
  </StoryCanvas>
);

ReadOnlyRow.storyName = "Read-only (no row / link actions)";

export const WithoutBadge: StoryFn<typeof PlanDetailsListingCard> = (args) => (
  <StoryCanvas>
    <PlanDetailsListingCard {...args} badgeLabel="" />
  </StoryCanvas>
);

WithoutBadge.storyName = "Without badge";
