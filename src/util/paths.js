const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

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
  userConfig: path.resolve('~', '.nrun/config.json'),
};
