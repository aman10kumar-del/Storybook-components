import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/**
 * Global CSS order matches Storybook:
 * - `paytm-common-storybook/.storybook/preview.js` (webpack Storybook)
 * - `.storybook/preview.ts` (root Vite Storybook)
 *
 * 1) index.css — fonts, html/body base, normalize bits
 * 2) variables.css — semantic CSS variables (:root + dark media)
 * 3) pods-theme-forced — WGMI explicit light/dark via data-pods-theme (after tokens)
 */
import "../paytm-common-storybook/src/commonStyles/sass-generated/index.css";
import "../paytm-common-storybook/src/commonStyles/sass-generated/variables.css";
import "./pods-theme-forced.css";
import "@paytm-h5-common/paytm_common_ui";
import App from "./App.tsx";
import "./index.css";
import { syncPodsThemeFromStorage } from "./syncPodsTheme";

syncPodsThemeFromStorage();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
