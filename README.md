# electrode-bolt

## Packages

The `electrode-bolt` repository is home of multiple packages that belong to the electrode-bolt suite of tools. This helps keep versioning consistent and makes working on the packages themselves much easier than having them each in separate repositories.

**In version 2.0.0, `electrode-bolt` favors `builder` and we've gotten rid of the `electrode-bolt-cli`. If you've been using `bolt` in the past, please see the upgrade guide!**

### `electrode-bolt` archetypes

[packages/electrode-bolt]() is the `builder` archetype for the electrode platform at Walmart Labs dependencies.

[packages/electrode-bolt-dev]() is the electrode-bolt `builder` archetype's dev dependencies. The README explains how to use this package.

## Development

**The development environment requires `make`, so it's limited to \*nix systems**

When starting development, clone down the repository:

```
$ git clone git@github.com:walmartreact/electrode-bolt.git && cd electrode-bolt
```

### bootstrapping

Once you're in the `electrode-bolt` directory, you can run:

```
$ make bootstrap
```

`bootstrap` will:

- run an `npm install` at the root level of the project
- iteratively `npm install` for all `packages`
- iteratively create links for all `packages` using `npm link`

Now you're ready to start developing `electrode-bolt` packages.

### watch

Once you've bootstrapped the project and you want to start developing, the most sane way to do so is to run:

```
$ make watch
```

Running this command will watch all packages for changes and run them through `babel` so any projects that are using `electrode-bolt` will automatically be able to use the features you're developing within the `packages`.

### publishing

If you have rights to publish any of these `packages`, the correct way to `publish` is to run:

```
$ make publish
```

This will:

- ask you for the type of version change you're looking to make
- look for any changes to your project from the previous version and update the version
- publish the packages to npm

One of the great advantages to publishing this way is that all versions are consistent with the version they should be published for based on what `electrode-bolt` itself is at, so it makes it a lot easier to keep versioning more consistent and easier to infer for users.
