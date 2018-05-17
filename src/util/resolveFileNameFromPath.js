
function resolveFileNameFromPath(path) {
  if (typeof path !== 'string') {
    throw new Error('The path must be a string.');
  }

  const tree = path.split('/');

  if (tree && tree.length > 0) {
    return tree[tree.length - 1];
  }

  return null;
}

module.exports = resolveFileNameFromPath;
