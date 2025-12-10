const path = require('path');

const moduleAlias = require('module-alias');

const appRoot = __dirname;
const distPath = path.join(appRoot, 'dist');

moduleAlias.addAliases({
  '@config': path.join(distPath, 'config'),
  '@models': path.join(distPath, 'models'),
  '@controllers': path.join(distPath, 'controllers'),
  '@services': path.join(distPath, 'services'),
  '@middleware': path.join(distPath, 'middleware'),
  '@routes': path.join(distPath, 'routes'),
  '@validators': path.join(distPath, 'validators'),
  '@utils': path.join(distPath, 'utils'),
  '@migrations': path.join(distPath, 'migrations'),
  '@database': path.join(distPath, 'database'),
  '@security': path.join(distPath, 'security'),
  '@shared-types': path.join(distPath, 'types'),
  '@': distPath,
});
