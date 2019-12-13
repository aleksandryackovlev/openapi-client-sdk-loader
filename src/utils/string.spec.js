import { capitalize, basepath, dashes2capitals } from './string';

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

  describe('string:dashes2capitals', () => {
    it('should return the capitalized version of the given dashed string', async () => {
      expect(dashes2capitals('-test-some--case')).toBe('TestSomeCase');
    });

    it('should return the given string capitalized if there are no - in it', async () => {
      expect(dashes2capitals('case')).toBe('Case');
    });
  });
});
