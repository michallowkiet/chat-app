export default {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'prefer-const': 'error',
    'no-console': 'warn',
  },
  env: {
    node: true,
    es6: true,
  },
  ignorePatterns: ['node_modules', '.git', 'dist'],
};
