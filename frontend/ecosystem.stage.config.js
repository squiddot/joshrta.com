module.exports = {
  apps: [
    {
      name: 'joshrta-stage',
      instances: 1,
      script: './node_modules/.bin/joshrta',
      args: 'start --port 3101',
    },
  ],
}
