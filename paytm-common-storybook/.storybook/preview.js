import {
  Title,
  Subtitle,
  Description,
  PureArgsTable,
  Source,
  Stories,
  Primary,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

import '../src/commonStyles/sass-generated/index.css';
import '../src/commonStyles/sass-generated/variables.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Primary />
        <h3>Props</h3>
        <PureArgsTable story={PRIMARY_STORY} />
        <Stories />
      </>
    ),
  },
  options: {
    storySort: {
      order: ["Introduction", "PODS Components", "PODS Colors",  "PODS Typography", "PODS Icons", "Paytm UI Components"],
    },
  },
}