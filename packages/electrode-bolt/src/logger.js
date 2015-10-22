/* istanbul ignore next */
module.exports = function () {
  if (process.env.NODE_ENV === "test" && !process.env.TEST_LOGGER) { return; }

  const args = Array.prototype.slice.call(arguments);
  /* eslint-disable no-console */
  console.log(...args);
  /* eslint-disable no-console */
};

