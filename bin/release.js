#!/usr/bin/env node

'use strict';

const
    meow = require('meow'),
    release = require('../'),
    chalk = require('chalk'),
    cli = meow(`
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

if (!/^(?:major|minor|patch)/.test(type)) {
    console.error('Invalid release type. Must be one of major|minor|patch.');
    process.exit(1);
}

release[type](cli.flags).then((version) => {
    console.log('⇑', chalk.bold(version));
});
