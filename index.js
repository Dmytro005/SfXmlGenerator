// Change params
// npm run generate
const deployPrefix = "_issue_5";
const count = 3;

const fs = require("fs");

const Promise = require("bluebird");
const fsExtra = require("fs-extra");
const { promisify } = require("util");
const archiver = require("archiver");

const writeAsync = promisify(fs.writeFile);

const filesGenFuncs = [
  require("./files/rootFlow"),
  require("./files/masterFlow"),
  require("./files/masterFlow2"),
  require("./files/testSubflow1"),
  require("./files/testSubflow2"),
  require("./files/testSubflow3"),
];

const package = require("./files/package");

// directory path
const deployFlowsDir = "./deploy/flows/";
const deployDir = "./deploy/";

async function generateSet(i) {
  const membersNames = [];
  await Promise.map(filesGenFuncs, (func) => {
    const r = func(`${deployPrefix}_${i}`);
    const [flowName] = r.filename.split(".");
    membersNames.push(flowName);
    return writeAsync(`${deployFlowsDir}${r.filename}`, r.xml);
  });

  return membersNames;
}

const execute = async (count) => {
  await fsExtra.remove("./deploy/package.xml");
  fsExtra.emptyDirSync(deployFlowsDir);

  let membersNames = [];

  for (let i = 0; i < count; i++) {
    const newNames = await generateSet(i);
    membersNames = [...membersNames, ...newNames];
  }
  const r = package(membersNames);

  await writeAsync(`${deployDir}${r.filename}`, r.xml);

  return Promise.resolve();
};

(async () => {
  const filesCount = filesGenFuncs.length * count;
  await execute(count).catch(console.error);

  console.log(`generated ${filesCount} flows with links on each other`);

  const output = fs.createWriteStream(`./dist/${filesCount}-${deployPrefix}-Flows.zip`);
  const archive = archiver("zip");

  output
    .on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(archive.pointer() / 1000000 + " total megabytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
    })
    .on("end", function () {
      console.log("Data has been drained");
    })
    .on("error", function (err) {
      throw err;
    });

  archive.directory(deployDir, false);
  archive.pipe(output);
  archive.finalize();
})();
