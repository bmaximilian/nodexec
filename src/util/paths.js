const fs = require('fs');
const path = require('path');
const os = require('os');

const [ nodePath, indexFilePath ] = process.argv;
const appDirectory = path.dirname(indexFilePath);

/**
 * Resolves a path in the app directory
 * @param {String} relativePath : String : The path relative to app directory
 * @return {string} : The absolute path
 */
function resolvePathFromApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appDirectory,
  resolvePathFromApp,
  baseConfig: resolvePathFromApp('baseConfig.json'),
  userConfig: `${os.homedir()}/.nodexec/config.json`,
};
