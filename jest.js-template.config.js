module.exports = {
  testMatch: ['**/(src|test)/**/*.(spec|test).codegen.js'],
  transform: {
    '\\.(yaml)$': '<rootDir>/test/helpers/openapiJestTransform.js',
    '\\.(js)$': 'babel-jest',
  },
  automock: false,
  setupFiles: ['<rootDir>/setupJest.js'],
};
