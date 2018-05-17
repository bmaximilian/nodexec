
const { assign, isArray } = require('lodash');

function parseOptions(optionArray) {
  let buffer = {};
  let optionAccumulator = {
    param: null,
    value: true,
  };

  if (!isArray(optionArray)) {
    throw new Error('Options must be passed as array');
  }

  optionArray.forEach((option, i) => {
    optionAccumulator[i % 2 === 0 ? 'param' : 'value'] = option;

    if (optionAccumulator.value !== null && optionAccumulator.param !== null) {
      buffer = assign(
        buffer,
        {
          [optionAccumulator.param]: optionAccumulator.value,
        },
      );

      optionAccumulator = {
        param: null,
        value: true,
      };
    }
  });

  return buffer;
}

module.exports = parseOptions;
