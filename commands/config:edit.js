const { get, isEmpty } = require('lodash');
const commandExists = require('command-exists').sync;
const childProcess = require('child_process');
const chalk = require('chalk');
const fs = require('fs');
const { userConfig: userConfigPath } = require('../src/util/paths');

/**
 * Show the help output
 * @returns {void}
 */
function showHelp() {
    console.log(chalk.magenta('config:edit'));
    console.log();
    console.log(chalk.white('Edit the configuration with your preferred editor'));
    console.log();
    console.log(chalk.magenta('Usage:'));
    console.log(chalk.blue('\tconfig:edit'));
}

/**
 * config:edit
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @param {Object} config : Object : The configuration from ~/.nodexec/config.json
 * @param {Object} command : Object : The exported command from this directory
 * @returns {void}
 */
function configEdit(options, config, command) {
    const editor = get(config, 'editor');

    if (options['-h'] || options['--help']) {
        showHelp();
        return;
    }

    if (!editor || isEmpty(editor)) {
        console.error('You haven\'t specified an editor');
        console.error();
        console.error(`Run ${chalk.blue('nodexec set:editor')} to specify a desired editor`);
        process.exit(1);
        return;
    }

    if (!commandExists(editor)) {
        console.error(`It seems like your desired editor ${chalk
            .red(editor)} is not installed or available over the command line.`);
        process.exit(1);
        return;
    }

    if (!fs.existsSync(userConfigPath)) {
        console.error(`No configuration is available at ${chalk.red(userConfigPath)}.`);
        console.error();
        console.error(`Run ${chalk.blue('nodexec config:create')} to create a config file,`);
        process.exit(1);
        return;
    }

    childProcess.spawn(editor, [userConfigPath], {
        stdio: 'inherit',
        detached: true,
    });
}

module.exports = {
    command: configEdit,
    description: 'Edit the configuration with your preferred editor',
    scope: '/nodexec-settings',
};
