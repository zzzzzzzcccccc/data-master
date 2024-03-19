const IGNORE = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['dist', 'node_modules'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
