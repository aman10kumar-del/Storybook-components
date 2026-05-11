// import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import image from '@rollup/plugin-image';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import multiInput from 'rollup-plugin-multi-input';
import copy from 'rollup-plugin-copy'
import styles from "@ironkinoko/rollup-plugin-styles";
import del from 'rollup-plugin-delete'
import replace from '@rollup/plugin-replace';
import { createRequire } from 'module';
import importStyles from "./rollup-custom-plugins/importStyles.mjs";
import getIconPath from "./scripts/get-icon-path.js";

const require = createRequire(import.meta.url);
const packageJSON = require('./package.json');

const config = [
{
  input: "src/index.ts",
  output: [
    {
      dir: 'dist/commonComponents',
      format: "cjs",
    },
    {
      dir: 'dist/commonComponents-esm',
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: 'src',
      assetFileNames: "assets/[name][extname]"
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    styles({
      mode: ["extract"],
      autoModules: true,
      minimize: true,
      onExtract: (data) => {
        return !data.name.includes("module")
      },
    }),
    image(),
    url(),
    svgr({ icon: true }),
    importStyles(),
    replace({
      __pods_version__: packageJSON.version,
      __pods_mode__: "NPM",
      preventAssignment: true
    }),
  ],
  external: ["react", "react-dom", "@szhsin/react-menu"]
}, 
{
  input: "src/assets/ultra-icons/index.js",
  output: {
    dir: "dist/icons",
    format: "esm",
    preserveModules: true,
    entryFileNames: (chunkInfo) => {
      if (chunkInfo.name === 'index') return 'index.js';
      return getIconPath(chunkInfo.name.replace("assets/", "").replace("ultra-", "").replace(".svg", ".js")).finalPath
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    svgr(),
    copy({
      hook: "buildStart",
      targets: [
        { src: 'static/styles/*', dest: 'dist/styles' },
        { src: "src/commonStyles/sass-generated/index.css", dest: "dist/styles", rename: "index-common.css" },
        { src: "src/commonStyles/sass-generated/variables.css", dest: "dist/styles"},
        { src: "dist/commonComponents-esm/assets/pods-components/*", dest: "dist/styles" },
      ]
    }),
    del({
      hook: 'buildEnd',
      targets: [
        "dist/commonComponents/assets",
        "dist/commonComponents-esm/assets/pods-components",
        "dist/commonComponents-esm/assets/index.css",
      ]
    })
  ],
  external: ["react", "react-dom"]
}];

export default config;
