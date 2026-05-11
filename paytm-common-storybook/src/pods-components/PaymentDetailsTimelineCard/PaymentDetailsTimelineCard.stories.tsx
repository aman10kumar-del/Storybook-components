import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import PaymentDetailsTimelineCard from "./PaymentDetailsTimelineCard";
import { getFigmaLinkHTML } from "../../stories-common/utils";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-7059";

const DOCS = `
**Layout (Figma):**
\`\`\`
+------------------------------------------+
|  Payment Details                    ^      |
|  o-- Payment started by ...               |
|  |                                        |
|  o-- Deducted money from ...              |
|  |                                        |
|  o-- Money could not be credited ...      |
+------------------------------------------+
\`\`\`

| Region | PODS mapping |
|--------|----------------|
| Surface | **Card** · \`surface-level-1\` · \`radius-3xl\` · no border (matches Gen-AI card) |
| Title row | **SectionHeader** \`size="large"\` + **titleWeight="medium"** → **title3-medium** (Figma Title 3 Medium 18/24) |
| Chevron | **ultra-icons** \`chevron_up\` / \`chevron_down\` · optional **button** with \`aria-expanded\` |
| Timeline | **ActivityTimeline** \`type="vertical"\` · \`appearance="payment-details"\` → **body-regular** steps · 16px success icons |

**Intentional:** Step icons reuse **ActivityTimeline** \`completed\` (system success artwork), not one-off Figma raster exports.
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

const meta: Meta<typeof PaymentDetailsTimelineCard> = {
  title: "PODS Components - New/PaymentDetailsTimelineCard",
  component: PaymentDetailsTimelineCard,
  args: {
    title: "Payment Details",
    steps: [
      {
        id: "1",
        label: "Payment started by Vijay Shekhar Sharma",
      },
      {
        id: "2",
        label:
          "Deducted money from Vijay Shekhar Sharma’s Axis A/c 5342 3203 40",
      },
      {
        id: "3",
        label: "Money could not be credited to sharon chopra bank account ",
      },
    ],
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — Global / Card / Timeline (252:7059)")}${DOCS}`,
      },
    },
  },
};

export default meta;

const Template: StoryFn<typeof PaymentDetailsTimelineCard> = (args) => (
  <Shell>
    <PaymentDetailsTimelineCard {...args} />
  </Shell>
);

export const Default = Template.bind({});

export const Collapsible = Template.bind({});
Collapsible.args = {
  onHeaderToggleClick: action("headerToggle"),
  headerExpanded: true,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  onHeaderToggleClick: action("headerToggle"),
  headerExpanded: false,
};
