'use strict';

const { exec } = require('child_process');
const branchName = require('branch-name');
const del = require('del');

const run = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(stdout.trimRight());
        });
    });
};

const npm = (command) => {
    return run('npm ' + command);
};

const git = (command) => {
    return run('git ' + command);
};

const release = (api) => {
    const type = api.name;

    let newVersion;

    return branchName.get()
        .then((currentBranch) => {
            if (currentBranch !== 'master') {
                throw new Error('Must be on `master` branch to release.');
            }
        })
        .then(() => {
            return git('status --porcelain');
        })
        .then((status) => {
            if (status !== '') {
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
        .then(() => {
            return npm('test');
        })
        .then(() => {
            return npm('version ' + type);
        })
        .then((stdout) => {
            // Remove the leading 'v', to ensure valid semver.
            newVersion = stdout.substring('v'.length);
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
};

const major = function major() {
    return release(major);
};

const minor = function minor() {
    return release(minor);
};

const patch = function patch() {
    return release(patch);
};

module.exports = {
    major,
    minor,
    patch
};
