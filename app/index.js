const fs = require("fs");
const Promise = require("bluebird");
const fsExtra = require("fs-extra");

const archiver = require("archiver");

const DEPLOY_PREFIX = "ttt";
const COUNT_OF_SETS = 1;
const DEPLOY_DIR = "./deploy/";

const packageService = require("./packageService");
const flowService = require("./flowsService");

async function generateDeployFolder(count, generator) {
  let membersNames = [];

  for (let i = 0; i < count; i++) {
    const newNames = await generator(i, DEPLOY_PREFIX, DEPLOY_DIR);
    membersNames = [...membersNames, ...newNames];
  }

  return membersNames;
}

async function zipDeployFolder(filesCount) {
  console.log(`generated ${filesCount} flows with links on each other`);
  const zipFilename = `./dist/${filesCount}-${DEPLOY_PREFIX}-Flows.zip`;

  const output = fs.createWriteStream(zipFilename);
  const archive = archiver("zip");

  output
    .on("close", function () {
      console.log(archive.pointer() / 1000000 + " total megabytes");
      console.log(`successfully archived ${zipFilename}`);
    })
    .on("error", function (err) {
      throw err;
    });

  archive.directory(DEPLOY_DIR, false);
  archive.pipe(output);
  archive.finalize();

  return Promise.resolve();
}

(async () => {
  try {
    const filesCount = flowService.filesGenFuncs.length * COUNT_OF_SETS;
    await fsExtra.emptyDir(DEPLOY_DIR);

    const membersNames = await generateDeployFolder(
      COUNT_OF_SETS,
      flowService.generateSet
    ).catch(console.error);

    await packageService.writePackageXML(membersNames, DEPLOY_DIR);

    await zipDeployFolder(filesCount);

    await fsExtra.emptyDir(DEPLOY_DIR);
  } catch (error) {
    console.log(error);
  }
})();
