var logger = require("./logger");
var chalk = require("chalk");
var path = require("path");
var exec = require("child_process").exec;

var Bolt = module.exports = function (proc) {
  this.proc = proc;

  this.gatherEnvironment();

  this.run = function () {
    if (!this.cmd || this.cmd === "help") {
      this.help();
    } else {
      process.env.PATH = this.setupPath();
      this.executeScript();
    }
  };
};

Bolt.prototype.getBoltStandardPkg = function () {
  for (var dep in this.cwdPkg.devDependencies) {
    if (dep.match(/bolt-standard-.*/)) {

      return require(path.join(this.CWD, "node_modules", dep, "package.json"));
      break;
    }
  }
  return {};
};

Bolt.prototype.gatherEnvironment = function () {
  this.CWD = process.cwd();
  this.boltDir = __dirname;
  this.binPath = "node_modules/.bin";

  this.cwdPkg = require(path.join(this.CWD, "package.json"))
  this.boltPkg = require(path.join(this.boltDir, "../package.json"));
  this.boltStandardPkg = this.getBoltStandardPkg();

  this.allScripts = [{
    source: this.boltPkg.name,
    scripts: this.boltPkg.scripts
  }, {
    source: this.boltStandardPkg.name || "",
    scripts: this.boltStandardPkg.scripts || {}
  }, {
    source: this.cwdPkg.name,
    scripts: this.cwdPkg.scripts
  }].reduce(function (prevScripts, currScripts) {
    for (var script in currScripts.scripts) {
      prevScripts[script] = {};
      prevScripts[script].source = currScripts.source;
      prevScripts[script].script = currScripts.scripts[script];
    }
    return prevScripts;
  }, {});

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

Bolt.prototype.help = function () {
  this.gatherEnvironment();

  logger("\n" + "Usage:", chalk.green("bolt <command>"));
  logger("available via `bolt`:");
  for (var boltScript in this.allScripts) {
    logger("\n" + chalk.green(boltScript) + " from " + this.allScripts[boltScript].source
      + "\n    " + chalk.magenta(this.allScripts[boltScript].script));
  }
};

Bolt.prototype.executeScript = function () {
  this.preexecuteScript();

  logger(" - " + chalk.magenta("Executing script",
    "`" + this.cmd + "`",
    "from", this.source));

  /* istanbul ignore next */
  var proc = exec(this.args + " " + this.userArgs.join(" ") + " --color", {
    env: this.proc.env
  }, function (err) {
    if (err) { process.exit(err.code); }
  }.bind(this));

  proc.stdout.pipe(process.stdout, { end: false });
  proc.stderr.pipe(process.stderr, { end: false });
};

Bolt.prototype.preexecuteScript = function () {
  var runnerName = "bolt";
  var cwdArgs = (this.allScripts || {})[this.cmd].script;

  /* istanbul ignore else */
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
    throw new Error("No command found for: " + this.cmd);
  }

  this.source = this.allScripts[this.cmd].source;

  this.userArgs = process.argv.length > 3 ? process.argv.splice(3) : [];
};
