import { endsWith, cloneDeep } from 'lodash';
import { generate } from 'json-schema-to-typescript/dist/src/generator';
import { normalize } from 'json-schema-to-typescript/dist/src/normalizer';
import { optimize } from 'json-schema-to-typescript/dist/src/optimizer';
import { parse } from 'json-schema-to-typescript/dist/src/parser';
import { dereference } from 'json-schema-to-typescript/dist/src/resolver';
import { validate } from 'json-schema-to-typescript/dist/src/validator';
import { traverse } from 'json-schema-to-typescript/dist/src/utils';
import { ValidationError } from 'json-schema-to-typescript';

import format from '../format';

export const defaultOptions = {
  $refOptions: {},
  bannerComment: '',
  cwd: process.cwd(),
  declareExternallyReferenced: true,
  enableConstEnums: true,
  strictIndexSignatures: false,
  style: {
    bracketSpacing: false,
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: 'none',
    useTabs: false,
  },
  unreachableDefinitions: false,
};

/* eslint-disable no-param-reassign */
function hasType(schema, type) {
  return schema.type === type || (Array.isArray(schema.type) && schema.type.includes(type));
}
function isObjectType(schema) {
  return typeof schema.properties !== 'undefined' || hasType(schema, 'object');
}

function rule(schema) {
  if (schema.$ref && schema.$ref.includes('components/')) {
    const pathFragments = schema.$ref.split('/');
    delete schema.$ref;
    schema.tsType = pathFragments[pathFragments.length - 1];
  }

  if (!('additionalProperties' in schema) && isObjectType(schema)) {
    schema.additionalProperties = false;
  }
}

function normalizeRefs(schema, filename) {
  const clonedSchema = cloneDeep(schema);

  traverse(clonedSchema, (schemaToConvert) => rule(schemaToConvert, clonedSchema, filename));

  return clonedSchema;
}

async function compile(schema, name, options = defaultOptions) {
  const errors = validate(schema, name);

  if (errors.length) {
    // errors.forEach(_ => error(_));
    throw new ValidationError();
  }

  if (!endsWith(options.cwd, '/')) {
    options.cwd += '/';
  }

  return format(
    generate(
      optimize(parse(await dereference(normalize(normalizeRefs(schema), name), options), options)),
      options
    ),
    options
  );
}
/* eslint-enable no-param-reassign */

export default compile;
