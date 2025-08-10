/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  // This is the single most important change.
  // It bundles all the necessary plugins and configurations for Next.js,
  // including React, React Hooks, JSX-A11y, and TypeScript.
  extends: ["next/core-web-vitals", "plugin:prettier/recommended"],
  plugins: ["@tanstack/query", "unused-imports"],
  rules: {
    // --- Your Custom Rules (Kept from your original file) ---

    // Allows you to have unused variables that start with an underscore "_"
    "no-unused-vars": "off", // Must be off for the "unused-imports" rule to work
    "@typescript-eslint/no-unused-vars": "off", // Must be off for the "unused-imports" rule to work
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    
    // Allows the use of `any` type.
    "@typescript-eslint/no-explicit-any": "off",

    // Enforce `import type` for type-only imports
    "@typescript-eslint/consistent-type-imports": "warn",

    // Disallows `console.log` in production builds. It will show a warning in development.
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // --- Rules Covered by `next/core-web-vitals`, no longer needed to be set manually ---
    // "react/display-name": "off", // Covered by Next.js config
    // "react/react-in-jsx-scope": "off", // Covered by Next.js config
    // "react/prop-types": "off", // Not needed in TypeScript projects

    // --- TanStack Query Recommended Rules ---
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",
  },
  // Overrides for specific file types if needed in the future
  // "overrides": [],
};
