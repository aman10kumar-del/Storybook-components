import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import BrandBand from "./BrandBand";
import { getFigmaLinkHTML } from "../../stories-common/utils";

export default {
  title: "PODS Components/BrandBand",
  component: BrandBand,
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=1053-8702&t=5qh1QlnU69kdftap-0")
      }
    }
  },
} as Meta<typeof BrandBand>;

const Template: StoryFn<typeof BrandBand> = (args) => (
  <BrandBand {...args} />
);

export const Default = Template.bind({});
