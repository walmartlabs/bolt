var Bolt = require("../../../lib/bolt");

describe("Bolt", function () {
  var bolt;
  var sandbox;
  var spy;
  var stub;
  var proc;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();

    proc = {
      platform: process.platform,
      argv: ["node", "bolt"],
      env: process.env,
      exit: process.exit,
      on: process.on,
      stdout: process.stdout,
      stdin: process.stdin
    };
  });

  afterEach(function() {
    sandbox.restore();

    /* restore proc */
    proc = {
      argv: ["node", "bolt"]
    };
  });

  it("should run `help()` if there are no arguments", function () {
    spy = sandbox.spy(Bolt.prototype, "help");

    bolt = new Bolt(proc);
    bolt.run();

    expect(spy).to.have.been.called;
    Bolt.prototype.help.restore();
  });

  describe("#pathDelimiter", function () {
    var platformRestore = process.platform;

    afterEach(function () {
      proc.platform = platformRestore;
    });

    it("should return : if 'win' is not found in platform", function () {
      bolt = new Bolt(proc);
      bolt.run();

      expect(bolt.pathDelimiter()).to.eql(":");
    });

    it("should return ; if 'win' is found in platform", function () {
      proc.platform = "win";
      bolt = new Bolt(proc);
      bolt.run();

      expect(bolt.pathDelimiter()).to.eql(";");
    });
  });

  describe("#checkForBoltStandard", function () {
    beforeEach(function() {
      proc.argv.push("test");

        bolt = new Bolt(proc);
    });

    it("should run `checkForBoltStandard() if there are additional arguments", function () {
      spy = sandbox.spy(Bolt.prototype, "checkForBoltStandard");

      bolt.run();

      expect(spy).to.have.been.called;
      Bolt.prototype.checkForBoltStandard.restore();
    });


    it("should not set `this.boltStandard` if no `bolt-standard-*` found in project dependencies", function () {
      bolt.cwdPkg.devDependencies = {
        "foo": "0.0.1",
        "bar": "0.0.1"
      };

      bolt.run();

      expect(bolt.boltStandard).to.be.undefined;
    });

     it("should set `this.boltStandard` of first `bolt-standard-*` found in project dependencies", function () {
      stub = sandbox.stub(Bolt.prototype, "getBoltStandardPkg").returns({});
      bolt.cwdPkg.dependencies = {
        "bolt-standard-flux": "0.0.1",
        "foo": "0.0.1"
      };

      bolt.run();

      expect(bolt.boltStandard).to.eql("bolt-standard-flux");
      Bolt.prototype.getBoltStandardPkg.restore();
    });

    it("should add or overwrite existing scripts with the boltStandard scripts to the bolt tasks", function() {
      var testScript = "echo 'will overwrite bolt script'";
      var uniqueScript = "echo 'not going to overwrite bolt script";

      stub = sandbox.stub(Bolt.prototype, "getBoltStandardPkg").returns({
        scripts: {
          "test": testScript,
          "uniqueScript": uniqueScript
        }
      });

      bolt.cwdPkg.devDependencies = {
        "bolt-standard-flux": "0.0.1"
      };

      bolt.run();

      expect(bolt.boltPkg.scripts["test"]).to.eql(testScript);
      expect(bolt.boltPkg.scripts["uniqueScript"]).to.eql(uniqueScript);
      Bolt.prototype.getBoltStandardPkg.restore();
    });
  });

  describe("#preexecuteScript", function () {
    beforeEach(function() {
      proc.argv.push("noScriptFound");

      bolt = new Bolt(proc);
    });

    it("should throw if no script is found", function () {
      expect((function () { bolt.preexecuteScript() })).to.throw(Error);
    });

    it("should throw if cwd pkg scripts is undefined or null is found", function () {
      bolt.cwdPkg.scripts = null;
      expect((function () { bolt.preexecuteScript() })).to.throw(Error);

      bolt.cwdPkg.scripts = undefined;
      expect((function () { bolt.preexecuteScript() })).to.throw(Error);
    });
  });
});
