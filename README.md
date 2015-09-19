# bolt

> An opinionated meta config runner for react components, doing the heavy lifting so you don't have to.

Provides CLI access to things such as:

- `webpack`
- `eslint`
- `karma`

through `bolt`.

## Install

within an electrode package, run:

```sh
$ npm install electrode-bolt --save
```

1. in your `package.json`, replace existing scripts with `bolt <task>` where the task is the name of the task being replaced. For instance: `"cov-frontend": "istanbul check-coverage 'coverage/client/*/coverage.json'"` would be replaced with `"cov-frontend": "bolt cov-frontend"`.
1. Enjoy seamless integration with pre-existing configs for your opininated `electrode` component!

## Usage

Any tasks that you have added to your `package.json` to run `bolt <task>` can be run as `npm run`. To stay with the example above, running `npm run cov-frontend` will run the bolt task for you.

### With `electrode-bolt-cli`

[electrode-bolt-cli](https://github.com/walmartreact/electrode-bolt-cli) was created to easily give you access globally to `bolt` so you can run:

```
$ bolt <task>
```

**electrode-bolt-cli** gives you access to your tasks and `electrode-bolt` tasks in the command line, which will help to only have the scripts you need for production or CI in your `package.json`.


## Unique Configuration

So you don't want to the `bolt` command out of the box? No problem!

You can override a command in _your_ `package.json` and run `bolt <cmd>` and `bolt` will opt for your script over the script it provides.

For example, say you run:

```
$ bolt clean-dist
```

`bolt` will run `rimraf` on your `dist` directory. If you wanted it to do something else such as echo "I love electricity!", you can put the following script in your `scripts` object:

```
"scripts": {
  "clean-dist": "echo 'I love electricity!'"
  ...
}
```

Now when you run `bolt clean-dist`, rather than it running `rimraf dist`, it will echo "I love electricity!".

## Why?

In building react components, the electrode team at WalmartLabs came up with a set of standard tooling and architecture that we feel help us develop better and faster. Unfortunately a lot of the tooling comes with its own configuration, so `electrode-bolt` is an opportunity to move all of that configuration that could be duplicated over all components and application into one place, making it easier to get up and running with a project faster.

This package tries to solve the problem of creating a "meta-monolith" that stands behind our components so people can just build cool stuff and not worry about all the config that goes into keeping a component up to date.

Maybe one day it won't be opinionated. But this day? Not this day.

## Opinionated Directory Structure

```
|-- my_project
|   |-- package.json
|   |-- demo
|   |   |-- index.html
|   |   |-- demo.jsx
|   |-- lib
|   |-- src
|   |   |-- components
|   |   |   |-- component.jsx
|   |   |-- index.js
|   |-- docs
|   |-- test
|       |-- client
|           |-- components
|               |-- component.spec.jsx
```
