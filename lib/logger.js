module.exports = function () {
  if (process.env.NODE_ENV === "test") return;

  var args = Array.prototype.slice.call(arguments);
  console.log.apply(console, args);
};
