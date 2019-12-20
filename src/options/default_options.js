import path from 'path';

import SwaggerParser from 'swagger-parser';

export default {
  compiler: 'ts',
  template: path.resolve(__dirname, '../templates/ts'),
  templateOptions: {
    validateRequest: true,
    validateResponse: true,
  },
  parser: SwaggerParser,
  style: {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
  },
};
