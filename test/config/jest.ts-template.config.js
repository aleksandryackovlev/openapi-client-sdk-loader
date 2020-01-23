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
  transformIgnorePatterns: ['node_modules/(?!(object-to-formdata)/)'],
  automock: false,
  setupFiles: ['<rootDir>/test/config/setup.js'],
  globals: {
    'ts-jest': {
      tsConfig: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'esnext'],
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
        noImplicitAny: true,
        allowSyntheticDefaultImports: true,
        forceConsistentCasingInFileNames: true,
        module: 'es6',
        moduleResolution: 'node',
        resolveJsonModule: true,
        jsx: 'react',
        experimentalDecorators: true,
      },
      diagnostics: false,
    },
  },
};
