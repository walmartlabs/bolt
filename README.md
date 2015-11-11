# Builder Archetype: Electrode Bolt

A React component archetype for [builder][].

> An opinionated set of tasks do the heavy lifting so you don't have to.

Make sure you know the [expected project structure](docs/project-structure.md) when setting up your new project!

## Install

`electrode-bolt` is an `archetype` for `builder`, so anytime you install `electrode-bolt`, you also need to install `builder` as a dependency:

```sh
$ npm install builder electrode-bolt --save
```

## Usage Notes

This archetype does not currently specify its own `.babelrc`. Your project
should specify its own in the root directory if you want non-default Babel
settings (like using stage 0, for instance). See [the recommended
settings](config/babel/.babelrc).

## Tasks

For a full list of tasks, checkout the [docs/tasks](tasks.md) or run `builder help electrode-bolt`.


## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md) for how to contribute.

[builder]: https://github.com/FormidableLabs/builder

## The Old `bolt`

Previously, `electrode-bolt` had its own executable, but a huge amount of work went into `builder` and many of the learnings of the failings of `bolt` carried over, making `builder` an obvious choice to replace the `bolt` executable. If you're only interested in using the legacy `bolt`, it can be found [here](https://github.com/walmartreact/electrode-bolt/tree/v2.1.0).
