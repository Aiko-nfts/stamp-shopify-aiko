module.exports = {
  extends: [
    'plugin:hydrogen/hydrogen',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'react/jsx-uses-vars': 2,
    'react/prop-types': 2,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
