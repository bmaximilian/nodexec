const resolveFileNameWithoutEnding = require('./resolveFileNameWithoutEnding')
const resolveFileNameFromPath = require('./resolveFileNameFromPath');

function resolveFileNameFromPathWithoutEnding(path) {
  return resolveFileNameWithoutEnding(resolveFileNameFromPath(path));
}

module.exports = resolveFileNameFromPathWithoutEnding;
