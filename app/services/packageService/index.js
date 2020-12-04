const fs = require("fs");
const { promisify } = require("util");
const writeAsync = promisify(fs.writeFile);

const generatePackageXml = require("./package");

module.exports.filename = `package.xml`;

module.exports.writePackageXML = (membersNames, deployDir) => {
  const xml = generatePackageXml(membersNames);
  return writeAsync(`${deployDir}/${this.filename}`, xml);
};
