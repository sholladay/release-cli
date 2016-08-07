# release-cli [![Build status for release-cli on Circle CI.](https://img.shields.io/circleci/project/sholladay/release-cli/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/release-cli "Release CLI Builds")

> Publish a new version of your app.

## Why?

 - Don't repeat yourself.
 - One step closer to continuous delivery.
 - Predictable, easy-to learn process.

## Install

```sh
npm install release-cli --global
```

## Usage

```
$ release --help

  Usage
    $ release [patch | minor | major]

  Example
    $ release patch
    ⇑ 0.0.1
    $ release minor
    ⇑ 0.1.0
    $ release major
    ⇑ 1.0.0
```

Perform a release, incrementing the [version](http://semver.org/).

```
$ release patch
⇑ 0.0.1
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
