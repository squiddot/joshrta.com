module.exports = {
  apps: [
    {
      name: 'joshrta-dev',
      instances: 1,
      script: './node_modules/.bin/joshrta',
      args: 'start --port 3201',
    },
  ],
}
