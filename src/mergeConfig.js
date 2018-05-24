
const {
    isArray, isObject, assign, includes,
} = require('lodash');
const fs = require('fs');
const { baseConfig: baseConfigPath, userConfig: userConfigPath } = require('./util/paths');

/* eslint-disable import/no-dynamic-require, global-require */

const baseConfig = require(baseConfigPath);

let userConfig = null;
if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
}

/**
 * Merges the configuration files
 * @param {Object} base : Object : The base configuration
 * @param {Object} merge : Object : The config that should be merged
 * @return {Object} : The merged configuration
 */
function mergeConfig(base = baseConfig, merge = userConfig) {
    if (!isObject(base)) {
        throw new Error('Parameter 1 needs to ba an object');
    }

    if (merge && !isObject(merge)) {
        throw new Error('Parameter 2 needs to ba an object when provided');
    }

    const mergedConfig = base;

    if (isArray(mergedConfig.directories) && isObject(merge) && isArray(merge.directories)) {
        merge.directories.forEach((directory) => {
            if (!includes(mergedConfig.directories, directory)) {
                mergedConfig.directories.push(directory);
            }
        });
    }

    return assign(
        {},
        mergedConfig,
        assign(
            {},
            merge,
            {
                directories: mergedConfig.directories,
            },
        ),
    );
}

module.exports = mergeConfig;
