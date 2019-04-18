const utils = require('./scripts/utils');

const modules = utils.getModuleAliases();

module.exports = {
  extends: [
    'standard',
    '@colony/eslint-config-colony',
    'plugin:flowtype/recommended',
    'eslint-config-airbnb/rules/react',
    'eslint-config-airbnb/rules/react-a11y',
  ],
  plugins: ['standard', 'react', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-var': 'error',
    'no-unused-vars': 1,
    'arrow-spacing': ['error', { before: true, after: true }],

    // options to emulate prettier setup
    semi: ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],

    // standard plugin - options
    'standard/object-curly-even-spacing': ['error', 'either'],
    'standard/array-bracket-even-spacing': ['error', 'either'],
    'standard/computed-property-even-spacing': ['error', 'even'],
    'standard/no-callback-literal': ['error', ['cb', 'callback']],

    // react plugin - options
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'flowtype/space-after-type-colon': 'off',
    'flowtype/require-valid-file-annotation': [
      'error',
      'always',
      {
        annotationStyle: 'block',
      },
    ],
    'max-len': [
      'error',
      {
        ignorePattern: '^import [^,]+ from |^export | implements',
        ignoreComments: true,
      },
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'always',
        json: 'always',
      },
    ],
    'react/default-props-match-prop-types': 'off',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.test.js', '.jsx'] },
    ],
    'react/jsx-wrap-multilines': 'off',
    'react/require-default-props': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
  settings: {
    'import/resolver': {
      alias: Object.keys(modules).map(key => [key, modules[key]]),
    }
  }
}