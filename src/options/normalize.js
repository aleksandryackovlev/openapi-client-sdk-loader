import path from 'path';
import { merge } from 'lodash';

import compilers from '../compile';

import defaultOptions from './default_options';

export default (options) => {
  const resultOptions = merge({}, defaultOptions, options);

  if (resultOptions.compiler && typeof resultOptions.compiler === 'string') {
    resultOptions.template =
      path.resolve(__dirname, `../templates/${resultOptions.compiler}`) || null;
    resultOptions.compiler = compilers[resultOptions.compiler] || null;
  }

  return resultOptions;
};
