
const {
    assign,
    sortBy,
    isEmpty,
    isString,
} = require('lodash');
const chalk = require('chalk');

/**
 * Returns a specific amount of tab characters
 *
 * @param {Number} level : Number : the amount of tab characters
 * @returns {String} : A string with these tab characters
 */
function getTabsForLevel(level) {
    let tabs = '';

    for (let i = 0; i < level; i += 1) {
        tabs += '\t';
    }

    return tabs;
}

/**
 * Returns the displayed namespace and the level of depth from the passed scope
 *
 * @param {String} scope : String : The scope
 * @returns {{scope: String, level: Number}} : The displayed namespace and the level of depth
 */
function formatScopeAndGetLevelForCommand(scope) {
    if (!isString(scope)) {
        throw new Error('The scope must be a string');
    }

    const buffer = scope.split('/').filter(namespace => !isEmpty(namespace));

    return {
        scope: isEmpty(buffer) ? '' : buffer[buffer.length - 1],
        level: buffer.length,
    };
}

/**
 * Sorts the commands by scope
 *
 * @param {Object[]} commands : Object[] : All command objects
 * @returns {Object[]} : The sorted command objects
 */
function sortCommandsByScope(commands) {
    return sortBy(commands, ['scope', 'name'])
        .map(command => assign(
            {},
            command,
            formatScopeAndGetLevelForCommand(command.scope),
        ));
}

/**
 * Logs a list of available commands
 *
 * @param {Object[]} commands : Object[] : All commands that should be shown
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
