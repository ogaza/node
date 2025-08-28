import { createHandler } from "./createHandler.js";

function canHandleHelpCommand({ name }) {
  return name === "help";
}
function handleHelpCommand() {
  console.log("--------------------------------------------------");
  console.log("digging_into CLI App");
  console.log("--------------------------------------------------");
  console.log("digging_into process_file --path=\"test.txt\"   processes test.txt file");
  console.log("cat test.txt | digging_into in        as abowe but using stdin");
  console.log("BASE_PATH=files digging_into ...      sets env variable BASE_PATH");
  console.log("digging_into test                     runs test command");
  console.log("digging_into --help                   prints help");
  console.log("--------------------------------------------------");
  console.log("");
}

// export -------------------------------------------------------

export const helpCommandHandler = createHandler(
  canHandleHelpCommand,
  handleHelpCommand
);