#!/usr/bin/env node

'use strict';

const
    release = require('../'),
    chalk = require('chalk'),
    cli = require('meow')(`
        Usage
          $ release [patch | minor | major]

        Example
          $ release patch
          ⇑ ${chalk.bold('0.0.1')}
          $ release minor
          ⇑ ${chalk.bold('0.1.0')}
          $ release major
          ⇑ ${chalk.bold('1.0.0')}
    `),
    type = cli.input[0];

require('update-notifier')({pkg: cli.pkg}).notify();

if (!type) {
    console.error('Please provide a release type.');
    process.exit(1);
}

if (!['major', 'minor', 'patch'].includes(type)) {
    console.error('Invalid release type. Must be one of major|minor|patch.');
    process.exit(1);
}

release[type]().then((version) => {
    console.log('⇑', chalk.bold(version));
});
