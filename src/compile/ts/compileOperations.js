import { schema2typescript, capitalize } from '../../utils';

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

            Object.keys(requestBody).forEach((mimeType) => {
              schema.mimeType = mimeType;
              schema.data = requestBody[mimeType].schema;
            });
          }

          return schema;
        }),
      ];
    }, [])
  );

export default (api, options) =>
  options.parser.dereference(api).then((deref) => createOperations(api, deref));
