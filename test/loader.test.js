// import fs from 'fs';

import {
  getRunner,
  compile,
  execute,
  getCompiler,
  getErrors,
  getWarnings,
  readAsset,
  getRunnerResult,
} from './helpers';

describe('loader', () => {
  it('should work', async () => {
    const runner = getRunner('petstore.yaml');
    const stats = await runner();

    // fs.writeFileSync(`${__dirname}/api.ts`, getRunnerResult(stats));
    expect(getRunnerResult(stats)).toMatchSnapshot('runner_result');
  });

  it('should work with ts-loader', async () => {
    const compiler = getCompiler('foo.ts');
    const stats = await compile(compiler);

    expect(execute(readAsset('main.bundle.js', compiler, stats))).toMatchSnapshot('result');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });
});
