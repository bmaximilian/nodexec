/**
 * Created on 27.07.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { isFunction, get } = require('lodash');
const getCommands = require('../src/getCommands');
const mergeConfig = require('../src/mergeConfig');
const parseOptions = require('../src/util/parseOptions');

/**
 * Runs a nodexec command
 *
 * @param {String} enteredCommand : String : The command to run
 * @param {Array} options : Array : process.argv - The arguments
 * @return {*} : The return value if the command
 */
function run(enteredCommand, options) {
    const config = mergeConfig();
    const commands = getCommands(config);

    if (!isFunction(get(commands, `${enteredCommand}.command`))) {
        return {
            config,
            commands,
            error: new Error(`Command "${enteredCommand}" not found or is no function.`),
        };
    }

    return commands[enteredCommand].command(parseOptions(options), config, commands[enteredCommand]);
}

module.exports = run;
