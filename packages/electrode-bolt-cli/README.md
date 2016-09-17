# bolt-cli

> `bolt` command line interface.

Install this globally to have access to the bolt command. _This is not bolt itself,_ that can be found at [walmartreact/bolt](https://github.com/walmartreact/electrode-bolt).

```
npm install -g bolt-cli
```

## Usage

### Local Bolt dependency

Within a package that has `bolt` installed as a dependency:

To list bolt tasks, you can simply run `bolt`.

To run a `bolt` task, run `bolt <task>`. If no task exists, bolt will let you know.

## Notes

- This tool isn't required for using the `bolt` tool, but it allows you to run `bolt` tasks from the command line easily rather than having to have bolt itself installed globally or having all of your `npm run` tasks directly linked to every task `bolt` provides.

## Contributing

### Scripts

| Command | Action |
| `link:dev` | Performs a symlink to your `npm prefix -g` for ease of development |
| `dev` | Watches `src` for changes, transpiles to `bin/bolt` with `babel` |
| `build` | Makes `bin` directory if it doesn't exist, transpiles `src` to `bin/bolt` with `babel` |

### Publishing

`src/bolt-cli.js` is built to `bin/bolt` on `npm run prepublish`
