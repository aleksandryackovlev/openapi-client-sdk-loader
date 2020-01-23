const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../..'),
  testMatch: ['<rootDir>/(src|test)/**/*.(spec|test).codegen.js'],
  transform: {
    '\\.(yaml)$': ['<rootDir>/test/config/openapiTransformer.js', { compiler: 'js' }],
    '\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(object-to-formdata)/)'],
  automock: false,
  setupFiles: ['<rootDir>/test/config/setup.js'],
};
