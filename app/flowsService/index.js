const fs = require("fs");
const { promisify } = require("util");
const fsExtra = require("fs-extra");
const Promise = require("bluebird");
const writeAsync = promisify(fs.writeFile);

const FLOWS_DIR_NAME = "flows";

const filesGenFuncs = [
  require("./rootFlow"),
  require("./masterFlow"),
  require("./masterFlow2"),
  require("./testSubflow1"),
  require("./testSubflow2"),
  require("./testSubflow3"),
];

async function generateSet(i, deployPrefix, deployDir) {
  const membersNames = [];
  const flowsDirPath = `${deployDir}${FLOWS_DIR_NAME}`;

  await fsExtra.mkdir(flowsDirPath);

  await Promise.map(filesGenFuncs, (func) => {
    const r = func(`${deployPrefix}_${i}`);
    const [flowName] = r.filename.split(".");
    membersNames.push(flowName);
    const r2 = writeAsync(`${flowsDirPath}/${r.filename}`, r.xml);
    return r2;
  });
  return membersNames;
}

module.exports = {
  generateSet,
  filesGenFuncs,
};
