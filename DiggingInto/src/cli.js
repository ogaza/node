import minimist from "minimist";

export function getCommandFromCLI() {
  var args = minimist(process.argv.slice(2), {});

  // printForDebugging(args);

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
