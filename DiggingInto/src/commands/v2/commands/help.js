import { createHandler } from "./createHandler.js";

function canHandleHelpCommand({ name }) {
  return name === "help";
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

// export -------------------------------------------------------

export const helpCommandHandler = createHandler(
  canHandleHelpCommand,
  handleHelpCommand
);