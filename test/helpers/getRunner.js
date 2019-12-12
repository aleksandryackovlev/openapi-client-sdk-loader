import fs from 'fs';
import path from 'path';

import { runLoaders } from 'loader-runner';

const getRunner = (fixture, loaderOptions = {}) => {
  return () =>
    new Promise((resolve, reject) =>
      runLoaders(
        {
          resource: path.resolve(__dirname, '../fixtures', fixture),
          loaders: [
            {
              loader: path.resolve(__dirname, '../../src'),
              options: loaderOptions || {},
            },
          ],
          readResource: fs.readFile.bind(fs),
        },
        (err, result) => (err ? reject(err) : resolve(result))
      )
    );
};

export default getRunner;
