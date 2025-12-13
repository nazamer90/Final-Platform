const appModule = require('../dist/app');
const app = appModule.default || appModule;

module.exports = (req, res) => app(req, res);
