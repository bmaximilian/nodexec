/**
 * Determines if a path is relative or not
 *
 * @param {String} path : String : The path to analyze
 * @returns {boolean} : Returns true when the path is relative otherwise false
 */
function isRelativePath(path) {
    if (typeof path !== 'string') {
        throw new Error('The path must be a string.');
    }

    return path.charAt(0) !== '/';
}

module.exports = isRelativePath;
