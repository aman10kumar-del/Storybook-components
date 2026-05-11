import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import SearchPlansWithFilter from "./SearchPlansWithFilter";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import storyStyles from "./SearchPlansWithFilter.stories.module.scss";

const DOCS = `
**Layout:** Same pattern as **PODS Components - New / EnterMobileNumber** — full width of the **content column**, pill search (**\`unit-13\`** height, **\`radius-max\`**), trailing **Filter** column (**52px**, icon + subtext), **not** inside **Card**.

**Tokens:** Spacing, radius, **\`body-bold\`** input, semantic colors; focus ring via **\`outline\`** + **\`--border-primary-strong\`** (same focus-token note as Enter mobile).

**Add Figma:** Replace the placeholder link below when the Gen-AI standardisation frame for this control exists.
`;

const meta: Meta<typeof SearchPlansWithFilter> = {
  title: "PODS Components - New/SearchPlansWithFilter",
  component: SearchPlansWithFilter,
  parameters: {
    docs: {
      description: {
        component: `${getFigmaLinkHTML(
          "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI",
          "Figma file (node TBD)",
        )}${DOCS}`,
      },
    },
  },
};

export default meta;

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={storyStyles.contentArea}>{children}</div>
);

const Template: StoryFn<typeof SearchPlansWithFilter> = (args) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <Shell>
      <SearchPlansWithFilter
        {...args}
        value={value}
        onChange={(v) => {
          action("onChange")(v);
          setValue(v);
        }}
      />
    </Shell>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: "",
  onFilterClick: action("onFilterClick"),
};

export const WithQuery = Template.bind({});
WithQuery.args = {
  value: "Unlimited 5G",
  onFilterClick: action("onFilterClick"),
  onClear: action("onClear"),
};

export const FilterActive = Template.bind({});
FilterActive.args = {
  value: "",
  filterActive: true,
  onFilterClick: action("onFilterClick"),
};

export const NoFilterColumn = Template.bind({});
NoFilterColumn.args = {
  value: "",
  showFilter: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "Family plan",
  disabled: true,
  onFilterClick: action("onFilterClick"),
};

export const Loading = Template.bind({});
Loading.args = {
  value: "",
  loading: true,
  onFilterClick: action("onFilterClick"),
};

export const WithError = Template.bind({});
WithError.args = {
  value: "",
  error: "Something went wrong. Try again.",
  onFilterClick: action("onFilterClick"),
};

export const WithAssistive = Template.bind({});
WithAssistive.args = {
  value: "",
  assistiveText: "Search by plan name or benefit",
  error: "",
  onFilterClick: action("onFilterClick"),
};

export const NoClearButton = Template.bind({});
NoClearButton.args = {
  value: "Annual",
  showClearButton: false,
  onFilterClick: action("onFilterClick"),
};
