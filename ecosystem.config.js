module.exports = {
  apps: [
    {
      name: 'ishro-backend',
      script: './backend/src/index.ts',
      interpreter: 'ts-node',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_HOST: 'localhost',
        DB_PORT: 3306,
        DB_USER: 'ishro_user',
        DB_NAME: 'ishro_production'
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      watch: false,
      ignore_watch: ['node_modules', 'uploads', 'dist'],
      max_memory_restart: '500M',
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ],
  deploy: {
    production: {
      user: 'ghoutni',
      host: '102.213.180.22',
      ref: 'origin/main',
      repo: 'https://github.com/bennouba/Final-Platform.git',
      path: '/home/ghoutni/app',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
