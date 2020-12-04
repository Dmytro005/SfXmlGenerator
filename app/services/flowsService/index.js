const fs = require("fs");
const { promisify } = require("util");
const fsExtra = require("fs-extra");
const Promise = require("bluebird");
const writeAsync = promisify(fs.writeFile);
const path = require("path");

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

  const flowsDirPath = path.normalize(deployDir + "/flows");

  console.log({ flowsDirPath });
  const existsDir = fs.existsSync(flowsDirPath);

  if (!existsDir) {
    await fsExtra.mkdir(flowsDirPath);
  }

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
