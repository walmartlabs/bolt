"use strict";

var runnerName = "bolt";

var path = require("path");
var exec = require("child_process").exec;

var CWD = process.cwd();
var boltDir = path.join(__dirname, "../");

var cwdPkg = require(path.join(CWD, "package.json"));
var boltPkg = require(path.join(boltDir, "package.json"));

var isWindows = function () {
  return process.platform.indexOf("win") === 0;
};

var cmd = process.argv[2] || null;

var cwdArgs = (cwdPkg.scripts || {})[cmd];

var mutatePathWithCwdAndBoltNodeModules = function () {
  var pathDelimiter = isWindows() ? ";" : ":";

  var binPath = "node_modules/.bin";
  var cwdNodeModules = path.join(CWD, binPath);
  var boltNodeModules = path.join(boltDir, binPath);

  process.env.PATH = (process.env.PATH || "")
    .split(pathDelimiter)
    .filter(function (x) {
      return x;
    })
    .concat([cwdNodeModules, boltNodeModules])
    .join(pathDelimiter);
};

var runProcess = function (args) {
  var proc = exec(args, {
    env: process.env
  }, function (err) {
    if (err) { process.exit(err.code); }
  });

  proc.stdout.pipe(process.stdout, { end: false });
  proc.stderr.pipe(process.stderr, { end: false });
};

exports.run = function () {

  mutatePathWithCwdAndBoltNodeModules();

  var args = null;

  if (cwdArgs) {
    var cwdParts = cwdArgs.split(/\s+/);
    var isBoltUtil = cwdParts.length === 2 && cwdParts[0] === runnerName;
    var isBoltCmd = cwdParts[1] === cmd;
    var isProxy = isBoltUtil && isBoltCmd;
    if (!isProxy) {
      args = cwdArgs;
    }
  }

  if (cmd.match(/^bolt-/)) {
    throw new Error("Tasks starting with 'bolt' are reserved for bolt.");
  }

  if (!args) {
    args = (boltPkg.scripts || {})[cmd];
  }

  if (!args) {
    throw new Error("No command found for: " + cmd);
  }

  runProcess(args);
};
