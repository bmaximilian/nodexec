#!/usr/bin/env node
/**
 * Created on 27.07.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { get, isEmpty } = require('lodash');
const chalk = require('chalk');
const run = require('../src/run');
const findMatchingCommands = require('../src/util/findMatchingCommands');
const showAvailableCommands = require('../src/showAvailableCommands');

const [_1, _2, enteredCommand, ...options] = process.argv;

const output = run(enteredCommand, options);

if (output.error) {
    const commands = get(output, 'commands', {});

    console.log(chalk.blue('nodexec'));
    console.log();

    if (enteredCommand) {
        const relatedCommands = findMatchingCommands(commands, enteredCommand);

        console.log(chalk.red('No command found for ') + chalk.blue(enteredCommand));
        console.log();

        if (!isEmpty(relatedCommands) && enteredCommand.length > 1) {
            const commandMessageSingular = 'The most similar command is:';
            const commandMessagePlural = 'The most similar commands are:';

            console.log(chalk.magenta(relatedCommands.length === 1 ? commandMessageSingular : commandMessagePlural));

            relatedCommands.forEach((relatedCommand) => {
                console.log(`\t${chalk.blue(relatedCommand)}`);
            });

            console.log();
        }
    }

    showAvailableCommands(commands);
}
