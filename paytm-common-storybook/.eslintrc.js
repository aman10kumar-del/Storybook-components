module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["airbnb", "plugin:storybook/recommended"],
  rules: {
    "quotes": 0,
    "indent": 0,
    "import/extensions": 0,
    "no-tabs": 0,
    "semi": 0,
    "comma-dangle": 0,
    "arrow-body-style": 0,
    "arrow-parens": 0,
    "no-shadow": 0,
    "no-plusplus": 0,
    "no-unused-vars": ["error", { "args": "none" }] ,
    "func-names": [1, "as-needed"],

    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "peerDependencies": true, "devDependencies": true}],

    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    "react/jsx-indent": 0,
    "react/function-component-definition": [1, {
      "namedComponents": ["function-declaration", "function-expression", "arrow-function"],
      "unnamedComponents": ["function-expression", "arrow-function"]
    }],
    "react/jsx-indent-props": 0,
    "react/jsx-fragments": 0,

    "jsx-a11y/click-events-have-key-events": 0,
  },
  globals: {
    React: true
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx"],
        "moduleDirectory": ["src", "node_modules"]
      }
    }
  },
};