import { getHandlersFor, register } from "./handlers.js";
import { helpCommandHandler } from "./help.js";
import { readFileHandler } from "./readFile.js";
import { streamFileHandler } from "./streamFile.js";
import { copyFileHandler } from "./copyFile.js";
import { testCommandHandler } from "./test.js";

register([
  helpCommandHandler,
  readFileHandler,
  streamFileHandler,
  copyFileHandler,
  testCommandHandler,
]);

export { getHandlersFor };
