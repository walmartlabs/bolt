# bolt

> An opinionated meta config runner

- `webpack`
- `eslint`
- `karma`

## Install

1. within an electrode package, `npm install @walmart/bolt` [still proposed]
1. in your `package.json`, replace existing scripts with `bolt <task>` where the task is the name of the task being replaced. For instance: `"cov-frontend": "istanbul check-coverage 'coverage/client/*/coverage.json'"` would be replaced with `"cov-frontend": "bolt cov-frontend"`.
1. Enjoy seamless integration with pre-existing configs for your opininated `electrode` component!

## Usage

Once you've followed the steps above, you should be able to not worry about using it. `bolt` does the work for you.

## Why?

Going through and modifying `*.config*` files in _every_ react component library you have (which correlates 1:1 to a git repository) is a huge pain in the butt, it's a lot of copy/pasta and no one should 1) have to do that and 2) have to endure the possible degradation over time of human copy/pasta.

This package tries to solve the problem of creating a "meta-monolith" that stands behind our components so people can just build cool stuff and not worry about all the config that goes into keeping a component up to date.

Maybe one day it won't be opinionated. But this day? Not this day.

## Opinionated Directory Structure

```
|-- my_project
|   |-- package.json
|   |-- demo
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
