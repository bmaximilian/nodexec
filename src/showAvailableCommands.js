
const { isEmpty } = require('lodash');
const chalk = require('chalk');
const getTabsForLevel = require('./util/getTabsForLevel');
const sortCommandsByScope = require('./util/sortCommandsByScope');

/**
 * Logs a list of available commands
 *
 * @param {Object} commands : Object : All commands that should be shown
 * @returns {void}
 */
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
