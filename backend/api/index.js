const serverless = require('serverless-http');
const path = require('path');

const register = require('tsconfig-paths').register;

const tsconfigPath = path.join(__dirname, '../tsconfig.json');
const baseUrl = path.join(__dirname, '../dist');

register({
  baseUrl: baseUrl,
  paths: {
    '@/*': ['*'],
    '@config/*': ['config/*'],
    '@models/*': ['models/*'],
    '@controllers/*': ['controllers/*'],
    '@services/*': ['services/*'],
    '@middleware/*': ['middleware/*'],
    '@routes/*': ['routes/*'],
    '@validators/*': ['validators/*'],
    '@utils/*': ['utils/*'],
    '@migrations/*': ['migrations/*'],
    '@database/*': ['database/*'],
    '@security/*': ['security/*'],
    '@shared-types/*': ['types/*']
  }
});

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.SKIP_DB_INIT = 'true';

let app;

try {
  const appModule = require('../dist/app');
  app = appModule.default || appModule;
  
  if (!app) {
    throw new Error('App module is empty');
  }
  
  console.log('✅ Express app loaded successfully');
} catch (error) {
  console.error('❌ Error loading app:', error.message);
  console.error(error.stack);
  
  app = require('express')();
  
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok',
      error: 'App is in fallback mode',
      message: error.message
    });
  });
  
  app.use((req, res) => {
    res.status(500).json({ 
      error: 'App initialization failed', 
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
    });
  });
}

module.exports = serverless(app, {
  binary: ['image/*', 'font/*'],
  request(req) {
    req.setTimeout(30000);
  },
  response(res) {
    res.setTimeout(30000);
  }
});
