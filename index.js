'use strict';

const
    branchName = require('branch-name'),
    del        = require('del'),
    exec       = require('child_process').exec;

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

function release(api) {

    const type = api.name;

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
        .then(() => {
            return del('node_modules');
        })
        .then(() => {
            return npm('install');
        })
        // .then(() => {
        //     return npm('test');
        // })
        .then(() => {
            return npm('version ' + type);
        })
        .then((stdout) => {
            // Remove the leading 'v', to ensure valid semver.
            newVersion = stdout.slice(1);
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
    return release(major);
}

function minor() {
    return release(minor);
}

function patch() {
    return release(patch);
}

module.exports = {
    major,
    minor,
    patch
};
