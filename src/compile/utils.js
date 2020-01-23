import { toPairs, cloneDeep } from 'lodash';

import { basepath, dashes2capitals } from '../utils';

export const prepareMimeType = (mimeType) => dashes2capitals(basepath(mimeType.split(';')[0]));

export const isApplicationJson = (mimeType) => mimeType.startsWith('application/json');

export const parseParams = (schemas) =>
  schemas.reduce((prevParams, { name, in: inPath, required, schema }) => {
    const inName = inPath === 'path' ? 'params' : inPath;
    const params = { ...prevParams };

    if (!params[inName]) {
      params[inName] = {
        type: 'object',
        required: [],
        properties: {},
        additionalProperties: false,
      };
    }

    params[inName].properties[name] = schema;

    if (required) {
      params[inName].required.push(name);
    }

    return params;
  }, {});

const normalizeMultipartSchema = (schema) => {
  const normalizedSchema = cloneDeep(schema);

  if (normalizedSchema.type === 'string' && normalizedSchema.format === 'binary') {
    normalizedSchema.type = 'object';
  }

  if (normalizedSchema.type === 'object' && normalizedSchema.properties) {
    normalizedSchema.properties = toPairs(normalizedSchema.properties).reduce(
      (nextProperties, [propName, props]) => {
        return {
          ...nextProperties,
          [propName]: normalizeMultipartSchema(props),
        };
      },
      {}
    );
  }

  if (normalizedSchema.type === 'array' && normalizedSchema.items) {
    normalizedSchema.items = normalizeMultipartSchema(normalizedSchema.items);
  }

  return normalizedSchema;
};

export const parseBody = (requestBody) => {
  if (Object.keys(requestBody).length) {
    const mimeType =
      Object.keys(requestBody).find(isApplicationJson) || Object.keys(requestBody)[0];

    return {
      mimeType,
      mimeTypeSuffix: prepareMimeType(mimeType),
      data: mimeType.startsWith('multipart/form-data')
        ? normalizeMultipartSchema(requestBody[mimeType].schema)
        : requestBody[mimeType].schema,
    };
  }

  return {};
};

export const parseResponse = (response) => {
  if (!response || !response.content || !Object.keys(response.content)) {
    return [{}, []];
  }

  const pairs = toPairs(response.content);
  const jsonResponse = pairs.find(([contentType]) => isApplicationJson(contentType));

  return [
    (jsonResponse && jsonResponse[1] && jsonResponse[1].schema) || {},
    pairs.map(([contentType]) => contentType),
  ];
};

export const parseResponses = (operationResponses) => ({
  responses: toPairs(operationResponses).reduce((result, [statusCode, response]) => {
    const [responses, contentTypes] = parseResponse(response);
    return {
      ...result,
      [statusCode]: {
        response: Object.keys(responses).length ? responses : null,
        contentTypes: contentTypes.length ? contentTypes : null,
      },
    };
  }, {}),
});
