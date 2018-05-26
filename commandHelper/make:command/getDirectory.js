/**
 * Created on 26.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { has, get, isObject } = require('lodash');
const path = require('path');
const isRelativePath = require('../../src/util/isRelativePath');

/**
 * Resolves the file directory
 * @param {Object} options : Object : The options
 * @returns {String} : The desired directory
 */
module.exports = function getDirectory(options) {
    if (!isObject(options)) {
        throw new Error('Parameter 1 must be of type object');
    }

    let directory = process.cwd();

    if (has(options, '-d') || has(options, '--directory')) {
        directory = get(options, '-d', get(options, '--directory', directory));
    }

    if (isRelativePath(directory)) {
        directory = path.resolve(process.cwd(), directory);
    }

    return directory;
};
