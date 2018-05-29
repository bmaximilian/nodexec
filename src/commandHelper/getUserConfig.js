/**
 * Created on 28.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const fs = require('fs');
const { userConfig: userConfigPath } = require('../util/paths');

/**
 * Returns the user config
 * @returns {Object|null} : The user config
 */
function getUserConfig() {
    let userConfig = {};

    if (fs.existsSync(userConfigPath)) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        userConfig = require(userConfigPath);
    }

    return userConfig;
}

module.exports = getUserConfig;
