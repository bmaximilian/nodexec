const { isString, isEmpty } = require('lodash');

/**
 * Resolves the file name without ending from a file name
 *
 * @param {String} filename : String : The file name with ending
 * @returns {String} : The file name without ending
 */
function resolveFileNameWithoutEnding(filename) {
    if (!isString(filename)) {
        throw new Error('The file name must be a string.');
    }

    if (isEmpty(filename) || filename.charAt(filename.length - 1) === '/') {
        return null;
    }

    const buffer = filename.split('.');

    if (buffer.length > 1 && !(buffer.length === 2 && buffer[0] === '')) {
        buffer.pop();
    }

    return buffer.join('.');
}

module.exports = resolveFileNameWithoutEnding;
