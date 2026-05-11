import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import FABFloatingExtendedMini from "../FABFloatingExtendedMini";
import { getFigmaLinkHTML } from "../../../stories-common/utils";
import { ReactComponent as HomeIcon } from "../../../assets/ultra-icons/system/category/home.svg";
import { ReactComponent as ScanQrIcon } from "../../../assets/ultra-icons/system/category/scan_qr_code.svg";
import { ReactComponent as CashbackIcon } from "../../../assets/ultra-icons/system/category/cashback.svg";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-7257";

const postPaymentItems = [
  {
    id: "home",
    ariaLabel: "Home",
    icon: <HomeIcon aria-hidden />,
  },
  {
    id: "scan",
    ariaLabel: "Scan QR",
    icon: <ScanQrIcon aria-hidden />,
  },
  {
    id: "cashback",
    ariaLabel: "Cashback",
    icon: <CashbackIcon aria-hidden />,
  },
];

const meta: Meta<typeof FABFloatingExtendedMini> = {
  title: "PODS Components/FAB/Floating extended mini",
  component: FABFloatingExtendedMini,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — FAB floating extended mini (252:7257)")}

**Use:** Post-payment and similar flows — extra entry points without sending users back through the main nav. Which actions appear is **screen-specific**; pass \`items\` from the page.

**Docked:** Default \`docked\` pins the pill to the **bottom centre** of the viewport (with safe-area inset). Set \`docked={false}\` when a layout shell positions the bar.`,
      },
    },
  },
};

export default meta;

export const DockedBottomCentre: StoryFn<typeof FABFloatingExtendedMini> = (
  args,
) => (
  <div
    style={{
      minHeight: "240px",
      background: "var(--surface-level-4, #e8e8e8)",
      position: "relative",
    }}
  >
    <p
      style={{
        padding: 24,
        margin: 0,
        fontSize: 14,
        color: "var(--text-neutral-moderate, #666)",
      }}
    >
      Scroll area / receipt content — FAB stays fixed to the viewport bottom
      centre.
    </p>
    <FABFloatingExtendedMini
      {...args}
      items={postPaymentItems}
      onItemClick={(id) => action("onItemClick")(id)}
    />
  </div>
);
DockedBottomCentre.storyName = "Docked — bottom centre (default)";

export const UndockedInLayout: StoryFn<typeof FABFloatingExtendedMini> = (
  args,
) => (
  <div
    style={{
      minHeight: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: 24,
      background: "var(--surface-level-4, #e8e8e8)",
      boxSizing: "border-box",
    }}
  >
    <FABFloatingExtendedMini
      {...args}
      docked={false}
      items={postPaymentItems}
      onItemClick={(id) => action("onItemClick")(id)}
    />
  </div>
);
UndockedInLayout.storyName = "Undocked — parent handles position";
