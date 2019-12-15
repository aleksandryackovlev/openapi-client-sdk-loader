import { getOptions } from 'loader-utils';

import { validate as validateOptions, normalize as normalizeOptions } from './options';
import format from './format';
import compileTemplate from './templates';

export const raw = true;

export default function loader() {
  const callback = this.async();
  const options = normalizeOptions(getOptions(this));

  try {
    validateOptions(options);
  } catch (error) {
    return callback(error);
  }

  // TODO: addDependencies for watching yaml doc files
  // TODO: validate open api schema

  return options.parser.bundle(this.resourcePath, (error, api) => {
    if (error) {
      return callback(error);
    }

    return options
      .compiler(api, options)
      .then((result) => compileTemplate(result, options.template))
      .then((result) => callback(null, format(result, options)))
      .catch((compilationError) => callback(compilationError));
  });
}
