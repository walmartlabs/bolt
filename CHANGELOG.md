# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.0 Release Candidate

Big, tiny changes!

`electrode-bolt` now no longer has it's own executable but uses [`builder`](https://github.com/FormidableLabs/builder) to execute tasks from the `package.json`.

No actual API has changed, but if you don't use `builder` you're going to be out of luck trying to get this thing working.

## 0.1.6

- [`d5aab5f`](https://github.com/walmartreact/electrode-bolt/commit/d5aab5fe37a17d5b187f5bf9386a169f67d5b709) Upgrade `eslint-config-defaults` to `7.0.0`
- [`3cd90ba`](https://github.com/walmartreact/electrode-bolt/commit/3cd90baa8850f2f42d52a42c8f6d1e316867090d) Chore change port for `demo` and `dev` server to `4000`
- [`6395d93`](https://github.com/walmartreact/electrode-bolt/commit/6395d93279faf4a55c4fefc52710554051594c56) Remove all `open` tasks since they weren't working in the first place
