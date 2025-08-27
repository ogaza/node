import { getHandlersFor } from "./commands/index.js";

export function handle(command) {
  const correspondingHandlers = getHandlersFor(command);

  if (!correspondingHandlers.length) {
    console.log("unknown command");
    console.log("run: digging_into --help");

    return;
  }

  correspondingHandlers.forEach((h) => {
    h.handle(command);
  });
}
