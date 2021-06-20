module.exports = {
  apps: [
    {
      name: 'REPONAME-dev',
      instances: 1,
      script: './node_modules/.bin/REPONAME',
      args: 'start --port 3201',
    },
  ],
}
