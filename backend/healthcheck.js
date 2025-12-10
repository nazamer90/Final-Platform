const http = require('http');

const PORT = parseInt(process.env.PORT || '8000', 10);

const options = {
  hostname: 'localhost',
  port: PORT,
  path: '/health',
  method: 'GET',
  timeout: 2000,
};

console.log(`🏥 Checking health on port ${PORT}...`);

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log(`✅ Health check passed (status: ${res.statusCode})`);
    process.exit(0);
  } else {
    console.error(`❌ Health check failed with status ${res.statusCode}`);
    process.exit(1);
  }
});

req.on('error', (error) => {
  console.error(`❌ Health check error on port ${PORT}: ${error.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.error(`❌ Health check timeout on port ${PORT}`);
  req.destroy();
  process.exit(1);
});

req.end();
