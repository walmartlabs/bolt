var path = require("path");
var bolt = require(path.join(process.cwd(), "lib/bolt"));
var chai = require("chai");
var expect = chai.expect;

describe("Bolt", function () {
  it("should fail if a script is called that doesn\'t exist", function () {
    expect(bolt.run).to.throw(Error);
  });
});
