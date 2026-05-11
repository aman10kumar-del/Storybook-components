/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import svgr from "vite-plugin-svgr";
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const paytmSrc = path.resolve(dirname, "paytm-common-storybook/src/index.ts");

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/paytm-common-storybook/**/*.svg",
      svgrOptions: {
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  resolve: {
    alias: [
      // Subpath must not use the `src/index.ts` mapping (avoids `index.ts/icons`).
      {
        find: "@paytm-h5-common/paytm_common_ui/icons",
        replacement: path.resolve(
          dirname,
          "node_modules/@paytm-h5-common/paytm_common_ui/dist/icons/index.js",
        ),
      },
      {
        find: "@paytm-h5-common/paytm_common_ui",
        replacement: paytmSrc,
      },
    ],
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook'),
        storybookUrl: 'http://localhost:6010',
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});