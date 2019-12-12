import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

import SwaggerParser from 'swagger-parser';
import { format } from 'json-schema-to-typescript/dist/src/formatter';

import { defaultOptions } from './utils/schema2typescript';

import { compileModels, compileRuntime, compileApis } from './compile';
import schema from './options.json';

export const raw = true;

export default function loader() {
  const callback = this.async();

  const options = getOptions(this) || {};

  validateOptions(schema, options, 'Loader');

  SwaggerParser.parse(this.resourcePath, (err, api) =>
    Promise.all([
      compileModels(api, options),
      compileRuntime(api, options),
      compileApis(api, options),
    ]).then((results) => {
      callback(null, format(results.join('\n'), defaultOptions));
    })
  ).catch((e) => callback(e, null));
}
