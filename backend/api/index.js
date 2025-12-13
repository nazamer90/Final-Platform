const path = require('path');

console.log('🔄 Initializing Vercel serverless handler...');
console.log('📁 Current directory:', __dirname);
console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
console.log('⏭️ SKIP_DB_INIT:', process.env.SKIP_DB_INIT);

let serverless;
try {
  serverless = require('serverless-http');
  console.log('✅ serverless-http loaded');
} catch (error) {
  console.error('❌ Failed to load serverless-http:', error.message);
  throw error;
}

const register = require('tsconfig-paths').register;

const tsconfigPath = path.join(__dirname, '../tsconfig.json');
const baseUrl = path.join(__dirname, '../dist');

console.log('📍 Path alias baseUrl:', baseUrl);

try {
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
  console.log('✅ TypeScript paths registered');
} catch (error) {
  console.error('⚠️ Failed to register paths:', error.message);
}

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
if (!process.env.SKIP_DB_INIT) {
  process.env.SKIP_DB_INIT = 'true';
}

console.log('✅ Environment variables set');

let app;
let loadError = null;

try {
  console.log('📦 Loading Express app from ../dist/app...');
  const appModule = require('../dist/app');
  app = appModule.default || appModule;
  
  if (!app) {
    throw new Error('App module exported undefined or null');
  }
  
  console.log('✅ Express app loaded successfully');
} catch (error) {
  console.error('❌ CRITICAL: Error loading app module:', error.message);
  console.error(error.stack);
  loadError = error;
  
  console.log('⚠️ Creating fallback Express app...');
  const express = require('express');
  app = express();
  
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'degraded',
      mode: 'fallback',
      error: 'App module failed to load',
      message: loadError.message
    });
  });
  
  app.all('*', (req, res) => {
    res.status(500).json({ 
      error: 'App initialization failed',
      message: loadError.message,
      details: process.env.NODE_ENV === 'production' ? undefined : loadError.stack,
      timestamp: new Date().toISOString()
    });
  });
}

console.log('🚀 Creating serverless handler...');
const handler = serverless(app, {
  binary: ['image/*', 'font/*'],
  request(req) {
    req.setTimeout(30000);
  },
  response(res) {
    res.setTimeout(30000);
  }
});

console.log('✅ Serverless handler initialized');

module.exports = handler;
