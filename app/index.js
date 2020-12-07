const program = require("commander");
const service = require("./services");

program
  .command("generate [entity] [count] [prefix]")
  .description(
    "Generate a set of data for deploying to SF `generate <flows, email-alerts> <conut, 1> [prefix, testing]` "
  )
  .action(async (entity = "flows", count = 1, prefix = "test-prefix") => {
    await service.generate(entity, +count, prefix);
  });

program.command("*").action(() => {
  console.log("Unknown command!");
  program.help();
});

program.parse(process.argv);
