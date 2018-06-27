// https://gist.github.com/quarterto/11389733d6258bb8dc9443998205b816

const semver = require('semver');
const { engines } = require('../package.json');

module.exports = () => {
  if (!engines || !engines.node) {
    console.log('⤼ no node version in package.json, skipping verification');
  } else if (semver.satisfies(process.versions.node, engines.node)) {
    console.log(`✔︎ version ${process.versions.node} of node satisfies ${engines.node} from package.json`);
  } else {
    console.log(`✘ version ${process.versions.node} of node does not satisfy ${engines.node} from package.json`);
    process.exit(1);
  }
};
