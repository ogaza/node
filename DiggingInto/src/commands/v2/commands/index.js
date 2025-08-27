import { getHandlersFor, register } from "./handlers.js";
import { helpCommandHandler } from "./help.js";
import { testCommandHandler } from "./test.js";

register([helpCommandHandler, testCommandHandler]);

export { getHandlersFor };
