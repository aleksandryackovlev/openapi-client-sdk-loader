import compileModels from './compileModels';
import compileOperations from './compileOperations';

export default (api, options) => {
  return Promise.all([compileModels(api, options), compileOperations(api, options)]).then(
    ([models, operations]) => ({
      models,
      operations,
      info: {
        server: api.servers ? api.servers[0].url : '',
      },
    })
  );
};
