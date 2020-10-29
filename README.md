***
# NOTICE:

## This repository has been archived and is not supported.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***

React Native Cropping Components
================================
# bolt [DEPRECATED REPO]

## Packages

The `bolt` repository is home of multiple packages that belong to the bolt suite of tools. This helps keep versioning consistent and makes working on the packages themselves much easier than having them each in separate repositories.

### `bolt` suite

[packages/bolt]() is the meta-task runner's core, which includes `webpack`, `eslint`, `karma`, `mocha` and `chai`.

[packages/bolt-cli]() is the thin globally installed CLI runner that allows a developer to run `bolt` commands by providing access to the project's locally installed `bolt` instance.

[packages/bolt-standard-flux]() is a `bolt-standard` configuration set for apps, which deviates slightly from a component library configuration set.

[packages/bolt-standard-component-lib]() is a work in progress and an attempt to abstract what's unique about component libraries out into their own `bolt-standard` configuration set, rather than having them live in the `bolt` package.

## Contributing

## Development

**The development environment requires `make`, so it's limited to \*nix systems**

When starting development, clone down the repository:

```
$ git clone git@github.com:walmartreact/bolt.git && cd bolt
```

### bootstrapping

Once you're in the `bolt` directory, you can run:

```
$ make bootstrap
```

`bootstrap` will:

- run an `npm install` at the root level of the project
- iteratively `npm install` for all `packages`
- iteratively create links for all `packages` using `npm link`

Now you're ready to start developing `bolt` packages.

### watch

Once you've bootstrapped the project and you want to start developing, the most sane way to do so is to run:

```
$ make watch
```

Running this command will watch all packages for changes and run them through `babel` so any projects that are using `bolt` will automatically be able to use the features you're developing within the `packages`.

### publishing

If you have rights to publish any of these `packages`, the correct way to `publish` is to run:

```
$ make publish
```

This will:

- ask you for the type of version change you're looking to make
- look for any changes to your project from the previous version and update the version
- publish the packages to npm

One of the great advantages to publishing this way is that all versions are consistent with the version they should be published for based on what `bolt` itself is at, so it makes it a lot easier to keep versioning more consistent and easier to infer for users.
