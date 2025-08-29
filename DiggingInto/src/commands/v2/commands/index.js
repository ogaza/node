import { getHandlersFor, register } from "./handlers.js";
import { helpCommandHandler } from "./help.js";
import { readFileHandler } from "./readFile.js";
import { streamFileHandler } from "./streamFile.js";
import { testCommandHandler } from "./test.js";

register([
  helpCommandHandler,
  readFileHandler,
  streamFileHandler,
  testCommandHandler,
]);

export { getHandlersFor };
