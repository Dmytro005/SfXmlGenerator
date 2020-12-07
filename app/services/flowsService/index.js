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

/**
 *
 * @param {number} i
 * @param {string} deployPrefix
 * @param {string} deployDir
 * @returns {Promise<[]>}
 */
async function generateSet(i, deployPrefix, deployDir) {
  const membersNames = [];

  const flowsDirPath = path.normalize(deployDir + "/flows");

  const existsDir = fs.existsSync(flowsDirPath);

  if (!existsDir) {
    await fsExtra.mkdir(flowsDirPath);
  }

  await Promise.map(filesGenFuncs, (func) => {
    const r = func(`${deployPrefix}_${i}`);
    const [flowName] = r.filename.split(".");
    membersNames.push(flowName);
    return writeAsync(`${flowsDirPath}/${r.filename}`, r.xml);
  });
  return membersNames;
}

async function generateDeployFolder(count, prefix, deployDir) {
  let membersNames = [];

  for (let i = 0; i < count; i++) {
    const newNames = await generateSet(count, prefix, deployDir);
    membersNames = [...membersNames, ...newNames];
  }

  return membersNames;
}

module.exports = {
  generateSet: generateDeployFolder,
  membersType: "Flow",
  entitiesInSet: filesGenFuncs.length,
};
