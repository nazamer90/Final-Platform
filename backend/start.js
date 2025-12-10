#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
if (!process.env.PORT) {
  process.env.PORT = '8000';
}
process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info';

console.log('🔧 Environment Variables:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   DB_DIALECT: ${process.env.DB_DIALECT || 'mysql'}`);
console.log(`   DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
console.log(`   DB_NAME: ${process.env.DB_NAME || 'eishro_db'}`);
console.log(`   LOG_LEVEL: ${process.env.LOG_LEVEL}`);
console.log('');

require('./loader.js');
require('./dist/index.js');
