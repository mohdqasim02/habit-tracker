module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },

  rules: {
    'semi': ['error', 'always'],
    'quotes': ['warn', 'single'],
    'prefer-const': ['error'],
    'no-use-before-define': ['error'],
    'no-this-before-super': ['error'],
    'complexity': ['error', { max: 5 }],
    'max-statements': ['error', 15],
    'max-params': ['error', { max: 4 }],
    'no-const-assign': 'error',
    'no-else-return': 'error',
    'object-shorthand': 'error',
    'array-callback-return': ['error'],
    'prefer-template': 'warn',
    'func-style': ['error', 'expression'],
    'prefer-rest-params': 'error',
    'for-direction': 'error',
    'no-cond-assign': 'error',
    'id-length': [
      'error',
      {
        min: 2, max: 24,
        exceptions:
          ['a', 'b', 'x', 'y', 'z', 'id', '#id', 'cb', '_']
      },
    ],
  },
};