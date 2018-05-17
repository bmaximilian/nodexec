function resolveFileNameWithoutEnding(filename) {
  if (typeof filename !== 'string') {
    throw new Error('The file name must be a string.');
  }

  const buffer = filename.split('.');

  buffer.pop();

  return buffer.join();
}

module.exports = resolveFileNameWithoutEnding;
