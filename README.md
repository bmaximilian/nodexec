# Nodexec

[![Build Status](https://travis-ci.org/bmaximilian/nodexec.svg?branch=master)](https://travis-ci.org/bmaximilian/nodexec)
[![Coverage Status](https://coveralls.io/repos/github/bmaximilian/nodexec/badge.svg?branch=master)](https://coveralls.io/github/bmaximilian/nodexec?branch=master)
[![npm](https://img.shields.io/npm/v/nodexec.svg)](https://www.npmjs.com/package/nodexec)
[![License](https://img.shields.io/github/license/bmaximilian/nodexec.svg)](https://github.com/bmaximilian/nodexec/blob/master/LICENSE)

A command line executor for javascript files.

> Build better cli commands with JavaScript

## Installation

    $ npm i -g nodexec

## Usage

    $ nodexec say:hello -w world
    
If no matching command name can be found, the help function is executed and all available commands are showed.
    
## Configuration

Nodexec creates a configuration directory in your home directory: `~/.nodexec`. Every user specific configuration will be stored there.

Nodexec creates also a empty configuration file `~/.nodexec/config.json`. You can extend this config.json with your own configuration options.

### Configuration options

You can use the following configuration options by default

#### directories

Specify the directories of your JavaScript commands. Every `.js`-File in this directory and sub directories will be available by calling `nodexec name-of-the-file-without-ending`.
Commands from previous directories with the same name will be overwritten.

You can simply add a directory with the following command:

    $ nodexec add:directory <command_name> 
    
You can list all configured directories with:

    $ nodexec list:directories
    
You can delete a directory with:

    $ nodexec remove:directory

If you edit the `config.json`, you should specify absolute paths or path relative to your home directory (starting with `~`)

Example:
```json
{
    "directories": [
        "~/user/home/path/to/my/commands",
        "/absolute/path/to/my/commands"
    ]
}
```

## Creating a command

You should write your command in **ES5**. Nothing will be compiled or transpiled.

I recommend creating a project whith a `commands/` subdirectory where all the js files for the commands are stored.
The path specified in `config.json.directories` should point to that `commands/` directory.
(That is recommended because you can create other folders in your project to specify cross-command helper functions or to make use of node_modules.
Helper functions and node_modules should not be called with `nodexec`)

The name of the file in the `commands` directory will be also the name of the `nodexec` command. (i.e. `hello-world.js` can be called with `nodexec hello-world`).
Every character after the command name (`process.argv`) will be parsed into an options object and is passed to the first argument of the function.

The following command will create a js file from a command template:

    $ nodexec make:command <command_name> [-d]

### Interface

The command should be oriented at the following interface:

```typescript
interface ICommand {
  command: (options: object, config: object, command: object) => void;
  description: string;
  scope: string;
}
```

#### Command

The command is a (void) function with three arguments:
1. options: The parsed `process.argv` options
1. config: The merged `config.json` (base config merged with the config in user home)
1. command: The object exported from the command file

#### Description

The description of the command which is displayed in the help function where every available command is showed.

#### Scope

The namespace of the command. (only important for the help function).
The namespace specifies a bit of the sort order. It does not prevent overriding commands with a different namespace.
Namespaces can be nested by separating them with a slash (`/`).

Every command is called without a namespace.


## Contributing

If you also want to do your part to this package, you are free to do that.
Clone the repository:

    $ git clone git@github.com:bmaximilian/nodexec.git
    
You need to `cd` into the project directory:

    $ cd nodexec

Then you should run the setup script:

    $ setup/00-setup.sh
    
You can't commit to the master branch and it is recommended to open a new branch for every feature (or bug fix).
The branch name could be a version number or something like that.
Create a new branch:

    $ git branch branch_name
    $ git push --set-upstream origin/branch_name
    
**Open the project in your favorite editor and start coding** :relieved:

Commit your changes as often as you can:

    $ git add .
    $ git commit -m "branch_name: my_changes_in_this_commit"

Push your commits to save everything on GitHub:

    $ git push
    
If you think that your bug fix or new feature is finished, open a [Pull Request at GitHub](https://github.com/bmaximilian/nodexec/pulls)
and some of the Owners/Administrators will review and merge it.