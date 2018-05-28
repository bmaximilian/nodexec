/**
 * Created on 27.05.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { includes, isString } = require('lodash');

/**
 * Converts a string separated by these characters "_ : -" to camel case string
 *
 * @param {String} string : String : The string to convert
 * @return {string} : The converted string
 */
module.exports = function toCamelCase(string) {
    if (!isString(string)) {
        throw new Error('Parameter 1 needs to be a string');
    }

    const str = string.toString().trim();
    if (str === str.toString().toUpperCase()) {
        return str;
    }

    const filteredCharacters = '_:-';
    const savedCharactersAtStart = '_';

    // save starting low dashes
    let first = '';
    let execString = str;
    while (includes(execString.toString().charAt(0), savedCharactersAtStart)) {
        first += execString.toString().charAt(0);
        execString = execString.toString().slice(1);
    }

    // Convert string to camelCase
    execString = execString.replace(
        new RegExp(`[${filteredCharacters}]+([^${filteredCharacters}]+)`, 'g'),
        (whole, match) => match.charAt(0).toUpperCase() + match.slice(1),
    );

    const out = first + execString;
    return out.length > first.length ? out : str;
};
