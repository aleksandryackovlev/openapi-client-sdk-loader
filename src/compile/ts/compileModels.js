import { schema2typescript, basepath, dashes2capitals } from '../../utils';

const prepareMimeType = (mimeType) => dashes2capitals(basepath(mimeType));

export const compile = (schemas, transform) =>
  schemas
    ? Promise.all(
        Object.keys(schemas).map((schemaName) => {
          return schema2typescript(...transform(schemas, schemaName));
        })
      ).then((interfaces) => interfaces.join('\n'))
    : Promise.resolve('');

const compileBodies = (bodies, nameSuffix) =>
  bodies
    ? Object.keys(bodies).map((bodyName) =>
        compile(bodies[bodyName].content, (schemas, name) => [
          schemas[name].schema,
          `${bodyName}${nameSuffix}${prepareMimeType(name)}`,
        ])
      )
    : [Promise.resolve('')];

export default async (api) =>
  Promise.all([
    api.components && api.components.shemas
      ? compile(api.components.schemas, (schemas, name) => [schemas[name], name])
      : Promise.resolve(''),
    api.components && api.components.shemas
      ? compile(api.components.parameters, (schemas, name) => [
          schemas[name].schema,
          `${name}Param`,
        ])
      : Promise.resolve(''),
    ...(api.components && api.components.requestBodies
      ? compileBodies(api.components.requestBodies, 'RequestBody')
      : []),
    ...(api.components && api.components.responses
      ? compileBodies(api.components.responses, 'Response')
      : []),
  ]).then((interfaces) => interfaces.join('\n'));
