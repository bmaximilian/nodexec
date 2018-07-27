
const { isString } = require('lodash');
const run = require('./src/run');

/**
 * Run a command passed as string
 *
 * @param {String} command : String : The passed command (like on the cli)
 * @return {*} : The return value of the command
 */
function nodexec(command = '') {
    if (!isString(command)) {
        throw new Error('The passed command needs to be a string');
    }

    const [enteredCommand, ...options] = command.split(' ');

    return run(enteredCommand, options);
}

module.exports = nodexec;
