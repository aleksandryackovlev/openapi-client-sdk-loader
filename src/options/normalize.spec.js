import compilers from '../compile';

import normalize from './normalize';

describe('options', () => {
  describe('normalize', () => {
    it('should replace string compiler option with the according compiler function', async () => {
      const normalizedOptions = normalize({
        compiler: 'ts',
      });

      expect(normalizedOptions.compiler).toBe(compilers.ts);
    });

    it('should remove string compiler option if the according compiler function does not exist', async () => {
      const normalizedOptions = normalize({
        compiler: 'abracadabra',
      });

      expect(normalizedOptions.compiler).toBe(null);
    });
  });
});
