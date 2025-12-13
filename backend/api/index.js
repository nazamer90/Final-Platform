try {
  const appModule = require('../dist/app');
  const app = appModule.default || appModule;
  
  if (!app) {
    throw new Error('App module export is empty');
  }
  
  module.exports = (req, res) => app(req, res);
} catch (error) {
  console.error('Fatal error loading app:', error.message, error.stack);
  
  const express = require('express');
  const fallbackApp = express();
  
  fallbackApp.use((req, res) => {
    res.status(500).json({
      error: 'Server initialization failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  });
  
  module.exports = (req, res) => fallbackApp(req, res);
}
