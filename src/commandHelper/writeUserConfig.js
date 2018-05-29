/**
 * Created on 29.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const { userConfig: userConfigPath } = require('../util/paths');

/**
 * Creates the user config
 * @param {Object} config : Object : The config to write out
 * @param {Boolean} createFolderIfNotExists : Boolean : determines if the folder should be created
 * @returns {Promise<any>} : A promise that is resolved when the config is written
 */
function writeUserConfig(config, createFolderIfNotExists = true) {
    return new Promise((resolve, reject) => {
        /**
         * Wirtes the final config
         * @param {Object} finalConfigObject : Object : The config to write out
         * @returns {void}
         */
        const writeOut = (finalConfigObject) => {
            fs.writeFile(userConfigPath, JSON.stringify(finalConfigObject, null, 2), (writeError) => {
                if (writeError) {
                    reject(writeError);
                }

                resolve();
            });
        };

        const directoryExists = fs.existsSync(userConfigPath);
        if (!directoryExists && createFolderIfNotExists) {
            mkdirp(path.dirname(userConfigPath), (mkdirError) => {
                if (mkdirError) {
                    reject(mkdirError);
                }

                writeOut(config);
            });
        } else if (directoryExists) {
            writeOut(config);
        } else {
            reject(new Error(`Could not write ${userConfigPath}. Directory not existing`));
        }
    });
}

module.exports = writeUserConfig;
