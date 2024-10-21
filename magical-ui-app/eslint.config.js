import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    // Base configuration for JavaScript files
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    "overrides": [
          {
            "files": ["cypress/*.cy.js"], // Or *.test.js
            "rules": {
              "no-undef": "off"
            }
          }
        ]
  },
  // Include the recommended configurations after the overrides
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
