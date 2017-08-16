#!/usr/bin/env node

'use strict';

const { bold } = require('chalk');
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
    console.error('Please provide a release type.');
    process.exit(1);
}

if (!['major', 'minor', 'patch'].includes(type)) {
    console.error('Invalid release type. Must be one of major|minor|patch.');
    process.exit(1);
}

release[type]().then((version) => {
    console.log('⇑', bold(version));
});
