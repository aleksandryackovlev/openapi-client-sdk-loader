import path from 'path';

import SwaggerParser from 'swagger-parser';

export default {
  compiler: 'ts',
  template: path.resolve(__dirname, '../templates/ts'),
  templateOptions: {
    validateRequest: true,
    validateResponse: true,
    baseUrl: null,
  },
  parser: new SwaggerParser(),
  skipInvalid: true,
  style: {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
  },
};
