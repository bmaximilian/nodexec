
const glob = require('glob');
const path = require('path');
const os = require('os');
const {
    isFunction,
    isString,
    isObject,
    get,
} = require('lodash');
const isRelativePath = require('./util/isRelativePath');
const resolveFileNameFromPathWithoutEnding = require('./util/resolveFileNameFromPathWithoutEnding');
const { resolvePathFromApp } = require('./util/paths');

/**
 * Imports all js files recursively in the passed directory
 *
 * @param {String} folderDir : String : The import directory
 * @returns {Object} : The imported commands
 */
function importFolder(folderDir) {
    if (!isString(folderDir)) {
        throw new Error('The passed parameter must be a string');
    }

    /* eslint-disable import/no-dynamic-require, global-require */
    let importPath = folderDir;
    const commands = {};

    if (folderDir.charAt(0) === '~') {
        importPath = `${os.homedir()}${folderDir.slice(1)}`;
    } else if (isRelativePath(folderDir)) {
        importPath = resolvePathFromApp(folderDir);
    }

    glob.sync(`${importPath}/**/*.js`).forEach((file) => {
        const requiredCommandObject = require(path.resolve(file));
        const commandName = resolveFileNameFromPathWithoutEnding(file);
        let commandObject = null;

        if (isFunction(requiredCommandObject)) {
            commandObject = {
                command: requiredCommandObject,
                name: commandName,
                description: '',
                scope: '/',
            };
        } else if (isObject(requiredCommandObject) && isFunction(requiredCommandObject.command)) {
            commandObject = {
                command: requiredCommandObject.command,
                name: commandName,
                description: get(requiredCommandObject, 'description', ''),
                scope: get(requiredCommandObject, 'scope', '/'),
            };
        }

        if (commandObject) {
            commands[commandName] = commandObject;
        }
    });

    return commands;
}

module.exports = importFolder;
