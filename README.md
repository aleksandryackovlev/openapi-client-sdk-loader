<div align="center">
  <a href="https://swagger.io/docs/specification/about/">
    <img src="https://raw.githubusercontent.com/aleksandryackovlev/openapi-client-sdk-loader/master/assets/openapi-logo.png" alt="Open API logo" width="200" height="200">
  </a>
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![Build Status](https://travis-ci.org/aleksandryackovlev/openapi-client-sdk-loader.svg?branch=master)](https://travis-ci.org/aleksandryackovlev/openapi-client-sdk-loader)
[![codecov](https://codecov.io/gh/aleksandryackovlev/openapi-client-sdk-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/aleksandryackovlev/openapi-client-sdk-loader)
[![size](https://packagephobia.now.sh/badge?p=openapi-client-sdk-loader)](https://packagephobia.now.sh/result?p=openapi-client-sdk-loader)

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
The name of one of the build-in compilers. For now, there are `ts` (generates typescript client sdk) and `js` (generates javascript client sdk) compilers to choose from.

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
|        **baseUrl**        |         `{String}`         | `null`  | The api base url. If this option is set, it overrides `api.servers.url`                             |

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

// Basic use case
someApiMethod({
    // url parameters
    params: {
        id: 3,
    },
    // query parameters
    query: {
        tag: 'some tag',
    },
    // request body
    data: {
        order: 'asc'
    }
})
    .then(doSomeStuffWithTheResult)
    .catch(handleError);
    
// Request with custom options
someApiMethod({
    // url parameters
    params: {
        id: 3,
    },
    // query parameters
    query: {
        tag: 'some tag',
    },
    // request body
    data: {
        order: 'asc',
    },
}, {
   // API base url
   baseUrl: 'https://github.com', // default process.env.API_BASE_URL || '{{templateOptions.baseUrl}}' || '{{api.server.url}}'
   
   // Middleware to run before fetching the request
   preMiddleware: async (url: string, params: RequestInit): Promise<[string, RequestInit]> => { // default (url: string, params: RequestInit) => Promise.resolve([url, params])
       // do some manipulation with the data. for example, get an auth token
       const token = await getSomeTokenAsync(url, params);
       
       // return a tuple
       return [
        url,
        {
            ...params,
            headers: { ...params.headers, Authorization: token },
        }
        ];
   },
})
    .then(doSomeStuffWithTheResult)
    .catch(handleError);
```


**Generated code of the sdk client:**
<details>
  <summary>See code</summary>
  
  
```js
import Ajv from 'ajv';
import { stringify } from 'query-string';

const ajv = new Ajv({ unknownFormats: ['int32', 'int64', 'binary'] });

export class ApiError<T> extends Error {
  status: number;

  statusText: string;

  headers: Headers;

  response: T;

  constructor({
    status,
    statusText,
    response,
    message,
    headers,
  }: {
    status: number;
    statusText: string;
    response: T;
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

export class ClientCodeError extends Error {}

export class RequestValidationError extends Error {
  element: 'query' | 'params' | 'body' | 'headers';

  method: string;

  errors: Ajv.ErrorObject[];

  constructor({
    message,
    element,
    method,
    errors = [],
  }: {
    message: string;
    element: 'query' | 'params' | 'body' | 'headers';
    method: string;
    errors?: Ajv.ErrorObject[];
  }) {
    super(message);

    this.element = element;
    this.method = method;
    this.errors = errors;
  }
}

export class ResponseValidationError extends Error {
  method: string;

  errors: Ajv.ErrorObject[];

  constructor({
    message,
    method,
    errors = [],
  }: {
    message: string;
    method: string;
    errors?: Ajv.ErrorObject[];
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
  config?: Partial<Config>
) => Promise<SomeApiMethodResponse> = async (
  { query = {}, params = {}, data = {} } = {},
  currentConfig = defaultConfig
) => {
  const config = { ...defaultConfig, ...currentConfig };

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
      errors: ajv.errors || [],
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
      errors: ajv.errors || [],
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
        errors: ajv.errors || [],
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
      throw new ApiError<typeof response>({
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
      errors: ajv.errors || [],
    });
  }

  return response;
};
```
</details>

### js template
A built-in template for the javascript client sdk generation. Creates an sdk method for every operation. Every operation in the documentation has to have the `operationId`, this id is used as a name of a generated function in the resulting code.

#### Template options
|                    Name                     |            Type             | Default  | Description                                                            |
| :-----------------------------------------: | :-------------------------: | :------: | :--------------------------------------------------------------------- |
|        **validateRequest**        |         `{Boolean}`         | `true`  | Enables/Disables json schema validation for parameters, query strings, headers and request bodies                             |
|        **validateResponse**        |         `{Boolean}`         | `true`  | Enables/Disables json schema validation for responses                             |
|        **baseUrl**        |         `{String}`         | `null`  | The api base url. If this option is set, it overrides `api.servers.url`                             |

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

// Basic use case
someApiMethod({
    // url parameters
    params: {
        id: 3,
    },
    // query parameters
    query: {
        tag: 'some tag',
    },
    // request body
    data: {
        order: 'asc'
    }
})
    .then(doSomeStuffWithTheResult)
    .catch(handleError);
    
// Request with custom options
someApiMethod({
    // url parameters
    params: {
        id: 3,
    },
    // query parameters
    query: {
        tag: 'some tag',
    },
    // request body
    data: {
        order: 'asc',
    },
}, {
    // API base url
   baseUrl: 'https://github.com', // default process.env.API_BASE_URL || '{{templateOptions.baseUrl}}' || '{{api.server.url}}'
   
   // Middleware to run before fetching the request
   preMiddleware: async (url, params) => { // default (url: string, params: RequestInit) => Promise.resolve([url, params])
       // do some manipulation with the data. for example, get an auth token
       const token = await getSomeTokenAsync(url, params);
       
       // return a tuple
       return [
        url,
        {
            ...params,
            headers: { ...params.headers, Authorization: token },
        }
        ];
   },
})
    .then(doSomeStuffWithTheResult)
    .catch(handleError);
```


**Generated code of the sdk client:**
<details>
  <summary>See code</summary>
  
  
```js
import Ajv from 'ajv';
import { stringify } from 'query-string';

const ajv = new Ajv({ unknownFormats: ['int32', 'int64', 'binary'] });

export class ApiError extends Error {
  constructor({ status, statusText, response, message, headers }) {
    super(message);
    this.status = status;
    this.response = response;
    this.statusText = statusText;
    this.headers = headers;
  }
}

export class ClientCodeError extends Error {}

export class RequestValidationError extends Error {
  constructor({ message, element, method, errors = [] }) {
    super(message);

    this.element = element;
    this.method = method;
    this.errors = errors;
  }
}

export class ResponseValidationError extends Error {
  constructor({ message, method, errors = [] }) {
    super(message);

    this.method = method;
    this.errors = errors;
  }
}

const defaultConfig = {
  baseUrl: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  preMiddleware: (url, params) => Promise.resolve([url, params]),
};

export const someApiMethod = async (
  { query = {}, params = {}, data = {} } = {},
  currentConfig = defaultConfig
) => {
  const config = { ...defaultConfig, ...currentConfig };

  let requestUrl = `${config.baseUrl}/some-path/{id}`;

  const querySchema = {
    type: 'object',
    required: ['tag'],
    properties: { tag: { type: 'string' } },
  };

  function isQuery(obj) {
    const isValid = ajv.validate(querySchema, obj);

    return !!isValid;
  }

  if (!isQuery(query)) {
    throw new RequestValidationError({
      message: 'Request query string schema validation error',
      method: 'someApiMethod',
      element: 'query',
      errors: ajv.errors || [],
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

  function isParams(obj) {
    const isValid = ajv.validate(paramsSchema, obj);

    return !!isValid;
  }

  if (!isParams(params)) {
    throw new RequestValidationError({
      message: 'Request params schema validation error',
      method: 'someApiMethod',
      element: 'params',
      errors: ajv.errors || [],
    });
  }

  const paramsKeys = Object.keys(params);

  if (paramsKeys.length) {
    paramsKeys.forEach((param) => {
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
        errors: ajv.errors || [],
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

  const [processedUrl, processedParams] = await config.preMiddleware(requestUrl, requestParams);
  const responseObject = await fetch(processedUrl, processedParams);
  const response = await responseObject.json();

  if (!responseObject.ok) {
    throw new ApiError({
      message: 'Api error while fetching someApiMethod',
      status: responseObject.status,
      statusText: responseObject.statusText,
      response,
      headers: responseObject.headers,
    });
  }

  const responseSchema = { type: 'object', properties: { id: { type: 'string' } } };

  function isResponse(obj) {
    const isValid = ajv.validate(responseSchema, obj);

    return !!isValid;
  }

  if (!isResponse(response)) {
    throw new ResponseValidationError({
      message: 'Response schema validation error',
      method: 'someApiMethod',
      errors: ajv.errors || [],
    });
  }

  return response;
};
```
</details>

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./LICENSE)


[npm]: https://img.shields.io/npm/v/openapi-client-sdk-loader.svg
[npm-url]: https://npmjs.com/package/openapi-client-sdk-loader
[deps]: https://david-dm.org/aleksandryackovlev/openapi-client-sdk-loader.svg
[deps-url]: https://david-dm.org/aleksandryackovlev/openapi-client-sdk-loader

