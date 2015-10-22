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
    sandbox.restore();
  });

  it("should call console log if NODE_ENV is not 'test'", function () {
    process.env.TEST_LOGGER = true;
    stub = sandbox.stub(global.console, "log");

    logger("hello", "world");
    expect(stub).to.have.been.called;
    global.console.log.restore();
    delete process.env.TEST_LOGGER;
  });
});
