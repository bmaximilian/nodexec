const { isArray, assign, get } = require('lodash');
const importFolder = require('./importFolder');

/**
 * Imports all js files from the configured directories to make them available as commands
 *
 * @param {Object} config : Object : The merged configuration
 * @return {Object} : Returns an object with all commands
 */
function getCommands(config) {
    let commands = {};
    const directories = get(config, 'directories', []);

    if (!isArray(directories)) {
        throw new Error('directories must be an array');
    }

    directories.forEach((directory) => {
        commands = assign(
            commands,
            importFolder(directory),
        );
    });

    return commands;
}

module.exports = getCommands;
