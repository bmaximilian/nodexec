
const {
    isArray,
    isObject,
    assign,
    includes,
} = require('lodash');
const fs = require('fs');
const path = require('path');
const { sync: findUp } = require('find-up');
const { baseConfig: baseConfigPath, userConfig: userConfigPath } = require('./util/paths');
const isRelativePath = require('./util/isRelativePath');

/* eslint-disable import/no-dynamic-require, global-require */

const baseConfig = require(baseConfigPath);

let userConfig = null;
if (fs.existsSync(userConfigPath)) {
    userConfig = require(userConfigPath);
}

const folderConfigPath = findUp(['.nodexecrc', '.nodexecrc.json', '.nodexecrc.js']);
let folderConfig = null;
if (fs.existsSync(folderConfigPath)) {
    const folderConfigRaw = fs.readFileSync(folderConfigPath);

    try {
        folderConfig = JSON.parse(folderConfigRaw);
    } catch (e) {
        folderConfig = require(folderConfigPath);
    }
}

/**
 * Merges the configuration files
 * @param {Object} base : Object : The base configuration
 * @param {Object} merge : Object : The config that should be merged
 * @return {Object} : The merged configuration
 */
function mergeConfig(base = baseConfig, merge = [userConfig, folderConfig]) {
    if (!isObject(base)) {
        throw new Error('Parameter 1 needs to ba an object');
    }

    if (merge && !isObject(merge) && !isArray(merge)) {
        throw new Error('Parameter 2 needs to ba an object or array when provided');
    } else if (!merge) {
        return base;
    }

    let preparedMergeArray = !isArray(merge) ? [merge] : merge;
    preparedMergeArray = preparedMergeArray.filter(configItem => isObject(configItem));

    const mergedConfig = base;
    const mergeObject = preparedMergeArray.reduce(
        (acc, config) => assign({}, acc, config),
        {},
    );

    preparedMergeArray.forEach((configItem) => {
        if (isArray(mergedConfig.directories) && isObject(configItem) && isArray(configItem.directories)) {
            configItem.directories.forEach((directory) => {
                if (!includes(mergedConfig.directories, directory)) {
                    let preparedDirectory = directory;
                    if (configItem === folderConfig && isRelativePath(preparedDirectory)) {
                        preparedDirectory = path.resolve(path.dirname(folderConfigPath), preparedDirectory);
                    }
                    mergedConfig.directories.push(preparedDirectory);
                }
            });
        }
    });

    return assign(
        {},
        mergedConfig,
        assign(
            {},
            mergeObject,
            {
                directories: mergedConfig.directories,
            },
        ),
    );
}

module.exports = mergeConfig;
