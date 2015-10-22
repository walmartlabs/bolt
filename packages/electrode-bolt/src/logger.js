/* istanbul ignore next */
module.exports = function () {
  if (process.env.NODE_ENV === "test" && !process.env.TEST_LOGGER) return;

  var args = Array.prototype.slice.call(arguments);
  console.log.apply(console, args);
};


