module.exports = {
  apps: [
    {
      name: 'React-Next-Koa-Starter',
      script: './server/index.js',
      env_development: {
        NODE_ENV: 'dev',
        NODE_PATH: './',
      },
      env_staging: {
        NODE_ENV: 'server-dev',
        NODE_PATH: './',
      },
      env_production: {
        NODE_ENV: 'server-prod',
        NODE_PATH: './',
      },
      output: './pm2/logs/-out.err',
      error: './pm2/logs/-error.err',
    },
  ],
}
