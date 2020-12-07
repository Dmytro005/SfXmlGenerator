const fs = require("fs");
const Promise = require("bluebird");
const fsExtra = require("fs-extra");
const path = require("path");

const archiver = require("archiver");

const DEPLOY_DIR = path.normalize(__dirname + "../../../deploy");

const packageService = require("./packageService");
const flowService = require("./flowsService");
const emailAlerts = require("./emailAlerts");

function mapEntityToService(entity) {
  const map = {
    flows: flowService,
    "email-alerts": emailAlerts,
  };

  const service = map[entity || false];

  if (!service)
    throw new Error(
      `Please select valid entity type: \n - ${Object.keys(map).join("\n - ")}`
    );

  return service;
}

async function zipDeployFolder({
  filesPrefix,
  setsCount,
  entitiesInSet = 1,
  membersType,
}) {
  const filesCount = setsCount * entitiesInSet;
  const zipFilename = `./dist/${filesCount}-${filesPrefix}-${membersType}.zip`;

  const output = fs.createWriteStream(zipFilename);
  const archive = archiver("zip");

  output.on("error", function (err) {
    throw err;
  });

  archive.directory(DEPLOY_DIR + "/", false);
  archive.pipe(output);
  archive.finalize();

  console.log(`Generated ${filesCount} ${membersType}`);
  console.log(`Archived data set in ${zipFilename}`);

  return Promise.resolve();
}

module.exports.generate = async (entity, count, prefix) => {
  try {
    await fsExtra.emptyDir(DEPLOY_DIR);
    const service = mapEntityToService(entity);

    const membersNames = await service.generateSet(count, prefix, DEPLOY_DIR);

    await packageService.writePackageXML(
      membersNames,
      service.membersType,
      DEPLOY_DIR
    );

    await zipDeployFolder({
      setsCount: count,
      filesPrefix: prefix,
      entitiesInSet: service.entitiesInSet,
      membersType: service.membersType,
    });

    await fsExtra.emptyDir(DEPLOY_DIR);
  } catch (error) {
    console.log(error);
  }
};
