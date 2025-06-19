import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: { "@typescript-eslint": ts, prettier },
    rules: {
      ...ts.configs.recommended.rules,
      "prettier/prettier": "error", // Enforce Prettier formatting
      "no-console": 'off', // Warn for console logs instead of error
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }, // Ignore unused variables with "_" prefix
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off", // Disable explicit return types enforcement
      "@typescript-eslint/ban-ts-comment": "off",
      quotes: ["error", "double"], // Enforce double quotes
      semi: ["error", "always"], // Require semicolons
      "prettier/prettier": ["error", { trailingComma: "all" }],
    },
  },
  prettierConfig,
];
