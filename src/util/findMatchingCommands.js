/**
 * Created on 29.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { keys, isObject, isString } = require('lodash');
const Fuse = require('fuse.js');

/**
 * Finds matching commands
 * @param {Object} commands : Object : All commands
 * @param {String} searchedCommand : String : The searched string
 * @returns {String[]} : The found list of commands
 */
function findMatchingCommands(commands, searchedCommand) {
    if (!isObject(commands)) {
        throw new Error('Parameter 1 needs to be of type object');
    }

    if (!isString(searchedCommand)) {
        throw new Error('Parameter 2 needs to be of type string');
    }

    const options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 64,
        minMatchCharLength: 1,
        keys: [
            'name',
        ],
    };

    const formattedCommands = keys(commands).map(name => ({ name }));
    const fuse = new Fuse(formattedCommands, options);

    return fuse.search(searchedCommand).map(resultObject => resultObject.name);
}

module.exports = findMatchingCommands;
