import compileOperations from './compileOperations';

export default (api, options) => {
  return Promise.all([compileOperations(api, options)]).then(([operations]) => ({
    operations,
    info: {
      server: api.servers ? api.servers[0].url : '',
    },
  }));
};
