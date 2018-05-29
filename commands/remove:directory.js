
const {
    assign,
    get,
    isArray,
    has,
    isEmpty,
    includes,
} = require('lodash');
const chalk = require('chalk');
const { userConfig: userConfigPath } = require('../src/util/paths');
const getDirectory = require('../commandHelper/make:command/getDirectory');
const getUserConfig = require('../commandHelper/getUserConfig');
const writeUserConfig = require('../commandHelper/writeUserConfig');

/**
 * Show the help output
 * @returns {void}
 */
function showHelp() {
    console.log(chalk.magenta('remove:directory'));
    console.log();
    console.log(chalk.white('Remove a command directory from the config'));
    console.log();
    console.log(chalk.magenta('Usage:'));
    console.log(chalk.blue('\tremove:directory <directory_path>'));
}

/**
 * remove:directory
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @param {Object} config : Object : The configuration from ~/.nodexec/config.json
 * @param {Object} command : Object : The exported command from this directory
 * @returns {void}
 */
function removeDirectory(options, config, command) {
    const userConfig = getUserConfig();
    if (!has(options, 'params') || !isArray(options.params) || isEmpty(options.params)) {
        console.error('No config specified');
        showHelp();
    }

    console.log();

    if (!userConfig) {
        console.error(`No user config exists at ${userConfigPath}`);
        console.error();
        console.error('Run nodexec config:create to create a configuration file');
        return;
    }

    const directoryToRemove = getDirectory({ '-d': options.params[0] }, ['-d']);

    console.log(chalk.white('Removing directory ')
        + chalk.blue(directoryToRemove)
        + chalk.white(' from configuration...'));
    console.log();

    const directories = get(userConfig, 'directories', []);

    if (!includes(directories, directoryToRemove)) {
        console.error(`The specified path ${directoryToRemove} does not exist in config.`);
        console.error(`Run ${chalk.blue('nodexec list:directories')} to show all available directories.`);
        return;
    }

    writeUserConfig(
        assign(
            {},
            userConfig,
            {
                directories: directories.filter(dirName => dirName !== directoryToRemove),
            },
        ),
        false,
    ).then(
        () => {
            console.log(chalk.white('Removed directory ')
                + chalk.green(directoryToRemove)
                + chalk.white(' from configuration'));
        },
        (err) => {
            throw err;
        },
    );
}

module.exports = {
    command: removeDirectory,
    description: 'Remove a directory from the user configuration',
    scope: '/system',
};
