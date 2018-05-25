/**
 * Created on 25.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isInteger } = require('lodash');

/**
 * Returns a specific amount of tab characters
 *
 * @param {Number} level : Number : the amount of tab characters
 * @returns {String} : A string with these tab characters
 */
module.exports = function getTabsForLevel(level) {
    if (!isInteger(level)) {
        throw new Error('Parameter 1 must be of type Integer');
    }

    let tabs = '';

    for (let i = 0; i < level; i += 1) {
        tabs += '\t';
    }

    return tabs;
};
