#!/usr/bin/env node

'use strict';

const
    release = require('../'),
    chalk = require('chalk'),
    cli = require('meow')(`
        Usage
          $ release [major|minor|patch]

        Example
          $ release patch
          ⇑ ${chalk.bold('0.2.0')}
    `),
    type = cli.input[0];

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
