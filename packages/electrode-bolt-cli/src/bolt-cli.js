#!/usr/bin/env node

import findup from "findup-sync";
import resolve from "resolve";

const baseDir = process.cwd();
let boltPath;

try {
  boltPath = resolve.sync("electrode-bolt", { basedir: baseDir, moduleDirectory: "node_modules" });
} catch (e) {
  boltPath = findup("lib/bolt-cli");

  if (!boltPath) {
    /* eslint-disable no-console */
    console.log(`Unable to find local bolt. Be sure to initialze a new npm project and run:
       npm install electrode-bolt --save-dev`);
    /* eslint-enable no-console */
    /* eslint-disable no-process-exit */
    process.exit(99);
    /* eslint-enable no-process-exit */
  }
}

require(boltPath);
