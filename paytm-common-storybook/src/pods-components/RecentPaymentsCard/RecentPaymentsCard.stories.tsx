import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import RecentPaymentsCard from "./RecentPaymentsCard";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import type { RecentPaymentsItem } from "./RecentPaymentsCard";

import profileSample from "./story-assets/payment-contact-profile@3x.png";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-7108";

const demoItems: RecentPaymentsItem[] = [
  {
    id: "1",
    title: "Aastha Bhat",
    subtitle: "₹1400 sent on 29th Oct",
    avatar: {
      variant: "initials",
      initials: "AB",
      initialsColor: "sprout",
      starBadge: true,
    },
  },
  {
    id: "2",
    title: "Ravi Kumar",
    subtitle: "₹100 received on 28th Oct",
    avatar: {
      variant: "profile",
      imageURL: profileSample,
      starBadge: true,
    },
  },
  {
    id: "3",
    title: "Sameer Enterprise",
    subtitle: "₹4,200 sent on 10th Dec",
    captionUnderAvatar: "Business",
    avatar: {
      variant: "initials",
      initials: "SE",
      initialsColor: "water",
      starBadge: false,
    },
  },
];

const DOCS = `
**Layout:** **Card** (24px radius, surface-1) · rows **72px** min-height, **16px** horizontal inset · **Avatar** \`regular\` **48×48** with optional **action** star (**star_on** ultra-icon) · **Pay** = **Button** \`tonal\` \`small\` with Figma padding (**16×4**).

**Type:** Title **title4-medium** · subtitle **body-regular** **text-neutral-moderate** · “Business” chip **caption-semibold** on **background-offset-2-weak** · **View All** **title4-semibold**.

**Asset:** Profile photo is a **128×128 PNG** export from Figma (\`@3x\` naming); swap via \`imageURL\` per row.
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

const meta: Meta<typeof RecentPaymentsCard> = {
  title: "PODS Components - New/RecentPaymentsCard",
  component: RecentPaymentsCard,
  args: {
    items: demoItems,
    onPayClick: action("pay"),
    onViewAllClick: action("viewAll"),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — Payments / Recent Payments (252:7108)")}${DOCS}`,
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof RecentPaymentsCard> = (args) => (
  <Shell>
    <RecentPaymentsCard {...args} />
  </Shell>
);

export const ViewAllStatic: StoryFn<typeof RecentPaymentsCard> = (args) => (
  <Shell>
    <RecentPaymentsCard {...args} onViewAllClick={undefined} />
  </Shell>
);

ViewAllStatic.storyName = "View all (non-interactive)";
