const fs = require('fs');
const { userConfig: userConfigPath } = require('../src/util/paths');

function createConfig(options) {
  const initialConfig = {};

  if (!fs.existsSync(userConfigPath) || options['-f'] || options['--force']) {
    fs.writeFile(userConfigPath, JSON.stringify(initialConfig), function (err) {
      if (err) throw err;

      console.log(`${userConfigPath} written successfully.`);
    });
  } else if (!options['--silent'] && !options['-s']) {
    console.log(`There is already a config at ${userConfigPath}.`);
    console.log('Use -f to overwrite');
  }
}

module.exports = createConfig;
