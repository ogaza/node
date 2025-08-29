import { getHandlersFor, register } from "./handlers.js";
import { helpCommandHandler } from "./help.js";
import { readFileHandler } from "./readFile.js";
import { streamFileHandler } from "./streamFile.js";
import { compressFileHandler } from "./compressFile.js";
import { deCompressFileHandler } from "./deCompressFile.js";
import { copyFileHandler } from "./copyFile.js";
import { testCommandHandler } from "./test.js";

register([
  helpCommandHandler,
  readFileHandler,
  streamFileHandler,
  compressFileHandler,
  deCompressFileHandler,
  copyFileHandler,
  testCommandHandler,
]);

export { getHandlersFor };
