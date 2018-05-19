module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
    'plugin:meteor/recommended',
    'plugin:vue/strongly-recommended',
  ],
  plugins: [
    'meteor',
  ],
  settings: {
    'import/core-modules': [
      'meteor/meteor',
      'meteor/tmeasday:publish-counts',
    ],
    'import/resolver': 'meteor',
  },
  'rules': {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-underscore-dangle': [ 'error', { allow: [ '_id' ] } ],
    'import/no-absolute-path': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'vue/attributes-order': 2,
    'vue/order-in-components': 2,
  }
};
