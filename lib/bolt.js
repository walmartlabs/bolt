var path = require("path");
var exec = require("child_process").exec;

var isWindows = function() {
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

process.env.PATH = (process.env.PATH || "")
  .split(pathDelimiter)
  .filter(function (x) { 
    return x; 
  })
  .concat([cwdNodeModules, boltNodeModules])
  .join(pathDelimiter);

var cmd = process.argv[2] || null;
var args = null;


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

var proc = exec(args, {
  env: process.env
}, function (err) {
  if (err) { process.exit(err.code); }
});

proc.stdout.pipe(process.stdout, { end: false });
proc.stderr.pipe(process.stderr, { end: false });
