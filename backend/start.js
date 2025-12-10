#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || '8000';
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';

console.log('🔧 Environment Variables:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   LOG_LEVEL: ${process.env.LOG_LEVEL}`);
console.log('');

require('./loader.js');
require('./dist/index.js');
