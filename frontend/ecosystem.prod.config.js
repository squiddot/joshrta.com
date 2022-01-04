module.exports = {
  apps: [
    {
      name: 'joshrta',
      exec_mode: 'cluster',
      instances: 2,
      script: './node_modules/.bin/joshrta',
      args: 'start --port 3001',
    },
  ],
}
