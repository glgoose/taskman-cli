let argv = require('yargs/yargs')(process.argv.slice(2)).argv

const tasks = ['task1', 'task2']

if (argv.ls) {
  console.log(tasks)
}
