const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const { userConfig: userConfigPath } = require('../src/util/paths');

/**
 * Creates the nodexec configuration file
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @returns {void}
 */
function createConfig(options) {
    const initialConfig = {};

    /**
     * Writes the config
     * @returns {void}
     */
    const writeOut = () => {
        fs.writeFile(userConfigPath, JSON.stringify(initialConfig, null, 2), (writeError) => {
            if (writeError) throw writeError;

            console.log(`${userConfigPath} written successfully.`);
        });
    };

    const configExists = fs.existsSync(userConfigPath);
    if (!configExists) {
        mkdirp(path.dirname(userConfigPath), (mkdirError) => {
            if (mkdirError) throw mkdirError;

            writeOut();
        });
    } else if (options['-f'] || options['--force']) {
        writeOut();
    } else if (!options['--silent'] && !options['-s']) {
        console.log(`There is already a config at ${userConfigPath}.`);
        console.log('Use -f to overwrite');
    }
}

module.exports = {
    description: 'Creates the config directory in the user home and adds a empty config file.',
    command: createConfig,
    scope: '/system',
};
