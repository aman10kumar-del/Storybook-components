const CompressionPlugin = require('compression-webpack-plugin');

// const getCompressionOptions = () => new CompressionPlugin({
//   test: /\.(js|css)$/,
//   exclude: /\b(precache)\b/,
//   filename: '[file]',
//   minRatio: Infinity,
//   algorithm: 'gzip',
//   deleteOriginalAssets: true,
// });

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/pods-components/**/*.stories!(.old).@(js|jsx|ts|tsx)",
    "../src/stories-common/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/preset-scss',
    '@jeysal/storybook-addon-css-user-preferences',
    '@storybook/addon-a11y',
    "@storybook/addon-mdx-gfm"
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  },
  webpackFinal: async (config, { configType, ...rest }) => {
    // adding svg support
    const fileLoaderRule = config.module.rules.find(
      (rule) => !Array.isArray(rule.test) && rule.test.test(".svg"),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });
    if (configType === "PRODUCTION") {
      // gzip
      // config.plugins.push(getCompressionOptions());
    }
    return config;
  },
  docs: {
    autodocs: true
  }
}