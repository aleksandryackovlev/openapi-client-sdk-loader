import fs from 'fs';

import SwaggerParser from 'swagger-parser';

export default (options) => {
  if (!options.compiler || typeof options.compiler !== 'function') {
    throw new Error('The specified compiler does not exist');
  }

  if (!options.template || !fs.existsSync(options.template)) {
    throw new Error('The specified template directory does not exist');
  }

  if (!options.parser || !(options.parser instanceof SwaggerParser)) {
    throw new Error('The specified parser does not exist');
  }
};
