import { cloneDeep } from 'lodash';

import { parseParams, parseBody, parseResponses } from '../utils';

const createOperations = (api, deref) =>
  Promise.all(
    Object.keys(deref.paths).reduce((result, path) => {
      return [
        ...result,
        ...Object.keys(deref.paths[path]).map(async (method) => {
          const operation = deref.paths[path][method];

          let schema = {
            method: method.toUpperCase(),
            path,
            mimeType: 'application/json',
            name: operation.operationId,
          };

          if (operation.parameters) {
            schema = { ...schema, ...parseParams(operation.parameters) };
          }

          if (operation.requestBody) {
            schema = { ...schema, ...parseBody(operation.requestBody.content) };
          }

          if (operation.responses) {
            schema = { ...schema, ...parseResponses(operation.responses) };
          }

          return schema;
        }),
      ];
    }, [])
  );

export default (api, options) =>
  options.parser.dereference(cloneDeep(api)).then((deref) => createOperations(api, deref));
