'use strict';

const util = require('util');
const childProcess = require('child_process');
const branchName = require('branch-name');
const fresh = require('fresh-cli');

const exec = util.promisify(childProcess.exec);

const run = async (command, arg) => {
    const { stdout } = await exec(command + ' ' + arg);
    return stdout.trimRight();
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
    await fresh();
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
