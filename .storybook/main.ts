import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../paytm-common-storybook/src/pods-components/**/*.stories.@(js|jsx|ts|tsx)',
    '../paytm-common-storybook/src/stories-common/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        svgr({
          include: '**/paytm-common-storybook/**/*.svg',
          svgrOptions: {
            exportType: 'named',
            namedExport: 'ReactComponent',
          },
        }),
      ],
    });
  },
};
export default config;