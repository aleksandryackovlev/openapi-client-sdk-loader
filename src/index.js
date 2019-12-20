import path from 'path';

import { getOptions } from 'loader-utils';

import { validate as validateOptions, normalize as normalizeOptions } from './options';
import format from './format';
import compileTemplate from './templates';

export const raw = true;

export default function loader(source) {
  const callback = this.async();
  const options = normalizeOptions(getOptions(this));

  const validExts = ['.yml', '.yaml'];

  if (!validExts.includes(path.extname(this.resourcePath))) {
    return callback(null, source);
  }

  try {
    validateOptions(options);
  } catch (error) {
    return callback(error);
  }

  // TODO: addDependencies for watching yaml doc files
  // TODO: validate open api schema
  // TODO: don't throw on invalid schema if option throwOnInvalidFile is set to false

  return options.parser.bundle(this.resourcePath, (error, api) => {
    if (error) {
      if (options.skipInvalid) {
        return callback(null, source);
      }

      return callback(error);
    }

    return options
      .compiler(api, options)
      .then((result) => compileTemplate(result, options))
      .then((result) => callback(null, format(result, options)))
      .catch((compilationError) => callback(compilationError));
  });
}
