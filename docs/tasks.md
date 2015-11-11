# Tasks

```
$ builder help electrode-bolt
[builder:help]

Usage:

  builder [action] [task]

Actions:

  help, run, concurrent, install

Tasks:

  bolt:check-ci
    [electrode-bolt] NODE_ENV=test npm run bolt:lint && npm run bolt:ci

  bolt:check-cov
    [electrode-bolt] NODE_ENV=test npm run bolt:lint && npm run bolt:cov

  bolt:ci
    [electrode-bolt] istanbul cover _mocha --report lcovonly -- -R spec --require ./test/spec/entry.js test --recursive --color --config=node_modules/electrode-bolt/config/istanbul/.istanbul.yml

  bolt:cov
    [electrode-bolt] NODE_ENV=test istanbul cover _mocha -- -R spec --require ./test/spec/entry.js test --recursive --color --config=node_modules/electrode-bolt/config/istanbul/.istanbul.yml

  bolt:lint
    [electrode-bolt] NODE_ENV=test eslint --ext .js -c ./config/eslint/.eslintrc-bolt bin config --color

  bolt:tap
    [electrode-bolt] NODE_ENV=test istanbul cover _mocha -- -R tap --require ./test/spec/entry.js test --recursive --color --config=node_modules/electrode-bolt/config/istanbul/.istanbul.yml

  bolt:test
    [electrode-bolt] NODE_ENV=test mocha --require ./test/spec/entry.js --reporter spec --bail --check-leaks test --recursive --color --config=node_modules/electrode-bolt/config/istanbul/.istanbul.yml

  npm:postinstall
    [electrode-bolt] node -e "require('fs').stat('lib', function(e,s){process.exit(e || !s.isDirectory() ? 1 : 0)})" || builder run build-lib

  npm:preversion
    [electrode-bolt] builder run check

  npm:test
    [electrode-bolt] builder run check-cov && builder run cov-frontend

  npm:version
    [electrode-bolt] builder run clean && builder run build && git add -A dist

  build
    [electrode-bolt] builder run build-lib && builder run build-dist

  build-dist
    [electrode-bolt] builder run clean-dist && builder run build-dist-min && builder run build-dist-dev

  build-dist-dev
    [electrode-bolt] webpack --config node_modules/electrode-bolt/config/webpack/webpack.config.dev.js --colors

  build-dist-min
    [electrode-bolt] webpack --config node_modules/electrode-bolt/config/webpack/webpack.config.js --colors

  build-lib
    [electrode-bolt] builder run clean-lib && babel --stage 1 src -d lib

  check
    [electrode-bolt] builder run lint && builder run test

  check-ci
    [electrode-bolt] builder run lint && builder run test-ci

  check-cov
    [electrode-bolt] builder run lint && builder run test-cov

  check-dev
    [electrode-bolt] builder run lint && builder run test-dev

  clean
    [electrode-bolt] builder run clean-lib && builder run clean-dist

  clean-dist
    [electrode-bolt] rimraf dist

  clean-lib
    [electrode-bolt] rimraf lib

  cov-frontend
    [electrode-bolt] istanbul check-coverage 'coverage/client/*/coverage.json' --config=node_modules/electrode-bolt/config/istanbul/.istanbul.yml

  dev
    [electrode-bolt] builder concurrent server-dev server-test

  hot
    [electrode-bolt] builder concurrent server-hot server-test

  init
    [electrode-bolt] node ./node_modules/electrode-bolt/lib/init.js

  lint
    [electrode-bolt] builder run lint-react-demo && builder run lint-react-src && builder run lint-react-test

  lint-react-demo
    [electrode-bolt] eslint --ext .js,.jsx -c ./node_modules/electrode-bolt/config/eslint/.eslintrc-react-demo demo/*.jsx --color

  lint-react-src
    [electrode-bolt] eslint --ext .js,.jsx -c ./node_modules/electrode-bolt/config/eslint/.eslintrc-react src --color

  lint-react-test
    [electrode-bolt] eslint --ext .js,.jsx -c ./node_modules/electrode-bolt/config/eslint/.eslintrc-react-test test/client --color

  server-dev
    [electrode-bolt] webpack-dev-server --port 4000 --config node_modules/electrode-bolt/config/webpack/webpack.config.demo.dev.js --colors

  server-hot
    [electrode-bolt] webpack-dev-server --port 4000 --config node_modules/electrode-bolt/config/webpack/webpack.config.demo.hot.js --colors

  server-test
    [electrode-bolt] webpack-dev-server --port 3001 --config node_modules/electrode-bolt/config/webpack/webpack.config.test.js --colors

  test
    [electrode-bolt] npm run bolt:check-ci

  test-ci
    [electrode-bolt] builder run test-frontend-ci

  test-cov
    [electrode-bolt] builder run test-frontend-cov

  test-dev
    [electrode-bolt] builder run test-frontend-dev

  test-frontend
    [electrode-bolt] karma start node_modules/electrode-bolt/config/karma/karma.conf.js --colors

  test-frontend-ci
    [electrode-bolt] karma start --browsers PhantomJS,Firefox node_modules/electrode-bolt/config/karma/karma.conf.coverage.js --colors

  test-frontend-cov
    [electrode-bolt] karma start node_modules/electrode-bolt/config/karma/karma.conf.coverage.js --colors

  test-frontend-dev
    [electrode-bolt] karma start node_modules/electrode-bolt/config/karma/karma.conf.dev.js --colors
```

