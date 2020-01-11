const path = require('path');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  moduleFileExtensions: ['js', 'ts', 'yaml'],
  rootDir: path.resolve(__dirname, '../..'),
  testMatch: ['<rootDir>/(src|test)/**/*.(spec|test).codegen.ts'],
  transform: {
    ...tsjPreset.transform,
    '\\.(yaml)$': ['<rootDir>/test/config/openapiTransformer.js', { compiler: 'ts' }],
    '\\.(js)$': 'babel-jest',
  },
  automock: false,
  setupFiles: ['<rootDir>/test/config/setup.js'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.json',
      diagnostics: false,
    },
  },
};
