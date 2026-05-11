import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import PaymentsContactGrid from "./PaymentsContactGrid";
import type { PaymentsContactGridItem } from "./PaymentsContactGrid";
import { getFigmaLinkHTML } from "../../stories-common/utils";

// @ts-ignore — story assets from Figma export
import picSukhi from "./story-assets/sukhi-1.jpg";
// @ts-ignore
import picAnjali from "./story-assets/anjali.jpg";
// @ts-ignore
import picRahul from "./story-assets/rahul.jpg";
// @ts-ignore
import picRadhika from "./story-assets/radhika.jpg";

const FIGMA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6710&m=dev";

const DOCS = `
**Layout:** CSS **Grid** — \`columnsPerRow\` defines \`repeat(n, 1fr)\`; items flow row-first. **Equal columns** across the card content width.

**Building blocks:** **Card**, **Avatar** (\`profile\` | \`initials\` + optional star | \`icon\` for “View all”). Labels use **subtext-regular**; initials use **title3-bold** override to match Figma 18/24.

**A11y:** One \`role="list"\` with \`role="listitem"\` cells. **View all** uses a clear default \`aria-label\` when it is a button. Optional \`onClick\` on any item renders a **button**; otherwise a non-interactive **div**.
`;

const makeDemoItems = (): PaymentsContactGridItem[] => [
  {
    id: "mumma",
    variant: "initials",
    label: "Mumma",
    initials: "M",
    initialsColor: "lavender",
    starBadge: true,
  },
  {
    id: "sukhi1",
    variant: "profile",
    label: "Sukhi Maid",
    imageURL: String(picSukhi),
  },
  {
    id: "anjali",
    variant: "profile",
    label: "Anjali Sinha",
    imageURL: String(picAnjali),
  },
  {
    id: "rahul",
    variant: "profile",
    label: "Rahul",
    imageURL: String(picRahul),
  },
  {
    id: "radhika",
    variant: "profile",
    label: "Radhika Gupta",
    imageURL: String(picRadhika),
  },
  {
    id: "sukhi2",
    variant: "initials",
    label: "Sukhi Maid",
    initials: "SM",
    initialsColor: "plum",
  },
  {
    id: "virat",
    variant: "initials",
    label: "Virat Kohli",
    initials: "VK",
    initialsColor: "frostedMint",
  },
  {
    id: "view-all",
    variant: "viewAll",
    label: "View All",
  },
];

const StoryShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      padding: 16,
      width: "100%",
      boxSizing: "border-box",
      background: "var(--surface-level-1, #f5f5f5)",
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof PaymentsContactGrid> = {
  title: "PODS Components - New/PaymentsContactGrid",
  component: PaymentsContactGrid,
  argTypes: {
    columnsPerRow: {
      control: { type: "number", min: 1, max: 8, step: 1 },
    },
  },
  args: {
    columnsPerRow: 4,
    items: makeDemoItems(),
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA, "Figma — Payments / Contact Grid (252:6710)")}${DOCS}`,
      },
    },
  },
};

export default meta;

const attachViewAllAction = (list: PaymentsContactGridItem[]) =>
  list.map((item) =>
    item.id === "view-all"
      ? { ...item, onClick: action("view all") }
      : item,
  );

export const Default: StoryFn<typeof PaymentsContactGrid> = (args) => (
  <StoryShell>
    <PaymentsContactGrid
      {...args}
      items={attachViewAllAction([...(args.items ?? makeDemoItems())])}
    />
  </StoryShell>
);
Default.storyName = "Default (4 columns)";

export const ThreeColumns: StoryFn<typeof PaymentsContactGrid> = (args) => (
  <StoryShell>
    <PaymentsContactGrid
      {...args}
      columnsPerRow={3}
      items={attachViewAllAction([...(args.items ?? makeDemoItems())])}
    />
  </StoryShell>
);
ThreeColumns.storyName = "3 columns";
