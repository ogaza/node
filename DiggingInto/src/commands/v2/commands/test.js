import { createHandler } from "./createHandler.js";

function canHandleTestCommand({ name }) {
  return name === "test";
}
function handleTestCommand() {
  console.log("test command executed");
}

// export -------------------------------------------------------

export const testCommandHandler = createHandler(
  canHandleTestCommand,
  handleTestCommand
);

