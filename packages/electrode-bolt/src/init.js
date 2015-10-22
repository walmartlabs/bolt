/* eslint-disable no-console */
import path from "path";
import fs from "fs-extra";
import jsonfile from "jsonfile";
jsonfile.spaces = 2;
import _ from "lodash";

const tasks = {
  prepublish: "bolt build-lib",
  demo: "bolt server-dev",
  build: "bolt build-lib",
  hot: "bolt server-hot",
  "test:dev": "bolt test-frontend",
  test: "bolt check-cov && bolt cov-frontend"
};

const devDeps = {
  "babel-eslint": "^4.1.3",
  eslint: "^1.5.1",
  "eslint-config-defaults": "^6.0.0",
  "eslint-plugin-filenames": "^0.1.2",
  "eslint-plugin-react": "^3.4.2"
};

const cpFiles = function () {
  fs.copy("node_modules/electrode-bolt/templates", path.join(process.cwd(), "."), function (err) {
    if (err) { return console.error(err); }

    console.log("bolt component lib initialized successfully!");

    ["src/components/boilerplate-component.jsx",
      "test/client/spec/components/boilerplate-component.spec.jsx"
    ].forEach(function (filename) {
      fs.readFile(path.join(process.cwd(), filename), function (_err, file) {
        if (_err) {
          throw _err;
        }

        const contents = _.template(file.toString())({ name: "BoilerplateComponent" });

        /* eslint-disable max-nested-callbacks */
        fs.writeFile(path.join(process.cwd(), filename), contents, function (__err) {
          if (__err) {
            throw __err;
          }
          console.log("Generated", filename);
        });
      });
    });
  });
};

const updatePackageJSON = function () {
  // read project's package.json
  const pkg = require(path.join(process.cwd(), "package.json"));

  // check if task exists for script tag
  for (const task in tasks) {
    let isBak = false;
    // if so, mv it to task:bak
    // add task to scripts
    if (pkg.scripts[task]) {
      pkg.scripts[task + ":bak"] = pkg.scripts[task];
      isBak = true;
    }
    pkg.scripts[task] = isBak ?
      "echo \"original version of " + task + " is now " + task + ":bak" +
      " if you believe this is in error, please remove this task and change " +
      task + ":bak back to " + task + "\" && " + tasks[task] : tasks[task];
  }

  for (const dep in devDeps) {
    pkg.devDependencies = pkg.devDependencies || {};
    if (!pkg.devDependencies[dep]) {
      pkg.devDependencies[dep] = devDeps[dep];
    }
  }

  console.log("package.json has been updated with new tasks and dependencies.");
  console.log("It is recommended that you run `npm install` to pick up new dependencies.");
  jsonfile.writeFile(path.join(process.cwd(), "package.json"), pkg,
    function (err) {
      if (err) {
        throw err;
      }
    }
  );
};

cpFiles();

updatePackageJSON();
