import compileModels from './compileModels';

const createOperations = (api, deref) => {
  const operations = [];

  Object.keys(deref.paths).forEach((path) => {
    Object.keys(deref.paths[path]).forEach((method) => {
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

        schema = { ...schema, ...params };
      }

      if (operation.requestBody) {
        const requestBody = operation.requestBody.content;

        Object.keys(requestBody).forEach((mimeType) => {
          schema.mimeType = mimeType;
          schema.data = requestBody[mimeType].schema;
        });
      }

      operations.push(schema);
    });
  });

  return operations;
};

const compileApis = (api, options) =>
  options.parser.dereference(api).then((deref) => createOperations(api, deref));

export default (api, options) => {
  return Promise.all([compileModels(api, options), compileApis(api, options)]).then(
    ([models, operations]) => ({
      models,
      operations,
    })
  );
};
