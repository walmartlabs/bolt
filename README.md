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
$ npm install electrode-bolt
```

1. in your `package.json`, replace existing scripts with `bolt <task>` where the task is the name of the task being replaced. For instance: `"cov-frontend": "istanbul check-coverage 'coverage/client/*/coverage.json'"` would be replaced with `"cov-frontend": "bolt cov-frontend"`.
1. Enjoy seamless integration with pre-existing configs for your opininated `electrode` component!

## Usage

Once you've followed the steps above, you should be able to not worry about using it. `bolt` does the work for you.

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

Going through and modifying `*.config*` files in _every_ react component library you have (which correlates 1:1 to a git repository) is a huge pain in the butt, it's a lot of copy/pasta and no one should 1) have to do that and 2) have to endure the possible degradation over time of human copy/pasta.

This package tries to solve the problem of creating a "meta-monolith" that stands behind our components so people can just build cool stuff and not worry about all the config that goes into keeping a component up to date.

Maybe one day it won't be opinionated. But this day? Not this day.

## Opinionated Directory Structure

```
|-- my_project
|   |-- package.json
|   |-- demo
|   |   |-- index.html
|   |   |-- demo.jsx
|   |-- dist
|   |-- src
|   |   |-- components
|   |   |   |-- component.jsx
|   |   |-- index.js
|   |-- docs
|   |-- test
|       |-- client
|           |-- component
|               |-- component.spec.jsx
```
