
const { assign } = require('lodash');
const fs = require('fs');
const { baseConfig: baseConfigPath, userConfig: userConfigPath } = require('./util/paths');
const baseConfig = require(baseConfigPath);

let userConfig = null;
if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
}

function mergeConfig() {
  return assign({}, baseConfig, userConfig);
}

module.exports = mergeConfig;
