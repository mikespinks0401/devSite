module.exports = {
  apps: [
    {
      name: 'MikeSpinks.Dev',
      script: '.output/server/index.mjs',
      instances: 0,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
