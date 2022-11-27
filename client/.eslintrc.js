module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    // 'prettier/@typescript-eslint',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-trailing-spaces': 'warn',
    'no-console': 'off',
    // 'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    // 'react/jsx-one-expression-per-line': 'off',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier', // should always be last
  ],
};
