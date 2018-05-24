
const { isString, isEmpty } = require('lodash');

/**
 * Reads the file name from the submitted path
 *
 * @param {String} path : String : The path to analyze
 * @returns {String|null} : The filename if the path has a filename otherwise null
 */
function resolveFileNameFromPath(path) {
    if (!isString(path)) {
        throw new Error('The path must be a string.');
    }

    const tree = path.split('/');

    if (tree && tree.length > 0) {
        const file = tree[tree.length - 1];
        return isString(file) && !isEmpty(file) ? file : null;
    }

    return null;
}

module.exports = resolveFileNameFromPath;
