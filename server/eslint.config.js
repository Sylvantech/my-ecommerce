const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Node.js specific rules
      "no-console": "warn",
      "no-process-exit": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // General good practices
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      // Async/await best practices
      "require-await": "error",
      "no-return-await": "error",
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.mocha,
      },
    },
    rules: {
      "no-console": "off", // Allow console in tests
    },
  },
];
