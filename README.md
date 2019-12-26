<div align="center">
  <a href="https://swagger.io/docs/specification/about/">
    <img src="https://rawgit.com/aleksandryackovlev/openapi-client-sdk-loader/master/assests/openapi-logo.png" alt="Open API logo" width="200" height="200">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# openapi-client-sdk-loader

Generates the client sdk from [Open API 3.0](https://swagger.io/docs/specification/about/) documentation.

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

Compiler that is going to be used while processing the api object returned from the [`SwaggerParser`](https://github.com/APIDevTools/swagger-parser).

#### `String`
The name of one of the build-in compilers. (For now, there is only one ts compiler).

#### `Function`
Custom function that receives the api object and the loader options, and returns a Promise that resolves to the object with the shape, expected by the handlebars template.

### `template`

Type: `String`
Default: `'path_to_project/node_modules/openapi-client-sdk-loader/src/templates/ts'`

Absolute path to the directory with the handlebars template that is going to be used during code generation.  In the folder there should be at least one file `index.handlebars`. If there are more handlebars files in the given directory, others become partials that can be used by their names in every handlebars file. See [`Handlebars docs`](https://github.com/wycats/handlebars.js) for more info on templates.

### `templateOptions`

Type: `Object`
Default: `{ validateRequest: true, validateResponse: true }`

A set of options passed to handlebars templates during compilation.

It is passed to the handlebars template as the `options` property. This option can have any shape. For the default typescript template it contains only two properties. See [`Templates`](#Templates) for more info.

### `skipInvalid`

Type: `Boolean`
Default: `true`

Enables/Disables failing on importing invalid swagger document.

If enabled, invalid documents will be imported as is and should be processed by other loaders or plugins. Useful when, for example, your Open API documentation is written in a json file and you use other types of json files in your application.

### `style`

Type: `Object`
Default: `{ singleQuote: true, trailingComma: 'es5', printWidth: 100 }`

A set of options to pass into prettier for formatting function.

If you use source maps, the generated code will be shown in the sources panel. Formatting can make it easier too read. See [`Prettier docs`](https://github.com/prettier/prettier) for the list of all available options.

## Templates

### ts template
A built-in template for the typescript client sdk generation. Creates an sdk method for every operation. Every operation in the documentation has to have the `operationId`, this id is used as a name of a generated function in the resulting code.

#### Template options
|                    Name                     |            Type             | Default  | Description                                                            |
| :-----------------------------------------: | :-------------------------: | :------: | :--------------------------------------------------------------------- |
|        **validateRequest**        |         `{Boolean}`         | `true`  | Enables/Disables json schema validation for parameters, query strings, headers and request bodies                             |
|        **validateResponse**        |         `{Boolean}`         | `true`  | Enables/Disables json schema validation for responses                             |

#### Example

**api.yaml**
```
openapi: 3.0.1
info:
  title: Swagger Doc
  description: 'This is a sample server.'
  version: 1.0.3
servers:
- url: https://petstore.swagger.io/v2
- url: http://petstore.swagger.io/v2
paths:
  /some-path/{id}:
    post:
      summary: Summary
      description: Returns a single element
      operationId: someApiMethod
      parameters:
      - name: id
        in: path
        required: true
        schema:
          type: integer
          format: int64
      - name: tag
        in: query
        required: true
        schema:
          type: string
      requestBody:
        description: Desc
        content:
          application/json:
            schema:
              type: object
              required: [ order ]
              properties:
                order:
                  type: string
      responses:
        200:
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
```

**file.ts**

```js
import { someApiMethod } from './api.yaml';

someApiMethod({
    params: {
        id: 3,
    },
    query: {
        tag: 'some tag',
    },
    data: {
        order: 'asc'
    }
})
    .then(doSomeStuffWithTheResult)
    .catch(handleError)
```

**generated code**

```js
import Ajv from 'ajv';
import { stringify } from 'query-string';

const ajv = new Ajv({ unknownFormats: ['int32', 'int64', 'binary'] });

class ApiError extends Error {
  status: number;

  statusText: string;

  headers: Headers;

  response: any;

  constructor({
    status,
    statusText,
    response,
    message,
    headers,
  }: {
    status: number;
    statusText: string;
    response: any;
    message: string;
    headers: Headers;
  }) {
    super(message);
    this.status = status;
    this.response = response;
    this.statusText = statusText;
    this.headers = headers;
  }
}

class ClientCodeError extends Error {}

class RequestValidationError extends Error {
  element: 'query' | 'params' | 'body' | 'headers';

  method: string;

  errors: any[];

  constructor({
    message,
    element,
    method,
    errors = [],
  }: {
    message: string;
    element: 'query' | 'params' | 'body' | 'headers';
    method: string;
    errors?: any[];
  }) {
    super(message);

    this.element = element;
    this.method = method;
    this.errors = errors;
  }
}

class ResponseValidationError extends Error {
  method: string;

  errors: any[];

  constructor({
    message,
    method,
    errors = [],
  }: {
    message: string;
    method: string;
    errors?: any[];
  }) {
    super(message);

    this.method = method;
    this.errors = errors;
  }
}

export interface Config {
  baseUrl: string;
  preMiddleware: (url: string, params: RequestInit) => Promise<[string, RequestInit]>;
}

const defaultConfig: Config = {
  baseUrl: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  preMiddleware: (url: string, params: RequestInit) => Promise.resolve([url, params]),
};

export interface SomeApiMethodParams {
  id: number;
}

export interface SomeApiMethodQuery {
  tag: string;
}

export interface SomeApiMethodRequestBodyJson {
  order: string;
}

export interface SomeApiMethodResponse {
  id?: string;
}

export interface SomeApiMethodRequest {
  query?: SomeApiMethodQuery;
  params?: SomeApiMethodParams;
  data?: FormData | SomeApiMethodRequestBodyJson;
}
export const someApiMethod: (
  request: SomeApiMethodRequest,
  config?: Config
) => Promise<SomeApiMethodResponse> = async (
  { query = {}, params = {}, data = {} } = {},
  config = defaultConfig
) => {
  let requestUrl = `${config.baseUrl}/some-path/{id}`;

  const querySchema = {
    type: 'object',
    required: ['tag'],
    properties: { tag: { type: 'string' } },
  };

  function isQuery(obj: unknown): obj is SomeApiMethodQuery {
    const isValid = ajv.validate(querySchema, obj);

    return !!isValid;
  }

  if (!isQuery(query)) {
    throw new RequestValidationError({
      message: 'Request query string schema validation error',
      method: 'someApiMethod',
      element: 'query',
    });
  }

  if (Object.keys(query)) {
    requestUrl = `${requestUrl}?${stringify(query, { arrayFormat: 'bracket' })}`;
  }

  const paramsSchema = {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'integer', format: 'int64' } },
  };

  function isParams(obj: unknown): obj is SomeApiMethodParams {
    const isValid = ajv.validate(paramsSchema, obj);

    return !!isValid;
  }

  if (!isParams(params)) {
    throw new RequestValidationError({
      message: 'Request params schema validation error',
      method: 'someApiMethod',
      element: 'params',
    });
  }

  type SomeApiMethodParamsKeys = keyof SomeApiMethodParams;

  const paramsKeys = Object.keys(params) as SomeApiMethodParamsKeys[];

  if (paramsKeys.length) {
    paramsKeys.forEach(param => {
      requestUrl = requestUrl.replace(`{${param}}`, encodeURIComponent(String(params[param])));
    });
  }

  const requestHeaders = {
    'Content-Type': 'application/json',
  };

  if (!(data instanceof FormData)) {
    const bodySchema = {
      type: 'object',
      required: ['order'],
      properties: { order: { type: 'string' } },
    };
    const isBodyValid = ajv.validate(bodySchema, data);

    if (!isBodyValid) {
      throw new RequestValidationError({
        message: 'Request body schema validation error',
        method: 'someApiMethod',
        element: 'body',
      });
    }
  }

  let requestParams;

  if (data) {
    requestParams = {
      method: 'POST',
      headers: requestHeaders,
      body: data instanceof FormData ? data : JSON.stringify(data),
    };
  } else {
    requestParams = {
      method: 'POST',
      headers: requestHeaders,
    };
  }

  let response: unknown;

  try {
    const [processedUrl, processedParams] = await config.preMiddleware(requestUrl, requestParams);
    const responseObject = await fetch(processedUrl, processedParams);
    response = await responseObject.json();

    if (!responseObject.ok) {
      throw new ApiError({
        message: 'Api error while fetching someApiMethod',
        status: responseObject.status,
        statusText: responseObject.statusText,
        response,
        headers: responseObject.headers,
      });
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw error as ClientCodeError;
    }
  }

  const responseSchema = { type: 'object', properties: { id: { type: 'string' } } };

  function isResponse(obj: unknown): obj is SomeApiMethodResponse {
    const isValid = ajv.validate(responseSchema, obj);

    return !!isValid;
  }

  if (!isResponse(response)) {
    throw new ResponseValidationError({
      message: 'Response schema validation error',
      method: 'someApiMethod',
    });
  }

  return response;
};
```

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)
