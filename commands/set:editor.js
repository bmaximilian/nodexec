
const commandExists = require('command-exists').sync;
const chalk = require('chalk');
const inquirer = require('inquirer');
const { get, isEmpty, assign } = require('lodash');
const getUserConfig = require('../src/commandHelper/getUserConfig');
const writeUserConfig = require('../src/commandHelper/writeUserConfig');
const { userConfig: userConfigPath } = require('../src/util/paths');
const getParams = require('../src/util/getParams');

const supportedEditors = [
    'vim',
    'vi',
    'nano',
    'atom',
    'sublime',
];

/**
 * Show the help output
 * @returns {void}
 */
function showHelp() {
    console.log(chalk.magenta('set:editor'));
    console.log();
    console.log(chalk.white('Set your preferred editor'));
    console.log();
    console.log(chalk.magenta('Usage:'));
    console.log(chalk.blue('\tset:editor [-e]'));
    console.log(chalk.white('\t\t-e\t\t-\tThe desired editor'));
    console.log(chalk.white('\t\t--editor\t-\tThe desired editor'));
}

/**
 * Writes the passed editor to the config
 * @param {Object} config : Object
 * @param {String} editor : Editor
 * @return {void}
 */
function writeEditorOut(config, editor) {
    if (!commandExists(editor)) {
        console.error(`It seems like your desired editor ${chalk
            .red(editor)} is not installed or available over the command line.`);

        process.exit(1);
        return;
    }

    writeUserConfig(
        assign(
            {},
            config,
            {
                editor,
            },
        ),
        false,
    ).then(
        () => {
            console.log();
            console.log(chalk.white('Changed editor to ') + chalk.green(editor));
        },
        (err) => {
            throw err;
        },
    );
}

/**
 * set:editor
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @param {Object} config : Object : The configuration from ~/.nodexec/config.json
 * @param {Object} command : Object : The exported command from this directory
 * @returns {void}
 */
function setEditor(options, config, command) {
    const custom = 'I want a custom editor';
    const availableEditors = supportedEditors.filter(editorCommand => commandExists(editorCommand));
    const userConfig = getUserConfig();
    let desiredEditor = getParams(options, ['-e', '--editor']);

    availableEditors.push(custom);

    if (availableEditors[0] === 'custom') {
        console.error(chalk.red('It seems like you don\'t have any editors installed.'));
        console.error();
        console.error('You need an editor that is available over the command line');
        process.exit(1);
        return;
    }

    let currentEditor = get(config, 'editor', '');
    if (isEmpty(currentEditor)) {
        currentEditor = availableEditors[0];
    }

    if (options['-h'] || options['--help']) {
        showHelp();
        return;
    }

    if (!userConfig) {
        console.error(`No user config exists at ${chalk.red(userConfigPath)}`);
        console.error();
        console.error('Run nodexec config:create to create a configuration file');
        process.exit(1);
        return;
    }

    if (desiredEditor && !commandExists(desiredEditor)) {
        console.error(`The desired editor ${chalk.red(desiredEditor)} could not be found.`);
        console.error();
        console.error('You need an editor that is available over the command line');
        process.exit(1);
        return;
    }

    if (!desiredEditor) {
        console.log('Select an editor that is available via the command line');
        console.log();

        const questions = [
            {
                type: 'list',
                name: 'chosenEditor',
                message: 'Which editor do you prefer?',
                default: currentEditor,
                choices: availableEditors,
            },
        ];

        const prompt = inquirer.createPromptModule();

        prompt(questions).then(
            (answers) => {
                desiredEditor = get(answers, 'chosenEditor', desiredEditor);

                if (desiredEditor === custom) {
                    prompt([
                        {
                            message: 'What is your custom editor?',
                            name: 'customEditorName',
                        },
                    ])
                        .then(
                            (inputAnswers) => {
                                const customEditor = get(inputAnswers, 'customEditorName');
                                if (customEditor && commandExists(customEditor)) {
                                    desiredEditor = customEditor;
                                    writeEditorOut(userConfig, desiredEditor);
                                } else {
                                    console.error(`It seems like your desired editor ${chalk
                                        .red(customEditor)} is not installed or available over the command line.`);

                                    process.exit(1);
                                }
                            },
                            (err) => {
                                throw err;
                            },
                        );
                } else {
                    writeEditorOut(userConfig, desiredEditor);
                }
            },
            (err) => {
                throw err;
            },
        );
    } else {
        writeEditorOut(userConfig, desiredEditor);
    }
}

module.exports = {
    command: setEditor,
    description: 'Change the preferred editor nodexec uses to open files',
    scope: '/',
};
