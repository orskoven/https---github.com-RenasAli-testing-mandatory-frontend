import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Override for Cypress folder
    files: ["cypress/**/*.js"],
    rules: {
      "no-undef": "off", // Disable 'no-undef' for Cypress files
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
