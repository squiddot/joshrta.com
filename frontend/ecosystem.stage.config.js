module.exports = {
  apps: [
    {
      name: 'REPONAME-stage',
      instances: 1,
      script: './node_modules/.bin/REPONAME',
      args: 'start --port 3101',
    },
  ],
}
