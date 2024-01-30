module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    'class-methods-use-this': 'off',
    'react/jsx-pascal-case': 'off',
    'no-plusplus': 'off',
    'no-debugger': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-return-await': 'off',
    'spaced-comment': 'off',
    'no-else-return': 'off',
    'react/no-array-index-key': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
};
