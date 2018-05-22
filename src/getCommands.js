const { isArray, assign, get } = require('lodash');
const importFolder = require('./importFolder');

function getCommands(config) {
  let commands = {};
  const directories = get(config, 'directories', []);

  if (!isArray(directories)) {
    throw new Error('directories must be an array');
  }

  directories.forEach((directory) => {
    commands = assign(
      commands,
      importFolder(directory),
    );
  });

  return commands;
}

module.exports = getCommands;
