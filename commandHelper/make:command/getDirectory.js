/**
 * Created on 26.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isObject } = require('lodash');
const path = require('path');
const isRelativePath = require('../../src/util/isRelativePath');
const getParams = require('./getParams');

/**
 * Resolves the file directory
 * @param {Object} options : Object : The options
 * @param {Array} params : Array : The params to get the directory from
 * @returns {String} : The desired directory
 */
module.exports = function getDirectory(options, params = ['-d', '--directory']) {
    if (!isObject(options)) {
        throw new Error('Parameter 1 must be of type object');
    }

    let directory = getParams(options, params);

    if (!directory) {
        directory = process.cwd();
    }

    if (isRelativePath(directory)) {
        directory = path.resolve(process.cwd(), directory);
    }

    return directory;
};
