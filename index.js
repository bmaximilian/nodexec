#!/usr/bin/env node

const { isFunction, get } = require('lodash');
const chalk = require('chalk');
const getCommands = require('./src/getCommands');
const parseOptions = require('./src/util/parseOptions');
const showAvailableCommands = require('./src/showAvailableCommands');

const [ nodePath, scriptName, enteredCommand, ...options ] = process.argv;
const commands = getCommands();

if (isFunction(get(commands, `${enteredCommand}.command`))) {
  commands[enteredCommand].command(parseOptions(options))
} else {
  console.log(chalk.magenta('Nodexec'));
  console.log();

  if (enteredCommand) {
    console.log(chalk.red('No command found for ') + chalk.blue(enteredCommand));
    console.log();
  }

  showAvailableCommands(commands);
}
