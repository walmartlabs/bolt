import logger from "./logger";
import chalk from "chalk";
import path from "path";
import childProcess from "child_process";
import _ from "lodash";

const exec = childProcess.exec;

const Bolt = module.exports = function (proc) {
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

  this.scripts = {
    package: this.cwdPkg.scripts,
    bolt: require(path.join(this.boltDir, "../package.json")).scripts
  };

  this.cmd = this.proc.argv[2] || null;
  this.args = null;
};

Bolt.prototype.pathDelimiter = function () {
  return this.proc.platform.indexOf("win") === 0 ? ";" : ":";
};

Bolt.prototype.setupPath = function () {
  const pathDelimiter = this.pathDelimiter();

  const cwdNodeModules = path.join(this.CWD, this.binPath);
  const boltNodeModules = path.join(this.boltDir, "../" + this.binPath);
  const modulePaths = [cwdNodeModules, boltNodeModules];

  if (this.boltStandard) {
    modulePaths.push(path.join(this.CWD, "node_modules", this.boltStandard, this.binPath));
  }

  const newPath = (process.env.PATH || "")
    .split(pathDelimiter)
    .filter(function (x) {
      return x;
    })
    .concat(modulePaths)
    .join(pathDelimiter);

  return newPath;
};

Bolt.prototype.gatherScripts = function () {
  const allScripts = _.merge({},
    this.scripts.boltStandard, this.scripts.bolt, this.scripts.package);

  return allScripts;
};

Bolt.prototype.help = function () {
  const allScripts = this.gatherScripts();

  logger(`\n Usage: ${chalk.green("bolt <command>")}\n`);
  logger("available via `bolt`:\n");
  for (const boltScriptName in allScripts) {
    logger("  " + chalk.green(boltScriptName) + "\n    " + allScripts[boltScriptName]);
  }
};

Bolt.prototype.checkForBoltStandard = function () {
  const dependencies = _.merge({}, this.cwdPkg.dependencies, this.cwdPkg.devDependencies);

  for (const dep in dependencies) {
    if (dep.match(/bolt-standard-.*/)) {
      this.boltStandard = dep;
      break;
    }
  }

  if (this.boltStandard) {
    this.scripts.boltStandard = this.getBoltStandardPkg().scripts;
  }
};

Bolt.prototype.getBoltStandardPkg = function () {
  const boltStandardPath = path.join(this.CWD, "node_modules", this.boltStandard);
  return require(path.join(boltStandardPath, "package.json"));
};

Bolt.prototype.tryScripts = function () {
  const tryScripts = ["package", "boltStandard", "bolt"];
  for (let idx = 0; idx < tryScripts.length; idx++) {
    if (!this.scripts[tryScripts[idx]]) { continue; }

    const script = this.scripts[tryScripts[idx]][this.cmd];
    if (script) {
      this.source = tryScripts[idx];
      return script;
    }
  }
};

Bolt.prototype.preexecuteScript = function () {
  const runnerName = "bolt";

  this.args = this.tryScripts();
  this.userArgs = this.proc.argv.length > 3 ? this.proc.argv.splice(3) : [];

  if (!this.source) {
    throw new Error("No command found for: " + this.cmd);
  }

  /* istanbul ignore else */
  if (this.source === "package") {
    const cwdParts = this.args.split(/\s+/);
    const isBoltUtil = cwdParts.length === 2 && cwdParts[0] === runnerName;
    const isBoltCmd = cwdParts[1] === this.cmd;
    this.isProxy = isBoltUtil && isBoltCmd;

    if (!this.isProxy) {
      this.args = this.args;
    }
  }
};

Bolt.prototype.executeScript = function () {
  this.preexecuteScript();

  logger("Executing script",
    "`" + this.cmd + "` (" + this.args + ")",
    "from", this.source);

  /* istanbul ignore next */
  const proc = exec(this.args + " " + this.userArgs.join(" "), {
    env: this.proc.env
  }, (err) => {
    /* eslint-disable no-process-exit */
    if (err) { process.exit(err.code); }
    /* eslint-enable no-process-exit */
  });

  proc.stdout.pipe(process.stdout, { end: false });
  proc.stderr.pipe(process.stderr, { end: false });
};
