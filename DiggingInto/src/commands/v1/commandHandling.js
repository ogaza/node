const commandHandlers = {
  help: handleHelpCommand,
  test: handleTestCommand,
};

export function handle({ name }) {
  commandHandlers[name]();
}

function handleHelpCommand() {
  console.log("--------------------------------------------------");
  console.log("digging_into CLI App");
  console.log("--------------------------------------------------");
  console.log("digging_into test        runs test command");
  console.log("digging_into --help      prints help");
  console.log("--------------------------------------------------");
  console.log("");
}

export function handleTestCommand() {
  console.log("test command executed");
}
