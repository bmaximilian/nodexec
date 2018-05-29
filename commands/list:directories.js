
const { get, isArray } = require('lodash');
const chalk = require('chalk');
const { userConfig: userConfigPath } = require('../src/util/paths');
const getUserConfig = require('../src/commandHelper/getUserConfig');

/**
 * list:dirs
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @param {Object} config : Object : The configuration from ~/.nodexec/config.json
 * @param {Object} command : Object : The exported command from this directory
 * @returns {void}
 */
function listDirectories(options, config, command) {
    const userConfig = getUserConfig();
    console.log();

    if (!userConfig) {
        console.warn(`No user config exists at ${userConfigPath}`);
    }

    const directories = get(userConfig, 'directories', []);

    if (!isArray(directories)) {
        throw new Error(`Directories must be an array in config ${userConfig}`);
    } else if (directories.length > 0) {
        console.log(chalk.magenta('Directories:'));

        directories.forEach((directory) => {
            console.log(`\t${chalk.white(directory)}`);
        });
        console.log();
    }
}

module.exports = {
    command: listDirectories,
    description: 'Lists the configured directories in the user config',
    scope: '/nodexec-settings',
};
