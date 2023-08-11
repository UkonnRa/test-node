/**
 * @type {import('@types/eslint').Linter.Config}
 */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "plugin:sonarjs/recommended", "prettier"],
  settings: {
    typescript: true,
    node: true,
  },
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
