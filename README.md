# release-cli

> Publish a new version of your app.

## Why?

 - Don't repeat yourself.
 - One step closer to continuous delivery.
 - Reasons.

## Install

````sh
npm install release-cli --global
````

## Usage

```
$ release --help

  Usage
    $ release <major|minor|patch>

  Example
    $ release patch
    => 0.0.1
```

Perform a release, incrementing the [version](http://semver.org/).

```
$ release patch
=> 0.0.1
```

## Contributing

See our [contributing guidelines](https://github.com/sholladay/release-cli/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/release-cli/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/release-cli/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/release-cli/blob/master/LICENSE "The license for release-cli.") © [Seth Holladay](http://seth-holladay.com "Author of release-cli.")

Go make something, dang it.
