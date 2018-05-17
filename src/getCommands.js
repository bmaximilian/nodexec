const { isArray, assign } = require('lodash');
const mergeConfig = require('./mergeConfig');
const importFolder = require('./importFolder');

function getCommands() {
  const config = mergeConfig();
  let commands = {};

  if (!isArray(config.directories)) {
    throw new Error('directories must be an array');
  }

  config.directories.forEach((directory) => {
    commands = assign(
      commands,
      importFolder(directory),
    );
  });

  return commands;
}

module.exports = getCommands;
