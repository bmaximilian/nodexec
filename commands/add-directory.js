
const {
    assign,
    get,
    isArray,
    has,
    isEmpty,
} = require('lodash');
const glob = require('glob');
const fs = require('fs');
const chalk = require('chalk');
const { userConfig: userConfigPath } = require('../src/util/paths');
const getDirectory = require('../src/commandHelper/make-command/getDirectory');
const getUserConfig = require('../src/commandHelper/getUserConfig');
const writeUserConfig = require('../src/commandHelper/writeUserConfig');

/**
 * Show the help output
 * @returns {void}
 */
function showHelp() {
    console.log(chalk.magenta('add:directory'));
    console.log();
    console.log(chalk.white('Add a command directory to the config'));
    console.log();
    console.log(chalk.magenta('Usage:'));
    console.log(chalk.blue('\tadd:directory <directory_path>'));
}

/**
 * add:directory
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @param {Object} config : Object : The configuration from ~/.nodexec/config.json
 * @param {Object} command : Object : The exported command from this directory
 * @returns {void}
 */
function addDirectory(options, config, command) {
    const userConfig = getUserConfig();
    if (!has(options, 'params') || !isArray(options.params) || isEmpty(options.params)) {
        console.error(chalk.red('No directory specified'));
        console.error();
        showHelp();
        process.exit(1);
        return;
    }

    if (options['-h'] || options['--help']) {
        showHelp();
        return;
    }

    console.log();

    if (!userConfig) {
        console.error(`No user config exists at ${chalk.red(userConfigPath)}`);
        console.error();
        console.error('Run nodexec config:create to create a configuration file');
        process.exit(1);
        return;
    }

    const newDirectory = getDirectory({ '-d': options.params[0] }, ['-d']);

    console.log(chalk.white('Adding directory ') + chalk.blue(newDirectory) + chalk.white(' to configuration...'));
    console.log();

    if (!fs.existsSync(newDirectory)) {
        console.error(`The specified path ${newDirectory} does not exist.`);
        process.exit(1);
        return;
    }

    try {
        glob.sync(`${newDirectory}/**/*.js`);
    } catch (e) {
        console.error(`The current user don't have read permissions on ${newDirectory} or it's subfolders`);
        process.exit(1);
        return;
    }

    const directories = get(userConfig, 'directories', []);
    directories.push(newDirectory);

    writeUserConfig(
        assign({}, userConfig, { directories }),
        false,
    ).then(
        () => {
            console.log(chalk.white('Added directory ') + chalk.green(newDirectory) + chalk.white(' to configuration'));
        },
        (err) => {
            throw err;
        },
    );
}

module.exports = {
    name: 'add:directory',
    command: addDirectory,
    description: 'Add a directory to the user configuration',
    scope: '/nodexec-settings',
    aliases: [],
};
