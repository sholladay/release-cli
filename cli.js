#!/usr/bin/env node

'use strict';

const { bold } = require('chalk');
const ora = require('ora');
const cli = require('meow')(`
    Usage
      $ release [patch | minor | major]

    Example
      $ release patch
      ⇑ ${bold('0.0.1')}
      $ release minor
      ⇑ ${bold('0.1.0')}
      $ release major
      ⇑ ${bold('1.0.0')}
`);
const release = require('.');

require('update-notifier')({ pkg : cli.pkg }).notify();

const [type] = cli.input;

if (!type) {
    console.error('Provide a release type, e.g. major, minor, or patch.');
    process.exit(1);
}

if (!['major', 'minor', 'patch'].includes(type)) {
    console.error('Invalid release type. Must be major, minor, or patch.');
    process.exit(1);
}

const spinner = ora({
    text : `Releasing a new ${bold(type)} version.`
});
spinner.start();

release[type]()
    .then((version) => {
        spinner.stop();
        console.log('⇑', bold(version));
    })
    .catch((err) => {
        spinner.fail(err.stack);
        process.exit(1);
    });
