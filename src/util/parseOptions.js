
const { assign, isArray, isString } = require('lodash');

/**
 * Parses the options from process.argv to a object
 *
 * @param {String[]} optionArray : String[] : process.argv without the first 3 parameters
 * @returns {{ params: String[] } | Object} : The parameters (everything that can't be parsed is passed to params)
 */
function parseOptions(optionArray) {
    let buffer = {
        params: [],
    };
    let optionAccumulator = {
        param: null,
        value: null,
    };

    if (!isArray(optionArray)) {
        throw new Error('Options must be passed as array');
    }

    let isEven = true;
    optionArray.forEach((option, i) => {
        optionAccumulator[isEven ? 'param' : 'value'] = option;

        if (option.charAt(0) === '-' && (i === optionArray.length - 1 || optionArray[i + 1].charAt(0) === '-')) {
            optionAccumulator.value = true;
        } else if (
            option.charAt(0) !== '-'
            && (
                !isString(optionAccumulator.param)
            || optionAccumulator.param.charAt(0) !== '-')
        ) {
            optionAccumulator = {
                param: option,
                value: option,
            };
        } else {
            isEven = !isEven;
        }

        if (optionAccumulator.value !== null && optionAccumulator.param !== null) {
            if (optionAccumulator.param === optionAccumulator.value) {
                buffer.params.push(optionAccumulator.value);
            } else {
                buffer = assign(
                    buffer,
                    {
                        [optionAccumulator.param]: optionAccumulator.value,
                    },
                );
            }

            optionAccumulator = {
                param: null,
                value: null,
            };
        }
    });

    return buffer;
}

module.exports = parseOptions;
