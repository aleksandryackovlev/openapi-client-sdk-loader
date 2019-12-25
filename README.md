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

Then add the loader to your `webpack` config before ts-loader or babel-loader. For example:

**file.ts**

```js
import { someApiMethod } from 'api.yaml';
```

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

## Options

|                    Name                     |            Type             | Default  | Description                                                            |
| :-----------------------------------------: | :-------------------------: | :------: | :--------------------------------------------------------------------- |
|              **[`compiler`](#compiler)**              |    `{String\|Function}`    |  `'ts'`  | Compiler to use for the processing of a swagger api object                  |
|           **[`template`](#template)**           |    `{String}`    |  `'path_to_project/node_modules/openapi-client-sdk-loader/src/templates/ts'`  | Absolute path to the directory with a handlebars template                           |
|          **[`templateOptions`](#templateOptions)**          | `{Object}` | `{ validateRequest: true, validateResponse: true }`  | A set of options passed to handlebars files during compilation                   |
|        **[`skipInvalid`](#skipInvalid)**        |         `{Boolean}`         | `true`  | Enables/Disables failing on importing invalid swagger documents                             |
|    **[`style`](#style)**    |         `{Object}`          |   `{ singleQuote: true, trailingComma: 'es5', printWidth: 100 }`    | A set of options to pass into prettier for formatting function |


### `compiler`

Type: `String|Function`
Default: `'ts'`

Compiler that is going to be used while processing the api object returned from the SwaggerParser.

#### `String`
The name of one of the build-in compilers. (For now, there is only one ts compiler).

#### `Function`
Custom function that receives the api object and the loader options, and returns a Promise that resolves to the object with the shape, expected by the handlebars template.

### `template`

Type: `String`
Default: `'path_to_project/node_modules/openapi-client-sdk-loader/src/templates/ts'`

Absolute path to the directory with the handlebars template that is going to be used during code generation.  In the folder there should be at least one file `index.handlebars`. If there are more handlebars files in the given directory, others become partials that can be used by their names in every handlebars file.

### `templateOptions`

Type: `Object`
Default: `{ validateRequest: true, validateResponse: true }`

A set of options passed to handlebars templates during compilation.

It is passed to the handlebars template as the `options` property. This option can have any shape. For the default typescript template it contains only two properties.

### `skipInvalid`

Type: `Boolean`
Default: `true`

Enables/Disables failing on importing invalid swagger document.

If enabled, invalid documents will be imported as is and should be processed by other loaders or plugins. Useful when, for example, your Open API documentation is written in a json file and you use other types of json files in your application.

### `style`

Type: `Object`
Default: `{ singleQuote: true, trailingComma: 'es5', printWidth: 100 }`

A set of options to pass into prettier for formatting function.

If you use source maps, the generated code will be shown in the sources panel. Formatting can make it easier too read.

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)
