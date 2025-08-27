import minimist from "minimist";

export function getCommandFromCLI() {
  var args = minimist(process.argv.slice(2), {});
  const [commandName] = args["_"];

  return { name: !args.help ? commandName : "help" };
}
