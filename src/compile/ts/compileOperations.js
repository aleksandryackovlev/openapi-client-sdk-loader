import { cloneDeep } from 'lodash';

import { schema2typescript, basepath, dashes2capitals, capitalize } from '../../utils';

import { compile } from './compileModels';

const prepareMimeType = (mimeType) => dashes2capitals(basepath(mimeType));

const createOperations = (api, deref) =>
  Promise.all(
    Object.keys(deref.paths).reduce((result, path) => {
      return [
        ...result,
        ...Object.keys(deref.paths[path]).map(async (method) => {
          const operation = deref.paths[path][method];
          const unrefedOperation = api.paths[path][method];

          let schema = {
            method: method.toUpperCase(),
            path,
            mimeType: 'application/json',
            name: operation.operationId,
          };

          if (operation.parameters) {
            const params = {};

            operation.parameters.forEach(({ name, in: inPath, required, schema: paramSchema }) => {
              const inName = inPath === 'path' ? 'params' : inPath;

              if (!params[inName]) {
                params[inName] = {
                  type: 'object',
                  required: [],
                  properties: {},
                };
              }

              params[inName].properties[name] = paramSchema;

              if (required) {
                params[inName].required.push(name);
              }
            });

            const models = await Promise.all(
              Object.keys(params).map((param) => {
                return schema2typescript(
                  params[param],
                  `${schema.name}${capitalize(param)}${param === 'header' ? 's' : ''}`
                );
              })
            );

            schema = { ...schema, ...params, models: models.join('\n') };
          }

          if (operation.requestBody) {
            const requestBody = operation.requestBody.content;

            const models = await compile(unrefedOperation.requestBody.content, (schemas, name) => [
              schemas[name].schema,
              `${schema.name}RequestBody${prepareMimeType(name)}`,
            ]);

            Object.keys(requestBody).forEach((mimeType, index, mimeTypes) => {
              schema.mimeType = mimeType;
              schema.mimeTypeSuffix = prepareMimeType(mimeType);
              schema.data = requestBody[mimeType].schema;
              if (index === mimeTypes.length - 1) {
                schema.models = schema.models ? `${schema.models}\n${models}` : models;
              }
            });
          }

          return schema;
        }),
      ];
    }, [])
  );

export default (api, options) =>
  options.parser.dereference(cloneDeep(api)).then((deref) => createOperations(api, deref));
