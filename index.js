'use strict';

const util = require('util');
const childProcess = require('child_process');
const branchName = require('branch-name');
const del = require('del');

const exec = util.promisify(childProcess.exec);

const run = (command, arg) => {
    return exec(command + ' ' + arg).then(({ stdout }) => {
        return stdout.trimRight();
    });
};

const npm = run.bind(null, 'npm');
const git = run.bind(null, 'git');

const release = async (type) => {
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

const major = release.bind(null, 'major');
const minor = release.bind(null, 'minor');
const patch = release.bind(null, 'patch');

module.exports = {
    major,
    minor,
    patch
};
