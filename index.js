#!/usr/bin/env node

const { isFunction, get, keys } = require('lodash');
const getCommands = require('./src/getCommands');
const parseOptions = require('./src/util/parseOptions');

const [ nodePath, scriptName, command, ...options ] = process.argv;
const commands = getCommands();

if (isFunction(get(commands, command))) {
  commands[command](parseOptions(options))
} else {
  console.log('Nodexec');
  console.log();
  console.log(`No command found for ${command}`);
  console.log();
  console.log('Available commands:');
  keys(commands).forEach((command) => {
    console.log(`\t${command}`);
  })
}
