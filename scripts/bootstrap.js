/* global exec, ls, console, mkdir, cd, ln */
/* eslint-disable no-console, no-multi-str, global-require */
require("shelljs/global");

const path = require("path");
const fs = require("fs");

exec("npm list --global --depth 1 electrode-bolt-cli >/dev/null 2>&1 \
  && npm uninstall -g electrode-bolt-cli || true");

const packages = [];
ls("packages/*").forEach((loc) => {
  const name = path.basename(loc);

  if (name[0] === ".") { return; }

  const pkgLoc = path.join(__dirname, "/../packages/", name, "/package.json");

  if (!fs.existsSync(pkgLoc)) { return; }

  const pkg = require(pkgLoc);

  packages.push({
    folder: name,
    pkg,
    name: pkg.name
  });
});

// create links
packages.forEach((root) => {
  console.log(root.name);

  const nodeModulesLoc = `packages/${root.folder}/node_modules`;
  mkdir("-p", nodeModulesLoc);

  packages.forEach((sub) => {
    if (!root.pkg.dependencies || !root.pkg.dependencies[sub.name]) { return; }

    if (!fs.existsSync(path.join(nodeModulesLoc, "/", sub.name))) {
      console.log(`Linking packages/${sub.folder} to ${nodeModulesLoc}/${sub.name}`);
      ln("-s", `packages/${sub.folder}${nodeModulesLoc}/${sub.name}`);
    }
  });

  cd(path.join("packages/", root.folder));
  exec("npm install");
  exec("npm link");
  cd("../..");
});

exec("git submodule update --init");
exec("make build");
