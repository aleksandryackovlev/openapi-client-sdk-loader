import compileModels from './compileModels';

const compileRuntime = async () => 'const runtime = "runtime line";';

const createOperations = (api, deref) => {
  const operations = [];

  Object.keys(deref.paths).forEach((path) => {
    Object.keys(deref.paths[path]).forEach((method) => {
      const operation = deref.paths[path][method];

      let schema = {
        method,
        mimeType: 'application/json',
        name: operation.operationId,
      };

      if (operation.parameters) {
        const params = {};

        operation.parameters.forEach(({ name, in: inPath, required, schema: paramSchema }) => {
          if (!params[inPath]) {
            params[inPath] = {
              type: 'object',
              required: [],
              properties: {},
            };
          }

          params[inPath].properties[name] = paramSchema;

          if (required) {
            params[inPath].required.push(name);
          }
        });

        schema = { ...schema, ...params };
      }

      if (operation.requestBody) {
        const requestBody = operation.requestBody.content;

        Object.keys(requestBody).forEach((mimeType) => {
          schema.mimeType = mimeType;
          schema.body = requestBody[mimeType].schema;
        });
      }

      operations.push(schema);
    });
  });

  return operations;
};

const compileApis = (api, options) =>
  options.parser.dereference(api).then((deref) => {
    return JSON.stringify(createOperations(api, deref));
  });

export default (api, options) => {
  return Promise.all([
    compileModels(api, options),
    compileRuntime(api, options),
    compileApis(api, options),
  ]).then((results) => {
    return results.join('\n');
  });
};
