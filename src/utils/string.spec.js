import { capitalize, basepath } from './string';

describe('utils', () => {
  describe('string:capitalize', () => {
    it('should capitalize the given string', async () => {
      expect(capitalize('some string')).toBe('Some string');
    });
  });

  describe('string:basepath', () => {
    it('should return the basepath of the given string', async () => {
      expect(basepath('/test/some/case')).toBe('case');
    });

    it('should return the given string if there are no / in it', async () => {
      expect(basepath('case')).toBe('case');
    });
  });
});
