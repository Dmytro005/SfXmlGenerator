const fs = require("fs");
const Promise = require("bluebird");
const fsExtra = require("fs-extra");
const path = require("path");

const archiver = require("archiver");

const DEPLOY_DIR = path.normalize(__dirname + "../../../deploy");

const packageService = require("./packageService");
const flowService = require("./flowsService");

async function generateDeployFolder({ count, generator, prefix }) {
  let membersNames = [];

  for (let i = 0; i < count; i++) {
    const newNames = await generator(i, prefix, DEPLOY_DIR);
    membersNames = [...membersNames, ...newNames];
  }

  return membersNames;
}

async function zipDeployFolder(filesCount, filesPrefix) {
  console.log(`generated ${filesCount} flows with links on each other`);
  const zipFilename = `./dist/${filesCount}-${filesPrefix}-Flows.zip`;

  const output = fs.createWriteStream(zipFilename);
  const archive = archiver("zip");

  output.on("error", function (err) {
    throw err;
  });

  archive.directory(DEPLOY_DIR, false);
  archive.pipe(output);
  archive.finalize();
  console.log(`successfully archived ${zipFilename}`);
  return Promise.resolve();
}

module.exports.generate = async (entity, count, prefix) => {
  try {
    const filesCount = flowService.filesGenFuncs.length * count;

    await fsExtra.emptyDir(DEPLOY_DIR);

    const membersNames = await generateDeployFolder({
      prefix,
      count,
      generator: flowService.generateSet,
    }).catch(console.error);


    console.log({ membersNames });

    await packageService.writePackageXML(membersNames, DEPLOY_DIR);

    await zipDeployFolder(filesCount, prefix);

    await fsExtra.emptyDir(DEPLOY_DIR);
  } catch (error) {
    console.log(error);
  }
};
