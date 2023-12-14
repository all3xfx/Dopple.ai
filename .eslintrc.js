/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "18.2.0",
    },
  },
  extends: [
    "plugin:prettier/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    // "plugin:@next/next/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["@tanstack/query", "prettier", "unused-imports"],
  rules: {
    /**
     * We don't want any unused vars starting with "_" to be claimed as unused vars.
     */
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
    /**
     * Turn of the need for display names for react components.
     * Especially when writing page components (Next.js), this is
     * extremly bugging.
     */
    "react/display-name": "off",
    /**
     * We don't want to have the react import in each file. Typescript is
     * handling this for us.
     */
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "warn",
    /**
     * Enforce that we do not have any `console.log`'s in the code.
     */
    "no-console": "error",
    /**
     * We need to disable those, because typescript parser needs to long for monorepo.
     */
    "import/named": "off",
    "import/no-unresolved": "off",
    /**
     * Custom rules, that are not covered by "recommended".
     */
    "import/first": "error",
    "import/newline-after-import": "error",
    /**
     * This makes it easier to use the auto-import function of the typescript
     * lsp.
     */
    "import/no-anonymous-default-export": "warn",
    /**
     * Add a warning for multiple a11y things.
     */
    "jsx-a11y/alt-text": [
      "warn",
      // This is needed for next's `Image` component.
      {
        elements: ["img"],
        img: ["Image"],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
};
