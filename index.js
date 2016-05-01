'use strict';

const
    exec = require('child_process').exec;

function release(type, opt) {

    return new Promise((resolve) => {
        exec('npm version ' + type, (err, stdout) => {
            if (err) {
                throw err;
            }
            // TODO: It would be better to parse the semver string.
            resolve(stdout.slice(1).trimRight());
        });
    });
}

function major() {
    return release(major.name, ...arguments);
}

function minor() {
    return release(minor.name, ...arguments);
}

function patch() {
    return release(patch.name, ...arguments);
}

module.exports = {
    major,
    minor,
    patch
};
