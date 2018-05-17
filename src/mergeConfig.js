
const { isArray, isObject, assign, includes } = require('lodash');
const fs = require('fs');
const { baseConfig: baseConfigPath, userConfig: userConfigPath } = require('./util/paths');
const baseConfig = require(baseConfigPath);

let userConfig = null;
if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
}

function mergeConfig() {
  const mergedConfig = baseConfig;

  if (isArray(mergedConfig.directories) && isObject(userConfig) && isArray(userConfig.directories)) {
    userConfig.directories.forEach((directory) => {
      if (!includes(mergedConfig.directories, directory)) {
        mergedConfig.directories.push(directory);
      }
    });
  }

  return assign({}, userConfig, mergedConfig);
}

module.exports = mergeConfig;
