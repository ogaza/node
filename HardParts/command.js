import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { startServer } from "./greetings/src/server.js";

yargs(hideBin(process.argv))
  .command(
    "queues",
    "node queues code example",
    () => {},
    async (argv) => {
      await import("./queues/index.js");
    }
  )
  .command(
    "greetings [port]",
    "launch greetings server",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 3000,
        type: "number",
      });
    },
    async (argv) => {
      startServer(argv.port);
    }
  )
  .demandCommand(1)
  .parse();
