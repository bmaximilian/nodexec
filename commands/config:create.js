const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const { userConfig: userConfigPath } = require('../src/util/paths');

function createConfig(options) {
  const initialConfig = {};

  if (!fs.existsSync(userConfigPath) || options['-f'] || options['--force']) {
    mkdirp(path.dirname(userConfigPath), (mkdirError) => {
      if (mkdirError) throw mkdirError;

      fs.writeFile(userConfigPath, JSON.stringify(initialConfig), (writeError) => {
        if (writeError) throw writeError;

        console.log(`${userConfigPath} written successfully.`);
      });
    });
  } else if (!options['--silent'] && !options['-s']) {
    console.log(`There is already a config at ${userConfigPath}.`);
    console.log('Use -f to overwrite');
  }
}

module.exports = {
  description: 'Creates the config directory in the user home and adds a empty config file.',
  command: createConfig,
};
