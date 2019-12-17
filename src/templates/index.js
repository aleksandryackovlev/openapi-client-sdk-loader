import fs from 'fs';
import path from 'path';

import Handlebars from 'handlebars';
import glob from 'glob';

import { capitalize } from '../utils';

export default (source, templatePath) => {
  const template = fs.readFileSync(`${templatePath}/index.handlebars`);

  Handlebars.registerHelper({
    json(context) {
      return JSON.stringify(context);
    },
    capitalize(context) {
      return capitalize(context);
    },
    eq(v1, v2) {
      return v1 === v2;
    },
    ne(v1, v2) {
      return v1 !== v2;
    },
    lt(v1, v2) {
      return v1 < v2;
    },
    gt(v1, v2) {
      return v1 > v2;
    },
    lte(v1, v2) {
      return v1 <= v2;
    },
    gte(v1, v2) {
      return v1 >= v2;
    },
    and(...args) {
      return args.every(Boolean);
    },
    or(...args) {
      return args.slice(0, -1).some(Boolean);
    },
    not(context) {
      return !!context;
    },
  });

  const partials = glob.sync(`${templatePath}/**/*.handlebars`);
  if (partials && partials.length) {
    partials.forEach((partial) => {
      if (partial !== `${templatePath}/index.handlebars`) {
        Handlebars.registerPartial(path.parse(partial).name, fs.readFileSync(partial).toString());
      }
    });
  }

  const compiled = Handlebars.compile(template.toString(), { noEscape: true });

  return compiled(source);
};
