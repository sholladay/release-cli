# release-cli [![Build status for Release CLI](https://img.shields.io/circleci/project/sholladay/release-cli/master.svg "Build Status")](https://circleci.com/gh/sholladay/release-cli "Builds")

> Publish a new version of your app

## Why?

 - Automate your release process.
 - Don't repeat yourself.
 - One step closer to continuous delivery.
 - Predictable, easy to use process.

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

## Related

 - [delivr](https://github.com/sholladay/delivr) - Build your code and ship it to S3
 - [build-dir](https://github.com/sholladay/build-dir) - Get a place to put your build

## Contributing

See our [contributing guidelines](https://github.com/sholladay/release-cli/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/release-cli/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/release-cli/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/release-cli/blob/master/LICENSE "License for release-cli") © [Seth Holladay](https://seth-holladay.com "Author of release-cli")

Go make something, dang it.
