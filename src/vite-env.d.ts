/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for PODS Storybook (`npm run storybook`, default port 6010). */
  readonly VITE_STORYBOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
