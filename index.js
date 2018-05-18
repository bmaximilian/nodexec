#!/usr/bin/env node

const { isFunction, get } = require('lodash');
const getCommands = require('./src/getCommands');
const parseOptions = require('./src/util/parseOptions');
const showAvailableCommands = require('./src/showAvailableCommands');

const [ nodePath, scriptName, enteredCommand, ...options ] = process.argv;
const commands = getCommands();

if (isFunction(get(commands, `${enteredCommand}.command`))) {
  commands[enteredCommand].command(parseOptions(options))
} else {
  console.log('Nodexec');
  console.log();

  if (enteredCommand) {
    console.log(`No command found for ${enteredCommand}`);
    console.log();
  }

  showAvailableCommands(commands);
}
