import compileModels from './compileModels';
import compileOperations from './compileOperations';

const compileInfo = (api) => {
  return Promise.resolve({
    server: api.servers ? api.servers[0].url : '',
  });
};

export default (api, options) => {
  return Promise.all([
    compileModels(api, options),
    compileOperations(api, options),
    compileInfo(api, options),
  ]).then(([models, operations, info]) => ({
    models,
    operations,
    info,
  }));
};
