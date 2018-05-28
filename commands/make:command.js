/**
 * Created on 26.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const {
    isEmpty,
    get,
    replace,
    keys,
} = require('lodash');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const getDirectory = require('../commandHelper/make:command/getDirectory');
const { resolvePathFromApp } = require('../src/util/paths');
const toCamelCase = require('../src/util/toCamelCase');

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
    const commandName = get(options, 'params[0]');
    const template = resolvePathFromApp('commandHelper/make:command/commandTemplate.txt');

    fs.readFile(template, 'utf8', (readError, data) => {
        if (readError) throw readError;

        let replacedTemplate = data;
        const replaceParams = {
            commandName,
            commandFunction: toCamelCase(commandName),
        };

        keys(replaceParams).forEach((replaceKey) => {
            replacedTemplate = replace(
                replacedTemplate,
                new RegExp(`<${replaceKey}>`, 'g'),
                replaceParams[replaceKey],
            );
        });

        /**
         * writes the new command
         * @return {void}
         */
        const writeOut = () => {
            fs.writeFile(path.resolve(directory, `${commandName}.js`), replacedTemplate, (writeError) => {
                if (writeError) throw writeError;

                console.log(chalk.white('Created command ')
                    + chalk.blue(commandName)
                    + chalk.white(' in directory ')
                    + chalk.magenta(directory));
            });
        };

        if (!fs.existsSync(directory)) {
            mkdirp(directory, (mkdirError) => {
                if (mkdirError) throw mkdirError;

                writeOut();
            });
        } else {
            writeOut();
        }
    });
}

module.exports = {
    description: 'Create a command template',
    command: makeCommand,
};
