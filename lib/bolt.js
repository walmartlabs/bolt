var logger = require("./logger");
var chalk = require("chalk");
var path = require("path");
var exec = require("child_process").exec;
var _ = require("lodash");

var Bolt = module.exports = function (proc) {
  this.proc = proc;

  this.gatherEnvironment();

  this.run = function () {
    if (!this.cmd || this.cmd === "help") {
      this.help();
    } else {
      this.checkForBoltStandard();
      process.env.PATH = this.setupPath();
      this.executeScript();
    }
  };
};

Bolt.prototype.gatherEnvironment = function () {
  this.CWD = process.cwd();
  this.boltDir = __dirname;
  this.binPath = "node_modules/.bin";

  this.cwdPkg = require(path.join(this.CWD, "package.json"));
  this.boltPkg = require(path.join(this.boltDir, "../package.json"));

  this.cwdPkg.dependencies = _.merge(this.cwdPkg.dependencies, this.cwdPkg.devDependencies);

  this.cmd = this.proc.argv[2] || null;
  this.args = null;
};

Bolt.prototype.pathDelimiter = function () {
  return this.proc.platform.indexOf("win") === 0 ? ";" : ":";
};

Bolt.prototype.setupPath = function () {
  var pathDelimiter = this.pathDelimiter();

  var cwdNodeModules = path.join(this.CWD, this.binPath);
  var boltNodeModules = path.join(this.boltDir, "../" + this.binPath);
  var modulePaths = [cwdNodeModules, boltNodeModules];

  if (this.boltStandard) {
    modulePaths.push(path.join(this.CWD, "node_modules", this.boltStandard, this.binPath));
  }

  newPath = (process.env.PATH || "")
    .split(pathDelimiter)
    .filter(function (x) {
      return x;
    })
    .concat(modulePaths)
    .join(pathDelimiter);

  return newPath;
};

Bolt.prototype.gatherScripts = function () {
  var allScripts = this.boltPkg.scripts;

    for (var cwdScriptName in this.cwdPkg.scripts) {
      this.boltPkg.scripts[cwdScriptName] = this.cwdPkg.scripts[cwdScriptName];
    }

  return allScripts;
};

Bolt.prototype.help = function () {
  var allScripts = this.gatherScripts();

  logger("\n" + "Usage:", chalk.green("bolt <command>"), "\n");
  logger("available via `bolt`:\n");
  for (var boltScriptName in allScripts) {
    logger("  " + chalk.green(boltScriptName) + "\n    " + allScripts[boltScriptName]);
  }
};

Bolt.prototype.checkForBoltStandard = function () {
  this.boltStandard;

  for (var dep in this.cwdPkg.dependencies) {
    if (dep.match(/bolt-standard-.*/)) {
      this.boltStandard = dep;
      break;
    }
  }

  if (this.boltStandard) {
    var boltStandardPkg = this.getBoltStandardPkg();

    for (var script in boltStandardPkg.scripts) {
      this.boltPkg.scripts[script] = boltStandardPkg.scripts[script];
    }
  }
};

Bolt.prototype.getBoltStandardPkg = function () {
  var boltStandardPath = path.join(this.CWD, "node_modules", this.boltStandard);
  return require(path.join(boltStandardPath, "package.json"));
};

Bolt.prototype.executeScript = function () {
  this.preexecuteScript();

  var proc = exec(this.args + " " + this.userArgs.join(" "), {
    env: this.proc.env
  }, function (err) {
    if (err) { process.exit(err.code); }
  }.bind(this));

  proc.stdout.pipe(process.stdout, { end: false });
  proc.stderr.pipe(process.stderr, { end: false });
};

Bolt.prototype.preexecuteScript = function () {
  var runnerName = "bolt";
  var cwdArgs = (this.cwdPkg.scripts || {})[this.cmd];

  if (cwdArgs) {
    var cwdParts = cwdArgs.split(/\s+/);
    var isBoltUtil = cwdParts.length === 2 && cwdParts[0] === runnerName;
    var isBoltCmd = cwdParts[1] === this.cmd;
    var isProxy = isBoltUtil && isBoltCmd;
    if (!isProxy) {
      this.args = cwdArgs;
    }
  }

  if (!this.args) {
    this.args = (this.boltPkg.scripts || {})[this.cmd];
  }

  if (!this.args) {
    throw new Error("No command found for: " + this.cmd);
  }

  this.userArgs = process.argv.length > 3 ? process.argv.splice(3) : [];
};
