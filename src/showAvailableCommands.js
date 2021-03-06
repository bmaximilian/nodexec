
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

    sortedCommands
        .filter(command => !command.isAlias)
        .forEach((commandObject) => {
            const tabs = getTabsForLevel(commandObject.level);

            if (commandObject.scope !== currentScope) {
                console.log();
                console.log(`${tabs}${chalk.magenta(commandObject.scope)}`);

                currentScope = commandObject.scope;
            }

            if (isEmpty(commandObject.description)) {
                console.log(`\t${tabs}${chalk.blue(commandObject.name)}`);
            } else {
                const commandName = chalk.blue(commandObject.name);
                const commandDescription = chalk.white(commandObject.description);
                let spacing = '\t\t';

                if (commandObject.name.length > 13) {
                    spacing = '\t';
                }

                const commandString = `${commandName}${spacing}- ${commandDescription}`;

                console.log(`\t${tabs}${commandString}`);
            }
        });
}

module.exports = showAvailableCommands;
