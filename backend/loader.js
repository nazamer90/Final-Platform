const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '@config': __dirname + '/dist/config',
  '@models': __dirname + '/dist/models',
  '@controllers': __dirname + '/dist/controllers',
  '@services': __dirname + '/dist/services',
  '@middleware': __dirname + '/dist/middleware',
  '@routes': __dirname + '/dist/routes',
  '@validators': __dirname + '/dist/validators',
  '@utils': __dirname + '/dist/utils',
  '@migrations': __dirname + '/dist/migrations',
  '@database': __dirname + '/dist/database',
  '@security': __dirname + '/dist/security',
  '@shared-types': __dirname + '/dist/types',
});
