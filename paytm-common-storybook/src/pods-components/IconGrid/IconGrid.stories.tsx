import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import { ReactComponent as BankIcon } from "../../assets/ultra-icons/standard/bank.svg";
import { ReactComponent as PaytmBankAndWalletIcon } from "../../assets/ultra-icons/standard/paytm_bank_and_wallet.svg";
import { ReactComponent as QrCodeIcon } from "../../assets/ultra-icons/standard/qr_code.svg";
import { ReactComponent as CalendarIcon } from "../../assets/ultra-icons/system/action/calendar.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/ultra-icons/system/action/notifications.svg";
import { ReactComponent as ScanQrCodeIcon } from "../../assets/ultra-icons/system/category/scan_qr_code.svg";
import { ReactComponent as SplitBillIcon } from "../../assets/ultra-icons/system/category/split_bill.svg";
import Card from "../Card/Card";
import IconGrid from "./IconGrid";
import type { IconGridItem } from "./IconGrid.types";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import storyStyles from "./IconGrid.stories.module.scss";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6792";

const DOCS = `
**Circle:** **PODS Avatar** \`type="icon"\`, \`size="regular"\`, \`avatarIcon.outline: true\`.

**Layout:** **CSS Grid** — no wrap. \`columnsPerRow\`: **\`2\` | \`3\` | \`4\`** (default **\`4\`** — four items in one row). Items flow **row-first** (e.g. 6 + \`4\` ⇒ one row of 4 + one row of 2).

**Icons:** Main glyph is normalized to **24×24** (\`unit-8\`) inside **IconGrid**; optional badge **16×16** (\`unit-6\`). Stories use **\`src/assets/ultra-icons/**\` only — swap in other SVGs/img later; keep the same slot size for consistency.

**Cell / well:** **72px** column and **52px** Avatar shell are not on the number scale (see earlier notes).

**Badge:** \`badgeIcon\` + \`badgeIconType\` → Avatar corner overlay.

**Placement:** \`placement="default"\` (wash / page): fixed **72px** columns, grid **centred** in the parent. \`placement="contentColumn"\`: same wells as default, grid **start-aligned** — use under a §9 page gutter (**\`.cursor/design.mdc\` §9**) so shortcuts line up with **SectionHeader**. \`placement="inCard"\` (inside **Card**): **equal columns** across the card’s content width so **Card** is the only horizontal inset — set **\`--icon-grid-well-bg\`** / **\`--icon-grid-icon-on-well\`** (or use story classes). **White icons on primary wells:** **\`--icon-universal-light\`** (not \`--text-universal-light\`) — see **Inside Card — dark wells**. Optional \`--icon-grid-well-border\`.
`;

const fourItems: IconGridItem[] = [
  {
    id: "scan",
    label: "Scan\n& Pay",
    icon: <ScanQrCodeIcon aria-hidden />,
    onClick: action("scan"),
  },
  {
    id: "bank",
    label: "To Bank\nA/c",
    icon: <BankIcon aria-hidden />,
    onClick: action("bank"),
  },
  {
    id: "split",
    label: "Split\nBills",
    icon: <SplitBillIcon aria-hidden />,
    onClick: action("split"),
  },
  {
    id: "monthly",
    label: "Monthly\nPayments",
    icon: <CalendarIcon aria-hidden />,
    badgeIcon: <NotificationsIcon aria-hidden />,
    badgeIconType: "action",
    onClick: action("monthly"),
  },
];

const sixItems: IconGridItem[] = [
  ...fourItems.slice(0, 3),
  {
    id: "qr",
    label: "My\nQR",
    icon: <QrCodeIcon aria-hidden />,
    onClick: action("qr"),
  },
  {
    id: "wallet",
    label: "Bank &\nWallet",
    icon: <PaytmBankAndWalletIcon aria-hidden />,
    onClick: action("wallet"),
  },
  fourItems[3],
];

const meta: Meta<typeof IconGrid> = {
  title: "PODS Components - New/IconGrid",
  component: IconGrid,
  argTypes: {
    columnsPerRow: {
      control: "radio",
      options: [2, 3, 4],
    },
    placement: {
      control: "radio",
      options: ["default", "inCard"],
    },
  },
  args: {
    columnsPerRow: 4,
    items: fourItems,
    placement: "default",
  },
  parameters: {
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — Global / Icon Grid")}${DOCS}`,
      },
    },
  },
};

export default meta;

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={storyStyles.contentArea}>{children}</div>
);

export const Default: StoryFn<typeof IconGrid> = (args) => (
  <Shell>
    <IconGrid {...args} />
  </Shell>
);
Default.storyName = "Default (4 columns, 4 items, 1 row)";

export const InsideCardDarkWells: StoryFn<typeof IconGrid> = (args) => (
  <div className={storyStyles.shellInCardDemo}>
    <Card customClass={storyStyles.sectionTileCard}>
      <IconGrid {...args} />
    </Card>
  </div>
);
InsideCardDarkWells.args = {
  items: fourItems,
  columnsPerRow: 4,
  placement: "inCard",
  customClass: storyStyles.darkWellsInCardVars,
};
InsideCardDarkWells.storyName =
  "Inside Card — semantic vars (dark well / light icon)";

export const InsideCardLightWells: StoryFn<typeof IconGrid> = (args) => (
  <div className={storyStyles.shellInCardDemo}>
    <Card customClass={storyStyles.sectionTileCard}>
      <IconGrid {...args} />
    </Card>
  </div>
);
InsideCardLightWells.args = {
  items: fourItems,
  columnsPerRow: 4,
  placement: "inCard",
  customClass: storyStyles.lightWellsInCardVars,
};
InsideCardLightWells.storyName =
  "Inside Card — semantic vars (light well / dark icon)";

export const ThreeColumns: StoryFn<typeof IconGrid> = (args) => (
  <Shell>
    <IconGrid {...args} />
  </Shell>
);
ThreeColumns.args = {
  items: fourItems,
  columnsPerRow: 3,
};
ThreeColumns.storyName = "3 columns (4 items → 2 rows)";

export const TwoColumns: StoryFn<typeof IconGrid> = (args) => (
  <Shell>
    <IconGrid {...args} />
  </Shell>
);
TwoColumns.args = {
  items: fourItems,
  columnsPerRow: 2,
};
TwoColumns.storyName = "2 columns (4 items → 2 rows)";

export const ThreeColumnsSixItems: StoryFn<typeof IconGrid> = (args) => (
  <Shell>
    <IconGrid {...args} />
  </Shell>
);
ThreeColumnsSixItems.args = {
  items: sixItems,
  columnsPerRow: 3,
};
ThreeColumnsSixItems.storyName = "3 columns (6 items → 2 rows)";

export const TwoColumnsSixItems: StoryFn<typeof IconGrid> = (args) => (
  <Shell>
    <IconGrid {...args} />
  </Shell>
);
TwoColumnsSixItems.args = {
  items: sixItems,
  columnsPerRow: 2,
};
TwoColumnsSixItems.storyName = "2 columns (6 items → 3 rows)";

export const FourColumnsSixItems: StoryFn<typeof IconGrid> = (args) => (
  <Shell>
    <IconGrid {...args} />
  </Shell>
);
FourColumnsSixItems.args = {
  items: sixItems,
  columnsPerRow: 4,
};
FourColumnsSixItems.storyName = "4 columns (6 items → 2 rows)";

export const StaticItem: StoryFn<typeof IconGrid> = (args) => (
  <Shell>
    <IconGrid {...args} />
  </Shell>
);
StaticItem.args = {
  items: [
    {
      id: "a",
      label: "Display\nonly",
      icon: <BankIcon aria-hidden />,
    },
  ],
  columnsPerRow: 4,
};
