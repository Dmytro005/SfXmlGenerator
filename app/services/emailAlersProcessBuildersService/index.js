const fs = require("fs");
const { promisify } = require("util");
const fsExtra = require("fs-extra");
const Promise = require("bluebird");
const writeAsync = promisify(fs.writeFile);
const path = require("path");

const PBGenerator = require("./ProcessBuilderUsesEmailAlert");
const EMGenerator = require("./EmailAlertUsedByProcessBuilders");

/**
 *
 * @param {number} setsCount
 * @param {string} deployPrefix
 * @param {string} deployDir
 * @returns {Promise<[]>}
 */
async function generateSet(setsCount, deployPrefix, deployDir) {
  const workflowsDirPath = path.normalize(deployDir + "/workflows");
  const flowsDirPath = path.normalize(deployDir + "/flows");

  if (!fs.existsSync(workflowsDirPath)) {
    await fsExtra.mkdir(workflowsDirPath);
  }

  if (!fs.existsSync(flowsDirPath)) {
    await fsExtra.mkdir(flowsDirPath);
  }

  const parentObject = "Account";

  const { generatePbs, generateEmailAlerts, members } = Array(setsCount)
    .fill(1)
    .reduce(
      (acc, _, i) => {
        const emailAlert1 = `First_Email_Alert_of_pb_${i}_${deployPrefix}`;
        const emailAlert2 = `Second_Email_Alert_of_pb_${i}_${deployPrefix}`;

        const emailAlert1FullName = `${parentObject}.${emailAlert1}`;
        const emailAlert2FullName = `${parentObject}.${emailAlert2}`;
        const pbName = `Process_builders_${i}_${deployPrefix}`;

        acc.generatePbs.push({
          pbName,
          emailAlerts: [emailAlert1FullName, emailAlert2FullName],
        });

        acc.generateEmailAlerts = [...acc.generateEmailAlerts, emailAlert1, emailAlert2];

        acc.members.WorkflowAlert = [
          ...acc.members.WorkflowAlert,
          emailAlert1FullName,
          emailAlert2FullName,
        ];

        acc.members.Flow.push(pbName);

        return acc;
      },
      {
        generatePbs: [],
        generateEmailAlerts: [],
        members: { WorkflowAlert: [], Flow: [] },
      }
    );

  await Promise.map(generatePbs, async (pb) => {
    const pbData = await PBGenerator(pb.pbName, pb.emailAlerts);
    const filename = `${flowsDirPath}/${pbData.filename}`;
    return writeAsync(filename, pbData.xml);
  });

  const emailAlertsData = await EMGenerator(generateEmailAlerts)
  const emailAlertFilename = `${workflowsDirPath}/${emailAlertsData.filename}`
  await writeAsync(emailAlertFilename, emailAlertsData.xml);


  return members;
}

module.exports = {
  generateSet,
  membersType: ["WorkflowAlert", "Flow"],
  entitiesInSet: 2,
};
