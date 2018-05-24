
const { isString } = require('lodash');
const resolveFileNameWithoutEnding = require('./resolveFileNameWithoutEnding');
const resolveFileNameFromPath = require('./resolveFileNameFromPath');

/**
 * Resolves the file name without format from the passed path
 *
 * @param {String} path : String : The path to analyze
 * @returns {String} : The file name without ending (format)
 */
function resolveFileNameFromPathWithoutEnding(path) {
    const fileName = resolveFileNameFromPath(path);

    return resolveFileNameWithoutEnding(isString(fileName) ? fileName : '');
}

module.exports = resolveFileNameFromPathWithoutEnding;
