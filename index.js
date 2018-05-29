#!/usr/bin/env node

const { isFunction, get, isEmpty } = require('lodash');
const chalk = require('chalk');
const getCommands = require('./src/getCommands');
const mergeConfig = require('./src/mergeConfig');
const parseOptions = require('./src/util/parseOptions');
const findMatchingCommands = require('./src/util/findMatchingCommands');
const showAvailableCommands = require('./src/showAvailableCommands');

const [_1, _2, enteredCommand, ...options] = process.argv;
const config = mergeConfig();
const commands = getCommands(config);

if (isFunction(get(commands, `${enteredCommand}.command`))) {
    commands[enteredCommand].command(parseOptions(options), config, commands[enteredCommand]);
} else {
    console.log(chalk.magenta('Nodexec'));
    console.log();

    if (enteredCommand) {
        const relatedCommands = findMatchingCommands(commands, enteredCommand);

        console.log(chalk.red('No command found for ') + chalk.blue(enteredCommand));
        console.log();

        if (!isEmpty(relatedCommands) && enteredCommand.length > 1) {
            const commandMessageSingular = 'The most similar command is:';
            const commandMessagePlural = 'The most similar commands are:';

            console.log(chalk.magenta(relatedCommands.length === 0 ? commandMessageSingular : commandMessagePlural));

            relatedCommands.forEach((relatedCommand) => {
                console.log(`\t${chalk.blue(relatedCommand)}`);
            });

            console.log();
        }
    }

    showAvailableCommands(commands);
}
