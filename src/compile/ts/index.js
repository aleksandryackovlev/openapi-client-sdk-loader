import compileModels from './compileModels';

const compileRuntime = async () => 'const runtime = "runtime line";';
const compileApis = async () => 'const apis = "apis line";';

export default (api, options) => {
  return Promise.all([
    compileModels(api, options),
    compileRuntime(api, options),
    compileApis(api, options),
  ]).then((results) => {
    return results.join('\n');
  });
};
