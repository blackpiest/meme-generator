module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'react'
  ],
  'rules': {
    'indent': ['warn', 2],
    'semi': 'warn',
    'semi-spacing': 'warn',
    'prefer-const': 'error',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true
      }
    ],
    'jsx-quotes': [
      2,
      'prefer-single'
    ],
    'camelcase': 'off',
    'max-len': [
      'warn',
      200
    ],
    'no-multiple-empty-lines': 'warn',
    'react/self-closing-comp': 'warn',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  'ignorePatterns': [
    'public/*',
    'node_modules/*',
    'tsconfig.json',
    'dist/*'
  ]
};
