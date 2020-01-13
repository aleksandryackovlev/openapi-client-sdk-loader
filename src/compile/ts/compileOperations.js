import { cloneDeep } from 'lodash';

import { schema2typescript, basepath, dashes2capitals, capitalize } from '../../utils';

import { compile } from './compileModels';

const prepareMimeType = (mimeType) => dashes2capitals(basepath(mimeType.split(';')[0]));

const getParams = (schemas) =>
  schemas.reduce((prevParams, { name, in: inPath, required, schema: paramSchema }) => {
    const inName = inPath === 'path' ? 'params' : inPath;
    const params = { ...prevParams };

    if (!params[inName]) {
      params[inName] = {
        type: 'object',
        required: [],
        properties: {},
        additionalProperties: false,
      };
    }

    params[inName].properties[name] = paramSchema;

    if (required) {
      params[inName].required.push(name);
    }

    return params;
  }, {});

const createOperations = (api, deref) =>
  Promise.all(
    Object.keys(deref.paths).reduce((result, path) => {
      return [
        ...result,
        ...Object.keys(deref.paths[path]).map(async (method) => {
          const operation = deref.paths[path][method];
          const unrefedOperation = api.paths[path][method];

          const globalSecurity = api.security;
          const localSecurity = operation.security;

          let schema = {
            method: method.toUpperCase(),
            path,
            mimeType: 'application/json',
            name: operation.operationId,
          };

          if (operation.parameters) {
            const params = getParams(operation.parameters);
            const models = await compile(params, (schemas, name) => [
              schemas[name],
              `${schema.name}${capitalize(name)}${name === 'header' ? 's' : ''}`,
            ]);

            schema = { ...schema, ...params, models };
          }

          schema.securityScheme = null;

          if (globalSecurity || localSecurity) {
            if (localSecurity) {
              schema.securityScheme = localSecurity
                .map((security) => Object.keys(security)[0])
                .map(
                  (securitySchema) =>
                    api.components &&
                    api.components.securitySchemes && {
                      name: securitySchema,
                      ...api.components.securitySchemes[securitySchema],
                    }
                )
                .filter(Boolean);
            } else {
              schema.securityScheme = globalSecurity
                .map((security) => Object.keys(security)[0])
                .map(
                  (securitySchema) =>
                    api.components &&
                    api.components.securitySchemes && {
                      name: securitySchema,
                      ...api.components.securitySchemes[securitySchema],
                    }
                )
                .filter(Boolean);
            }
          }

          if (operation.requestBody) {
            const requestBody = operation.requestBody.content;

            const models = await compile(operation.requestBody.content, (schemas, name) => [
              schemas[name].schema,
              `${schema.name}RequestBody${prepareMimeType(name)}`,
            ]);

            schema.models = schema.models ? `${schema.models}\n${models}` : models;

            // TODO: Support multiple Content-Types
            if (
              Object.keys(requestBody).some((mimeType) => mimeType.startsWith('application/json'))
            ) {
              const mimeType = Object.keys(requestBody).find((bodyMimeType) =>
                bodyMimeType.startsWith('application/json')
              );

              schema.mimeType = mimeType;
              schema.mimeTypeSuffix = prepareMimeType(mimeType);
              schema.data = requestBody[mimeType].schema;
            } else if (Object.keys(requestBody).length) {
              const mimeType = Object.keys(requestBody)[0];

              schema.mimeType = mimeType;
              schema.mimeTypeSuffix = prepareMimeType(mimeType);
              schema.data = requestBody[mimeType].schema;
            }
          }

          let responseModel = `export type ${capitalize(schema.name)}Response = unknown;`;

          // Support only 200 responses with the Content-Type application/json
          if (operation.responses && (operation.responses['200'] || operation.responses['201'])) {
            if (
              operation.responses['200'] &&
              operation.responses['200'].content &&
              operation.responses['200'].content['application/json']
            ) {
              responseModel = await schema2typescript(
                unrefedOperation.responses['200'].content['application/json'].schema,
                `${schema.name}Response`
              );

              schema.response = operation.responses['200'].content['application/json'].schema;
            } else if (
              operation.responses['201'] &&
              operation.responses['201'].content &&
              operation.responses['201'].content['application/json']
            ) {
              responseModel = await schema2typescript(
                unrefedOperation.responses['201'].content['application/json'].schema,
                `${schema.name}Response`
              );

              schema.response = operation.responses['201'].content['application/json'].schema;
            }
          }

          schema.models = schema.models ? `${schema.models}\n${responseModel}` : responseModel;

          return schema;
        }),
      ];
    }, [])
  );

export default (api, options) =>
  options.parser.dereference(cloneDeep(api)).then((deref) => createOperations(api, deref));
