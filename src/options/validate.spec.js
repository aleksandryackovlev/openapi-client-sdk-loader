import validate from './validate';

describe('options', () => {
  describe('validate', () => {
    it('should throw an error if a compiler is not specified', async () => {
      const options = {
        parser: () => Promise.resolve(''),
        template: __dirname,
      };

      const validateOptions = () => validate(options);
      expect(validateOptions).toThrow('The specified compiler does not exist');
    });

    it('should throw an error if a compiler is not a function', async () => {
      const options = {
        parser: () => Promise.resolve(''),
        template: __dirname,
        compiler: 'test',
      };

      const validateOptions = () => validate(options);
      expect(validateOptions).toThrow('The specified compiler does not exist');
    });

    it('should throw an error if a template directory does not exist', async () => {
      const options = {
        parser: () => Promise.resolve(''),
        template: '/fjkljfdl/fdfdl',
        compiler: () => Promise.resolve(''),
      };

      const validateOptions = () => validate(options);
      expect(validateOptions).toThrow('The specified template directory does not exist');
    });

    it('should throw an error if a template directory is not set', async () => {
      const options = {
        parser: () => Promise.resolve(''),
        compiler: () => Promise.resolve(''),
      };

      const validateOptions = () => validate(options);
      expect(validateOptions).toThrow('The specified template directory does not exist');
    });

    it('should throw an error if a parser is not specified', async () => {
      const options = {
        compiler: () => Promise.resolve(''),
        template: __dirname,
      };

      const validateOptions = () => validate(options);
      expect(validateOptions).toThrow('The specified parser does not exist');
    });

    it('should throw an error if a parser is not a function', async () => {
      const options = {
        parser: 'test',
        compiler: () => Promise.resolve(''),
        template: __dirname,
      };

      const validateOptions = () => validate(options);
      expect(validateOptions).toThrow('The specified parser does not exist');
    });
  });
});
