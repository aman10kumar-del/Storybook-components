import type { Preview } from '@storybook/react-vite';

import '../paytm-common-storybook/src/commonStyles/sass-generated/index.css';
import '../paytm-common-storybook/src/commonStyles/sass-generated/variables.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'PODS Components',
          'PODS Patterns',
          [
            'PODS Vertical flows',
            [
              'Travel',
              ['Flight home', 'Flight booking'],
            ],
            [
              'Payments',
              ['Trusted DoubleChecker — select contact'],
            ],
            [
              'Recharge & Utilities',
              ['Electricity bill payment'],
            ],
          ],
          'PODS Colors',
          'PODS Typography',
          'PODS Icons',
          'Paytm UI Components',
        ],
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;