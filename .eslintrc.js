module.exports = {
  extends: ['airbnb', 'plugin:flowtype/recommended', 'prettier', 'prettier/react'],
  plugins: ['flowtype', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'class-methods-use-this': 'off',
    'flowtype/boolean-style': [2, 'boolean'],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': 'off',
    'no-template-curly-in-string': 'off',
    'no-underscore-dangle': 'off',
    'dot-notation': 'off',
    'prettier/prettier': ['error'],
    'react/forbid-prop-types': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 0,
    'flowtype/space-after-type-colon': 0,
    'react/require-default-props': 0,
  },
  globals: {
    document: true,
    window: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['types'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
};
