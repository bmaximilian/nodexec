/**
 * Created on 14.08.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isString, isObject, isArray } = require('lodash');

/**
 * Trims the name
 *
 * @param {String} name : String : The string to trim
 * @return {string} : The trimmed string
 */
function trimName(name) {
    return name.toString().replace(/\s/g, '');
}

/**
 *
 * @param {String} commandNameFromFile : String : The command name from file
 * @param {Object} commandObject : Object : The exported command object
 * @returns {string[]} : The possible command names
 */
function getCommandNames(commandNameFromFile, commandObject) {
    const output = [];

    if (isString(commandNameFromFile)) {
        output.push(trimName(commandNameFromFile));
    }

    if (isObject(commandObject)) {
        if (isString(commandObject.name)) {
            output.push(trimName(commandObject.name));
        }

        if (isArray(commandObject.aliases)) {
            commandObject.aliases.forEach((commandName) => {
                if (isString(commandName)) {
                    output.push(trimName(commandName));
                }
            });
        }
    }

    return output;
}

module.exports = getCommandNames;
