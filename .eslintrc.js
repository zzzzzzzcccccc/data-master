const IGNORE = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    'dist',
    'node_modules',
    'rollup.config.js',
    'index.d.ts',
    'db-global.d.ts',
    '.eslintrc.js',
    '__mocks__',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['prettier', '@typescript-eslint', 'react', 'react-hooks'],
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
  rules: {
    'prettier/prettier': ERROR,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARNING,
  },
  overrides: [
    {
      files: ['packages/client/src/database-clients/database-client.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': IGNORE,
      },
    },
  ],
}
