# frappe-pr-bot

> A GitHub App built with [Probot](https://probot.github.io) that Automation of minor PR tasks

## Tasks

A list of tasks undertaken by the bot:

- Prevent PR merges on `staging` or `master` by auto closing them

## Setup

```sh
# Install dependencies
yarn

# Run the bot
yarn start
```

## Contributing

If you have suggestions for how `frappe-pr-bot` could be improved, or want to report a bug, open an [issue](https://github.com/frappe/frappe-pr-bot/issues/new)! We'd love all and any contributions.

A few things to take care of while using this:

- Lint
Run `yarn lint` before committing to prevent any linting related errors. We use `standard.js` for formatting.

- Commit
We follow conventional commits. Hence we request you to use `yarn commit` instead of `git commit`

- Tests
To test locally run `yarn test`

No PRs will be merged without test cases.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2018 Frappe Technologies <developers@erpnext.com> (https://frappe.io)
