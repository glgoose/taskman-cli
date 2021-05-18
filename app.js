let argv = require('yargs/yargs')(process.argv.slice(2)).alias('a', 'add').argv
const fs = require('fs')

const tasks = ['task1', 'task2']

if (argv._[0] === 'ls' || argv._[0] === 'list') {
  console.log(tasks.join('\n'))
}

if (argv.a || argv.add) {
  tasks.push(argv.a)
}

const saveTasks = tasks => {
  try {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks))
  } catch (err) {
    console.log(err)
  }
}

saveTasks(tasks)
