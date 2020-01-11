const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../..'),
  testMatch: ['<rootDir>/**/(src|test)/**/*.(spec|test).js'],
};
