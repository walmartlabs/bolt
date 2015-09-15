var logger = require("../../../lib/logger");

describe("logger", function () {
  var NODE_ENVRestore = process.env.NODE_ENV;
  var sandbox;
  var spy;
  var stub;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    process.env.NODE_ENV = NODE_ENVRestore;
    sandbox.restore();
  });

  it("should not call console log if NODE_ENV is 'test'", function () {
    process.env.NODE_ENV = "test";
    spy = sandbox.spy(console, "log");

    logger("hello", "world");
    expect(spy).to.not.have.been.called;
  });

  it("should call console log if NODE_ENV is not 'test'", function () {
    process.env.NODE_ENV = "dev";
    stub = sandbox.stub(global.console, "log");

    logger("hello", "world");
    expect(stub).to.have.been.called;
    global.console.log.restore();
  });
});
