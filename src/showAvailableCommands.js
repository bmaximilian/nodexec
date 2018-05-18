
const { assign, sortBy, keys, isEmpty, isString } = require('lodash');
const chalk = require('chalk');


function getTabsForLevel(level) {
  let tabs = '';

  for (let i = 0; i < level; i += 1) {
    tabs += '\t'
  }

  return tabs;
}

function formatScopeAndGetLevelForCommand(scope) {
  if (!isString(scope)) {
    throw new Error('The scope must be a string');
  }

  const buffer = scope.split('/').filter(namespace => !isEmpty(namespace));

  return {
    scope: isEmpty(buffer) ? '' : buffer[buffer.length - 1],
    level: buffer.length,
  }
}

function sortCommandsByScope(commands) {
  const sortedCommands = {};

  return sortBy(commands, ['scope', 'name'])
    .map((command) => assign(
      {},
      command,
      formatScopeAndGetLevelForCommand(command.scope),
    ));
}


function showAvailableCommands(commands) {
  const sortedCommands = sortCommandsByScope(commands);
  let currentScope = '';

  console.log(chalk.magenta('Available commands:'));
  console.log();

  sortedCommands.forEach((commandObject) => {
    const tabs = getTabsForLevel(commandObject.level);

    if (commandObject.scope !== currentScope) {
      console.log();
      console.log(`${tabs}${chalk.magenta(commandObject.scope)}`);

      currentScope = commandObject.scope;
    }

    if (isEmpty(commandObject.description)) {
      console.log(`\t${tabs}${chalk.blue(commandObject.name)}`);
    } else {
      console.log(`\t${tabs}${chalk.blue(commandObject.name)}\t- ${chalk.white(commandObject.description)}`);
    }
  });
}

module.exports = showAvailableCommands;
