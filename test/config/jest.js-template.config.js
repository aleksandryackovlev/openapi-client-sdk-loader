const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../..'),
  testMatch: ['<rootDir>/(src|test)/**/*.(spec|test).codegen.js'],
  transform: {
    '\\.(yaml)$': ['<rootDir>/test/config/openapiTransformer.js', { compiler: 'js' }],
    '\\.(js)$': 'babel-jest',
  },
  automock: false,
  setupFiles: ['<rootDir>/test/config/setup.js'],
};
