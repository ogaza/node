import { readFile } from "node:fs";
import { createHandler } from "./createHandler.js";

function canHandle({ name, params: { path } }) {
  return name == "process_file" && !!path;
}
function handle({ params: { path } }) {
  processFile(path);
}

export const processFileHandler = createHandler(canHandle, handle);

// file loading and processing

function processFile(filepath) {
  readFile(filepath, function onContentsLoaded(error, contents) {
    if (error) {
      console.error(error.toString());

      return;
    }

    // write takes a buffer as its param
    // so no need to stringify
    // process.stdout.write(contents);

    const processedContent = processString(contents.toString());
    process.stdout.write(processedContent);
  });
}

function processString(str) {
  return str.toUpperCase();
}
