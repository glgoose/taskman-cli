let argv = require('yargs/yargs')(process.argv.slice(2))
  .alias('a', 'add')
  .alias('rm', 'remove')
  .alias('c', 'complete', 'done').argv
const fs = require('fs')
const { access } = require('node:fs')

const filePath = 'tasks.json'

const loadTasks = () => {
  try {
    const file = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(file)
  } catch (err) {
    return false // file doesn't exist
  }
}

let tasks = loadTasks()
if (!tasks) tasks = []

// command arguments
if (argv._[0] === 'ls' || argv._[0] === 'list') {
  tasks.forEach((task, idx) => console.log(`${idx} | ${task.name}`))
}

if (argv.add) {
  tasks.push({ name: argv.add, done: false })
}

if (argv.delete) {
  tasks.splice(argv.delete, 1)
}

if (argv.complete)
  // store tasks
  const storeTasks = tasks => {
    try {
      fs.writeFileSync(filePath, JSON.stringify(tasks))
    } catch (err) {
      console.log(err)
    }
  }

storeTasks(tasks)
