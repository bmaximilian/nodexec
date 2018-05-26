/**
 * Created on 25.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { assign, sortBy, isObject } = require('lodash');
const formatScopeAndGetLevelForCommand = require('./formatScopeAndGetLevelForCommand');

/**
 * Sorts the commands by scope
 *
 * @param {Object} commands : Object : All command objects
 * @returns {Object} : The sorted command objects
 */
module.exports = function sortCommandsByScope(commands) {
    if (!isObject(commands)) {
        throw new Error('Parameter 1 must be of type Object');
    }

    return sortBy(commands, ['scope', 'name'])
        .map(command => assign(
            {},
            command,
            formatScopeAndGetLevelForCommand(command.scope),
        ));
};
