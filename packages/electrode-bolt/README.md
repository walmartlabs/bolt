# Builder Archetype: Electrode Bolt

A Walmart Labs flavored react component archetype for [builder]().

## Installation

If you don't have `builder` as a global dependency, install it with:

```
$ npm install builder -g
```

Within your project, run:

```
$ npm install --save builder electrode-bolt
$ npm install --save-dev electrode-bolt-dev
```

The last piece you'll need is a `.builderrc` that contains the following:

```
---
archetypes:
  - electrode-bolt
```


## Project Structure

This archetype assumes an architecture as follows:

```
demo/
  app.jsx
  index.html
src
  components/
    *.jsx
  index.js
test
  client/
    spec/
      components/
        *.jsx?
      *.jsx?
    main.js
    test.html
.builderrc
package.json
```

## Usage Notes

This archetype does not currently specify its own `.babelrc`. Your project
should specify its own in the root directory if you want non-default Babel
settings (like using stage 0, for instance). See [the recommended
settings](config/babel/.babelrc).

## Tasks

```
$ builder help electrode-bolt

[builder:help]

Usage:

  builder [action] [task]

Actions:

  help, run, concurrent, install, init

Tasks:

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
    [electrode-bolt] builder run server-dev & builder run server-test

  hot
    [electrode-bolt] builder run server-hot & builder run server-test

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

[builder]: https://github.com/FormidableLabs/builder
