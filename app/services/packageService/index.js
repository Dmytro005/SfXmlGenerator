const fs = require("fs");
const { promisify } = require("util");
const writeAsync = promisify(fs.writeFile);

const generatePackageXml = require("./singleTypePackage");
const generateMultiplePackageXml = require("./multipleTypesPackage");

module.exports.filename = `package.xml`;

module.exports.writePackageXML = (membersNames, membersType, deployDir) => {
  let xml = {}
  if (membersNames instanceof Object && membersType instanceof Array) {
    xml = generateMultiplePackageXml(membersNames, membersType)
  } else {
    xml = generatePackageXml(membersNames, membersType);
  }
  return writeAsync(`${deployDir}/${this.filename}`, xml);
};
