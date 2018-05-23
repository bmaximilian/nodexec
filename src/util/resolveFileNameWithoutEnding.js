/**
 * Resolves the file name without ending from a file name
 *
 * @param {String} filename : String : The file name with ending
 * @returns {String} : The file name without ending
 */
function resolveFileNameWithoutEnding(filename) {
    if (typeof filename !== 'string') {
        throw new Error('The file name must be a string.');
    }

    const buffer = filename.split('.');

    buffer.pop();

    return buffer.join();
}

module.exports = resolveFileNameWithoutEnding;
