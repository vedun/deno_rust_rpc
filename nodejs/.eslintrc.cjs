module.exports = {
  env: {
    browser: true,
    es6: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off', // TODO: fix code to follow this rule
    '@typescript-eslint/explicit-module-boundary-types': 'off', // TODO: fix code to follow this rule
    '@typescript-eslint/require-await': 'off', // TODO: fix code to follow this rule
    '@typescript-eslint/no-unsafe-member-access': 'off', // TODO: fix code to follow this rule
    '@typescript-eslint/no-unsafe-assignment': 'off', // TODO: fix code to follow this rule
    '@typescript-eslint/no-floating-promises': 'off', // TODO: fix code to follow this rule
    '@typescript-eslint/no-unused-vars': 'off', // TODO: fix code to follow this rule
    '@typescript-eslint/no-explicit-any': 'off', // TODO: fix code to follow this rule
  },
};
