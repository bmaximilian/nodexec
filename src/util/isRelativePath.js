
function isRelativePath(path) {
  if (typeof path !== 'string') {
    throw new Error('The path must be a string.');
  }

  return path.charAt(0) !== '/';
}

module.exports = isRelativePath;
