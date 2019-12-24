<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# openapi-client-sdk-loader

Load client sdk from Open API documentation

## Getting Started

To begin, you'll need to install `openapi-client-sdk-loader`:

```console
$ npm install openapi-client-sdk-loader --save-dev
```

<!-- isLoader ? use(this) : delete(isPlugin) -->

Then add the loader to your `webpack` config before ts-loader or babel-loader. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(yaml|ts)$/i,
        rules: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              appendTsSuffixTo: [/\.yaml$/],
            },
          },
          {
            loader: require.resolve('openapi-client-sdk-loader'),
            options: {
              compiler: 'ts',
              templateOptions: {
                validateRequest: true,
                validateResponse: true,
              },
              skipInvalid: true,
              style: {
                singleQuote: true,
                trailingComma: 'es5',
                printWidth: 100,
              },
            },
          },
        ],
      },
    ],
  },
};
```


And run `webpack` via your preferred method.


## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)
