/**
 * Created on 25.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isString, isEmpty } = require('lodash');

/**
 * Returns the displayed namespace and the level of depth from the passed scope
 *
 * @param {String} scope : String : The scope
 * @returns {{scope: String, level: Number}} : The displayed namespace and the level of depth
 */
module.exports = function formatScopeAndGetLevelForCommand(scope) {
    if (!isString(scope)) {
        throw new Error('The scope must be a string');
    }

    const buffer = scope.split('/').filter(namespace => !isEmpty(namespace));

    return {
        scope: isEmpty(buffer) ? '' : buffer[buffer.length - 1],
        level: buffer.length,
    };
};
