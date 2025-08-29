import { createHandler } from "./createHandler.js";

function canHandleHelpCommand({ name }) {
  return name === "help";
}
function handleHelpCommand() {
  console.log("--------------------------------------------------");
  console.log("digging_into CLI App");
  console.log("--------------------------------------------------");
  console.log("digging_into read_file --path=\"test.txt\"   read test.txt file");
  console.log("cat test.txt | digging_into read_stdin       as abowe but from stdin");
  console.log("digging_into stream_file --path=\"test.txt\" streams test.txt to stdout");
  console.log("cat test.txt | digging_into stream_stdin as abowe using stream pipe");
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