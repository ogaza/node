import { getHandlersFor, register } from "./handlers.js";
import { helpCommandHandler } from "./help.js";
import { processFileHandler } from "./processFile.js";
import { testCommandHandler } from "./test.js";

register([helpCommandHandler, processFileHandler, testCommandHandler]);

export { getHandlersFor };
