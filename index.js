'use strict';

const
    branchName = require('branch-name'),
    exec = require('child_process').exec;

function run(command) {

    return new Promise((resolve, reject) => {

        exec(command, (err, stdout) => {

            if (err) {
                reject(err);
                return;
            }

            resolve(stdout.trimRight());
        });
    });
}

function npm(command) {
    return run('npm ' + command);
}

function git(command) {
    return run('git ' + command);
}

function release(type) {

    let newVersion;

    return branchName.get().then((currentBranch) => {
            if (currentBranch !== 'master') {
                throw new Error('Must be on \"master\" branch to release.');
            }
        })
        .then(() => {
            return git('status --porcelain');
        })
        .then((stdout) => {
            if (stdout !== '') {
                throw new Error('Dirty working tree. Commit or stash changes first.');
            }
        })
        .then(() => {
            return git('fetch');
        })
        .then(() => {
            return git('rev-list --count --left-only @{u}...HEAD');
        })
        .then((stdout) => {
            if (stdout !== '0') {
                throw new Error('Remote history differs. Please pull changes.');
            }
        })
        // .then(() => {
        //     return del('node_modules');
        // })
        // .then(() => {
        //     return npm('install');
        // })
        // .then(() => {
        //     return npm('test');
        // })
        .then(() => {
            return npm('version ' + type);
        })
        .then((stdout) => {
            // TODO: It may be better to parse the semver string.
            newVersion = stdout.slice(1).trimRight();
        })
        .then(() => {
            return git('push --follow-tags');
        })
        .then(() => {
            return npm('publish');
        })
        .then(() => {
            return newVersion;
        });
}

function major() {
    return release(major.name);
}

function minor() {
    return release(minor.name);
}

function patch() {
    return release(patch.name);
}

module.exports = {
    major,
    minor,
    patch
};
