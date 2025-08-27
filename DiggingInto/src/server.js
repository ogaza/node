import { getCommandFromCLI } from "./cli.js";
import { handle } from "./commands/v2/commandHandling.js";
// import { handle } from "./commands/v1/commandHandling.js";

handle(getCommandFromCLI());
