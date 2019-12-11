<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![cover][cover]][cover-url]
[![chat][chat]][chat-url]
[![size][size]][size-url]

# openapi-client-sdk-loader

Load client sdk from Open API documentation

## Getting Started

To begin, you'll need to install `openapi-client-sdk-loader`:

```console
$ npm install openapi-client-sdk-loader --save-dev
```

<!-- isLoader ? use(this) : delete(isPlugin) -->

Then add the loader to your `webpack` config. For example:

<!-- isPlugin ? use(this) : delete(isLoader) -->

Then add the plugin to your `webpack` config. For example:

**file.ext**

```js
import file from 'file.ext';
```

<!-- isLoader ? use(this) : delete(isPlugin) -->

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.ext$/,
        use: [
          {
            loader: `openapiclientsdk-loader`,
            options: { ...options },
          },
        ],
      },
    ],
  },
};
```

<!-- isPlugin ? use(this) : delete(isLoader) -->

**webpack.config.js**

```js
module.exports = {
  plugins: [
    new `OpenapiClientSdk`Plugin(options)
  ]
}
```

And run `webpack` via your preferred method.

## Options

### `[option]`

Type: `[type|other-type]`
Default: `[type|null]`

[ option description ]

<!-- isLoader ? use(this) : delete(isPlugin) -->

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        loader: `openapiclientsdk-loader`,
        options: {
          [option]: '',
        },
      },
    ],
  },
};
```

<!-- isPlugin ? use(this) : delete(isLoader) -->

**webpack.config.js**

```js
module.exports = {
  plugins: [
    new `OpenapiClientSdk`Plugin({
      [option]: ''
    })
  ]
};
```

## Examples

[ example outline text ]

**webpack.config.js**

```js
// Example setup here..
```

**file.ext**

```js
// Source code here...
```

**bundle.js**

```js
// Bundle code here...
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)

[npm]: https://img.shields.io/npm/v/openapi-client-sdk-loader.svg
[npm-url]: https://npmjs.com/package/openapi-client-sdk-loader
[node]: https://img.shields.io/node/v/openapi-client-sdk-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/webpack-contrib/openapi-client-sdk-loader.svg
[deps-url]: https://david-dm.org/webpack-contrib/openapi-client-sdk-loader
[tests]: https://dev.azure.com/webpack-contrib/openapi-client-sdk-loader/_apis/build/status/webpack-contrib.openapi-client-sdk-loader?branchName=master
[tests-url]: https://dev.azure.com/webpack-contrib/openapi-client-sdk-loader/_build/latest?definitionId=2&branchName=master
[cover]: https://codecov.io/gh/webpack-contrib/openapi-client-sdk-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/webpack-contrib/openapi-client-sdk-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=openapi-client-sdk-loader
[size-url]: https://packagephobia.now.sh/result?p=openapi-client-sdk-loader
