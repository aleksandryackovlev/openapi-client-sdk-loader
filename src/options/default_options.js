import path from 'path';

import SwaggerParser from 'swagger-parser';

export default {
  compiler: 'ts',
  template: path.resolve(__dirname, '../templates/ts'),
  parser: SwaggerParser,
  style: {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
  },
};
