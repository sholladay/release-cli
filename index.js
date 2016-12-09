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

const release = async (api) => {
    const type = api.name;

    const currentBranch = await branchName.get();
    if (currentBranch !== 'master') {
        throw new Error('Must be on `master` branch to release.');
    }

    const status = await git('status --porcelain');
    if (status !== '') {
        throw new Error('Dirty working tree. Commit or stash changes first.');
    }

    await git('fetch');

    const commits = await git('rev-list --count --left-only @{u}...HEAD');
    if (commits !== '0') {
        throw new Error('Remote history differs. Please pull changes.');
    }
    await del('node_modules');
    await npm('install');
    await npm('test');

    const stdout = await npm('version ' + type);
    // Remove the leading 'v', to ensure valid semver.
    const newVersion = stdout.substring('v'.length);

    await git('push --follow-tags');
    await npm('publish');

    return newVersion;
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
