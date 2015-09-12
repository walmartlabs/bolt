var path = require("path");
var exec = require("child_process").exec;
var chalk = require("chalk");
var yaml = require("js-yaml");

var isWindows = function () {
  return process.platform.indexOf("win") === 0;
};

var pathDelimiter = isWindows() ? ";" : ":";

var binPath = "node_modules/.bin";

var CWD = process.cwd();
var boltDir = __dirname;
var cwdPkg = require(path.join(CWD, "package.json"));
var boltPkg = require(path.join(boltDir, "../package.json"));
var cwdNodeModules = path.join(CWD, binPath);
var boltNodeModules = path.join(boltDir, "../" + binPath);

function setupPath(boltStandard) {
  var modulePaths = [cwdNodeModules, boltNodeModules];

  if (boltStandard) {
    modulePaths.join(path.join(process.cwd(), "node_modules", boltStandard));
  }

  process.env.PATH = (process.env.PATH || "")
    .split(pathDelimiter)
    .filter(function (x) {
      return x;
    })
    .concat(modulePaths)
    .join(pathDelimiter);

}

var cmd = process.argv[2] || null;
var args = null;

if (!cmd || cmd === "help") {
  return boltHelp();
} else {
  checkForBoltStandard();
}

function checkForBoltStandard() {
  var boltStandard;

  for (var dep in cwdPkg.devDependencies) {
    if (dep.match(/bolt-standard-.*/)) {
      boltStandard = dep;
      break;
    }
  }

  if (boltStandard) {
    var boltStandardPath = path.join(CWD, "node_modules", boltStandard);
    var boltStandardPkg = require(path.join(boltStandardPath, "package.json"));

    for (var script in boltStandardPkg.scripts) {
      boltPkg.scripts[script] = boltStandardPkg.scripts[script];
    }
  }

  setupPath(boltStandard);
  executeScript();
}

function boltHelp() {
  console.log("\n" + "Usage:", chalk.green("bolt <command>"), "\n");
  console.log("available via `bolt`:\n");

  for (var cwdScriptName in cwdPkg.scripts) {
    boltPkg.scripts[cwdScriptName] = cwdPkg.scripts[cwdScriptName];
  }

  for (var boltScriptName in boltPkg.scripts) {
    console.info("  " + chalk.green(boltScriptName) + "\n    " + boltPkg.scripts[boltScriptName]);
  }
}

function executeScript() {
  var runnerName = "bolt";
  var cwdArgs = (cwdPkg.scripts || {})[cmd];

  if (cwdArgs) {
    var cwdParts = cwdArgs.split(/\s+/);
    var isBoltUtil = cwdParts.length === 2 && cwdParts[0] === runnerName;
    var isBoltCmd = cwdParts[1] === cmd;
    var isProxy = isBoltUtil && isBoltCmd;
    if (!isProxy) {
      args = cwdArgs;
    }
  }

  if (!args) {
    args = (boltPkg.scripts || {})[cmd];
  }

  if (!args) {
    throw new Error("No command found for: " + cmd);
  }

  var userArgs = process.argv.length > 3 ? process.argv.splice(3) : [];

  var proc = exec(args + " " + userArgs.join(" "), {
    env: process.env
  }, function (err) {
    if (err) { process.exit(err.code); }
  });

  proc.stdout.pipe(process.stdout, { end: false });
  proc.stderr.pipe(process.stderr, { end: false });
}
