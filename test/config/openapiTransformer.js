const path = require('path');

const { transform } = require('@babel/core');
const jestPreset = require('babel-preset-jest');
const typescriptPreset = require('@babel/preset-typescript');

const deasync = require('deasync');
const crypto = require('crypto');
const SwaggerParser = require('@apidevtools/swagger-parser');

const format = require('../../dist/format').default;
const compileTemplate = require('../../dist/templates').default;
const compilerJs = require('../../dist/compile/js').default;
const compilerTs = require('../../dist/compile/ts').default;

const deasyncPromise = (promise) => {
  let error = null;
  let result = null;
  let done = false;

  promise
    .then((resolvedResult) => {
      done = true;
      result = resolvedResult;
    })
    .catch((rejectReason) => {
      done = true;
      error = rejectReason;
    });

  while (!done) {
    deasync.sleep(200);
  }

  if (error) {
    throw error;
  }

  return result;
};

const compileSdk = async (filename, source, { compiler }) => {
  const options = {
    compiler: compiler === 'ts' ? compilerTs : compilerJs,
    template:
      compiler === 'ts'
        ? path.resolve(__dirname, '../../dist/templates/ts')
        : path.resolve(__dirname, '../../dist/templates/js'),
    templateOptions: {
      validateRequest: true,
      validateResponse: true,
    },
    parser: SwaggerParser,
    skipInvalid: true,
    style: {
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
    },
  };
  let api = '';

  try {
    api = await options.parser.bundle(filename);
  } catch (error) {
    if (options.skipInvalid) {
      return source;
    }

    throw error;
  }

  return options
    .compiler(api, options)
    .then((result) => compileTemplate(result, options))
    .then((result) => format(result, options));
};

module.exports = {
  getCacheKey(src) {
    return crypto.createHash('md5').update(src).digest('hex');
  },
  process(src, filename, options) {
    const compiler = options.globals && options.globals['ts-jest'] ? 'ts' : 'js';
    const nextSrc = deasyncPromise(compileSdk(filename, src, { compiler }));

    const result = transform(nextSrc, {
      filename: 'file.ts',
      presets: compiler === 'ts' ? [jestPreset, typescriptPreset] : [jestPreset],
    });

    return result ? result.code : nextSrc;
  },
};
