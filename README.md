# Nodexec

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

You should specify absolute paths or path relative to your home directory (starting with `~`)

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

You should write your command in **CommonJS**. Nothing will be compiled or transpiled.

I recommend creating a project whith a `commands/` subdirectory where all the js files for the commands are stored.
The path specified in `config.json.directories` should point to that `commands/` directory.
(That is recommended because you can create other folders in your project to specify cross-command helper functions or to make use of node_modules.
Helper functions and node_modules should not be called with `nodexec`)

The name of the file in the `commands` directory will be also the name of the `nodexec` command. (i.e. `hello-world.js` can be called with `nodexec hello-world`).
Every character after the command name (`process.argv`) will be parsed into an options object and is passed to the first argument of the function.

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
The namespace specifies a bit of the sort order and prevents overriding commands with a different namespace.
Namespaces can be nested by separating them with a slash (`/`)