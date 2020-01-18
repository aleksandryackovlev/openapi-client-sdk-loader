import { cloneDeep, toPairs } from 'lodash';

import { schema2typescript, capitalize } from '../../utils';

import { parseParams, parseBody, parseResponses, prepareMimeType } from '../utils';

import { compile } from './compileModels';

const createOperations = (api, deref) =>
  Promise.all(
    Object.keys(deref.paths).reduce((result, path) => {
      return [
        ...result,
        ...Object.keys(deref.paths[path]).map(async (method) => {
          const operation = deref.paths[path][method];
          // const unrefedOperation = api.paths[path][method];

          let schema = {
            method: method.toUpperCase(),
            path,
            mimeType: 'application/json',
            name: operation.operationId,
          };

          if (operation.parameters) {
            const params = parseParams(operation.parameters);

            const models = await compile(params, (schemas, name) => [
              schemas[name],
              `${schema.name}${capitalize(name)}${name === 'header' ? 's' : ''}`,
            ]);

            schema = { ...schema, ...params, models };
          }

          if (operation.requestBody) {
            const models = await compile(operation.requestBody.content, (schemas, name) => [
              schemas[name].schema,
              `${schema.name}RequestBody${prepareMimeType(name)}`,
            ]);

            schema = {
              ...schema,
              ...parseBody(operation.requestBody.content),
              models: schema.models ? `${schema.models}\n${models}` : models,
            };
          }

          let responseModel = `export type ${capitalize(schema.name)}Response = unknown;`;

          if (operation.responses) {
            const resultResponses = parseResponses(operation.responses);

            let nextResponseModel = '';

            const models = await Promise.all(
              toPairs(resultResponses.responses).map(async ([statusCode, { response }]) => {
                if (response) {
                  const modelWithStatusCode = await schema2typescript(
                    response,
                    `${schema.name}Response${statusCode}`
                  );

                  nextResponseModel = `${nextResponseModel}${
                    nextResponseModel ? ' | ' : ''
                  }${capitalize(schema.name)}Response${statusCode}`;

                  return modelWithStatusCode;
                }

                return '';
              })
            );

            if (nextResponseModel) {
              responseModel = `export type ${capitalize(
                schema.name
              )}Response = ${nextResponseModel};`;
            }

            schema = {
              ...schema,
              ...resultResponses,
              models: schema.models
                ? `${schema.models}\n${models.join('\n')}\n${responseModel}`
                : `${models.join('\n')}\n${responseModel}`,
            };
          }

          return schema;
        }),
      ];
    }, [])
  );

export default (api, options) =>
  options.parser.dereference(cloneDeep(api)).then((deref) => createOperations(api, deref));
