import { getRunner, getRunnerResult } from './helpers';

describe('loader', () => {
  it('should work', async () => {
    const runner = getRunner('petstore.yaml');
    const stats = await runner();

    expect(getRunnerResult(stats)).toMatchSnapshot('runner_result');
  });
});
