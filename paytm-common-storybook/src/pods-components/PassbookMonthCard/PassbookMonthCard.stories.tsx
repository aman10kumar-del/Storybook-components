import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import PassbookMonthCard from "./PassbookMonthCard";
import type { PassbookMonthCardRow } from "./PassbookMonthCard.types";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import avatar01Url from "./story-assets/passbook-month-contact-avatar-01.png?url";
import avatar02Url from "./story-assets/passbook-month-contact-avatar-02.png?url";
import avatar03Url from "./story-assets/passbook-month-contact-avatar-03.png?url";
import bankAxisUrl from "./story-assets/passbook-month-bank-axis.png?url";
import bankOperatorUrl from "./story-assets/passbook-month-bank-operator-badge.png?url";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-7044";

const demoRows: PassbookMonthCardRow[] = [
  {
    id: "1",
    name: "Sumit Gupta",
    subtitle: "3 minutes ago",
    amountLabel: "₹400",
    avatar: { variant: "profile", imageSrc: avatar01Url, imageAlt: "Sumit Gupta" },
    sourceBankLogoSrc: bankAxisUrl,
    sourceBankLogoAlt: "Axis Bank",
  },
  {
    id: "2",
    name: "Neha Bharadwaj",
    subtitle: "4 hrs ago",
    amountLabel: "₹782",
    avatar: { variant: "profile", imageSrc: avatar02Url, imageAlt: "Neha Bharadwaj" },
    sourceBankLogoSrc: bankOperatorUrl,
    sourceBankLogoAlt: "Bank",
  },
  {
    id: "3",
    name: "Rajeev Kumar",
    subtitle: "Yesterday",
    amountLabel: "+₹312",
    amountTone: "credit",
    avatar: { variant: "profile", imageSrc: avatar03Url, imageAlt: "Rajeev Kumar" },
    sourceBankLogoSrc: bankOperatorUrl,
    sourceBankLogoAlt: "Bank",
  },
  {
    id: "4",
    name: "Rajeev Kumar",
    subtitle: "22 Jun",
    amountLabel: "₹2,586",
    avatar: { variant: "initials", initials: "RK" },
    sourceBankLogoSrc: bankOperatorUrl,
    sourceBankLogoAlt: "Bank",
  },
];

const DOCS = `
**Figma:** **252:7044** — flat **List** rows (no vertical timeline); divider from **Main** left edge to card inset · **72px** row height · **16px** horizontal padding · **16px** gap avatar→main · **12px** gap texts↔trailing · header **43px** · month **title4-semibold** · total **body-semibold** · name **title4-regular** · time **body-regular** · amount **title4-semibold** · “From” **subtext-regular** /**neutral-moderate**.

**Mapping:** **Card** (rounded **\`$radius-3xl\`**) · header uses **\`--background-offset-1-weak\`** · rows = **Avatar** \`size="regular"\` (**48×48**) + **ListItem**-style main / trailing · **chevron_right** 16×16 on the header.

**Type:** (See Figma block above.)

**Assets:** PNGs from design export live in \`story-assets/\` (**passbook-month-contact-avatar-*.png**, **passbook-month-bank-axis.png**, **passbook-month-bank-operator-badge.png**). Swap URLs for production.

**Story canvas:** **\`--surface-level-4\`** background so the card reads like a phone surface.
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

const meta: Meta<typeof PassbookMonthCard> = {
  title: "PODS Components - New/PassbookMonthCard",
  component: PassbookMonthCard,
  args: {
    monthTitle: "June 2025",
    totalAmountLabel: "₹99,28,758.43",
    rows: demoRows,
    onHeaderClick: action("headerClick"),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — Passbook / Month Card (252:7044)")}${DOCS}`,
      },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof PassbookMonthCard> = (args) => (
  <Shell>
    <PassbookMonthCard {...args} />
  </Shell>
);

export const HeaderStatic: StoryFn<typeof PassbookMonthCard> = (args) => (
  <Shell>
    <PassbookMonthCard {...args} onHeaderClick={undefined} />
  </Shell>
);

HeaderStatic.storyName = "Header not interactive";
