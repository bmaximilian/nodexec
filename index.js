#!/usr/bin/env node

const { isFunction, get, keys, isEmpty } = require('lodash');
const getCommands = require('./src/getCommands');
const parseOptions = require('./src/util/parseOptions');

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

  console.log('Available commands:');
  keys(commands).forEach((key) => {
    if (isEmpty(commands[key].description)) {
      console.log(`\t${commands[key].name}`);
    } else {
      console.log(`\t${commands[key].name} - ${commands[key].description}`);
    }
  })
}
