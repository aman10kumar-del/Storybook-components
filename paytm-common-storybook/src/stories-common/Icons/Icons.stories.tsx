import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import {
  Title,
  Subtitle,
  Description,
} from '@storybook/addon-docs/blocks';

import Icons from "./Icons";
import { getFigmaLinkHTML } from "../utils";

export default {
  title: "PODS Icons/Icons",
  component: Icons,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <label>All icons are exported as React Components. You can directly use them as just any other React Component</label>
          <br />
          <br />
          <h5>Note</h5>
          <p>If you are not using any of the pods components and just using the icon set, then please add the below import in your entry file</p>
          <code style={{
            padding: '20px',
            background: 'lightgray',
            display: "block",
            width: "100%"
          }}>
            import "@paytm-h5-common/paytm_common_ui/styles/variables.css"
          </code>
        </>
      ),
    },
  },
} as Meta<typeof Icons>;

const Template: StoryFn<typeof Icons> = (args) => (
  <Icons {...args} />

);

export const Default = Template.bind({});
