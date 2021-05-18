let argv = require('yargs/yargs')(process.argv.slice(2))
  .alias('a', 'add')
  .alias('c', 'complete')
  .alias('h', 'help')
  .help('h')
  .example('node app ls', 'lists all tasks')
  .example("node app -a 'buy food'", "adds task 'buy food'")
  .example('node app rm 2', 'removes task with index 2')
  .example('node app -c 2', 'marks task with index 2 as completed').argv
const fs = require('fs')
const chalk = require('chalk')

const filePath = 'tasks.json'

// load/read existing tasks
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
if (argv._[0] === 'ls' || argv._[0] === 'list')
  tasks.forEach((task, idx) => {
    if (task.done) {
      console.log(chalk.green(`${idx} | ${task.name} ✓`))
      return
    }
    console.log(`${idx} | ${task.name}`)
  })

if (argv.add) tasks.push({ name: argv.add, done: false })

if (argv._[0] === 'rm' || argv._[0] === 'remove') tasks.splice(argv._[1], 1)

if (argv.complete) tasks[argv.complete].done = true

// store tasks
const storeTasks = tasks => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks))
  } catch (err) {
    console.log(err)
  }
}

storeTasks(tasks)
