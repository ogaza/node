import minimist from "minimist";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getCommandFromCLI() {
  var args = minimist(process.argv.slice(2), {});

  // printForDebugging(args);

  const basePath = process.env.BASE_PATH;
  if (basePath) {
    console.log("BASE_DIR ", path.join(__dirname, basePath));
    // console.log("BASE_DIR ", path.join(__dirname, "\\..", basePath));
  }

  const {
    _: [name],
    ...params
  } = args;

  const command = {
    name: !args.help ? name : "help",
    params,
  };

  return command;
}

function printForDebugging(args) {
  console.log("args: ", args);

  const {
    _: [name],
    ...params
  } = args;

  console.log("command: ", { name, params });
}
