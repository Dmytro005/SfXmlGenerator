const program = require("commander");
const service = require("./services");

program
  .command("generate [entity] [count] [prefix]")
  .action(async (entity = "flows", count = 1, prefix = "test-prefix") => {
    await service.generate(entity, +count, prefix);
  });

program.parse(process.argv);
