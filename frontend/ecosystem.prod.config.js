module.exports = {
  apps: [
    {
      name: 'REPONAME',
      exec_mode: 'cluster',
      instances: 2,
      script: './node_modules/.bin/REPONAME',
      args: 'start --port 3001',
    },
  ],
}
