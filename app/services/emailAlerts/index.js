const fs = require("fs");
const { promisify } = require("util");
const fsExtra = require("fs-extra");
const Promise = require("bluebird");
const writeAsync = promisify(fs.writeFile);
const path = require("path");

const fileGen = require("./AccountEmailAlert");

/**
 *
 * @param {number} i
 * @param {string} deployPrefix
 * @param {string} deployDir
 * @returns {Promise<[]>}
 */
async function generateSet(i, deployPrefix, deployDir) {
  const workflowsDirPath = path.normalize(deployDir + "/workflows");
  const existsDir = fs.existsSync(workflowsDirPath);
  if (!existsDir) {
    await fsExtra.mkdir(workflowsDirPath);
  }
  const parentObject = "Account";

  const membersNames = Array(i)
    .fill(1)
    .map((_, i) => {
      return `EmailAlert_${i}_${deployPrefix}`;
    });

  const file = fileGen(parentObject, membersNames, deployPrefix);

  const filepath = `${workflowsDirPath}/${file.filename}`;
  await writeAsync(filepath, file.xml);

  return membersNames.map((member) => `${parentObject}.${member}`);
}

module.exports = {
  generateSet,
  membersType: "WorkflowAlert",
  entitiesInSet: 1
};
