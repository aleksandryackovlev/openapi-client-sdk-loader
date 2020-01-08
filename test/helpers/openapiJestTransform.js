const path = require('path');

const { transform } = require('@babel/core');
const jestPreset = require('babel-preset-jest');

const deasync = require('deasync');
const crypto = require('crypto');
const SwaggerParser = require('swagger-parser');

const format = require('../../dist/format').default;
const compileTemplate = require('../../dist/templates').default;
const compiler = require('../../dist/compile/js').default;

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
    deasync.sleep(100);
  }

  if (error) {
    throw error;
  }

  return result;
};

const options = {
  compiler,
  template: path.resolve(__dirname, '../../dist/templates/js'),
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

const compileJsSdk = async (filename, source) => {
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
    return crypto
      .createHash('md5')
      .update(src)
      .digest('hex');
  },
  process(src, filename) {
    const nextSrc = deasyncPromise(compileJsSdk(filename, src));

    const result = transform(nextSrc, {
      presets: [jestPreset],
    });

    return result ? result.code : nextSrc;
  },
};
