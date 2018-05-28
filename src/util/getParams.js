/**
 * Created on 28.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const {
    get,
    isObject,
    isArray,
} = require('lodash');

/**
 * Resolves the specified parameters from options object
 * @param {Object} options : Object : The options
 * @param {String[]} params : String[] : The parameters (alter elements will be fallback)
 * @returns {String} : The desired parameter
 */
module.exports = function getParams(options, params) {
    if (!isObject(options)) {
        throw new Error('Parameter 1 must be of type object');
    }

    if (!isArray(params)) {
        throw new Error('Parameter 2 must be of type array');
    }

    let outputBuffer = null;

    for (let i = 0; i < params.length; i += 1) {
        outputBuffer = get(options, params[i], null);

        if (outputBuffer !== null) {
            break;
        }
    }

    return outputBuffer;
};
