import eslintConfigPrettier from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import eslint from "@eslint/js";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist"],
  },

  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      perfectionist.configs["recommended-line-length"],
      eslintConfigPrettier,
    ],

    files: ["**/*.{ts,tsx}"],

    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
        projectService: true,
      },

      globals: globals.browser,
      ecmaVersion: "latest",
    },

    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      react,
    },

    settings: {
      react: { version: "detect" },
    },

    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      // React
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react/no-unescaped-entities": 0,

      // TS
      "@typescript-eslint/array-type": ["error", { default: "array-simple", readonly: "array-simple" }],
      "@typescript-eslint/no-confusing-void-expression": 0,

      // Perfectionist
      "perfectionist/sort-modules": "off",
    },
  },
);
