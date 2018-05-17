
const glob = require('glob');
const path = require('path');
const isRelativePath = require('./util/isRelativePath');
const resolveFileNameFromPathWithoutEnding = require('./util/resolveFileNameFromPathWithoutEnding');
const { resolvePathFromApp } = require('./util/paths');

function importFolder(folderDir) {
  let importPath = folderDir;
  const commands = {};

  if (isRelativePath(folderDir)) {
    importPath = resolvePathFromApp(folderDir);
  }

  glob.sync(`${importPath}/**/*.js`).forEach((file) => {
    const command = require(path.resolve(file));
    const commandName = resolveFileNameFromPathWithoutEnding(file);

    commands[commandName] = command;
  });

  return commands;
}

module.exports = importFolder;
