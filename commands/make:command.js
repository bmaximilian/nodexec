/**
 * Created on 26.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isEmpty } = require('lodash');
const chalk = require('chalk');
const getDirectory = require('../commandHelper/make:command/getDirectory');

/**
 * Show the help output
 * @returns {void}
 */
function showHelp() {
    console.log(chalk.magenta('make:command'));
    console.log();
    console.log(chalk.magenta('Usage:'));
    console.log(chalk.blue('\tmake:command <command_name> [-d]'));
    console.log(chalk.white('\t\t-d\t\t-\tThe desired directory'));
    console.log(chalk.white('\t\t--directory\t-\tThe desired directory'));
}

/**
 * Create a command from a template in the current folder or the specified folder
 * @param {Object} options : Object : The parsed options
 * @returns {void}
 */
function makeCommand(options) {
    if (isEmpty(options) || isEmpty(options.params)) {
        showHelp();
        return;
    }

    const directory = getDirectory(options);

    console.log(directory);
}

module.exports = {
    description: 'Create a command template',
    command: makeCommand,
};
