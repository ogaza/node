import { readFile } from "node:fs";
import getStdin from "get-stdin";
import { createHandler } from "./createHandler.js";

function canHandle({ name, params: { path } }) {
  return (name == "process_file" && !!path) || name == "in";
}
function handle({ name, params: { path } }) {
  switch (name) {
    case "process_file":
      processFile(path);
      break;
    case "in":
      console.log("processing from stdin");
      loadFromStdin();
      break;

    default:
      break;
  }
}

export const processFileHandler = createHandler(canHandle, handle);

// processing from stdin

function loadFromStdin() {
  getStdin().then(onLoadedFromStdin).catch(onStdinError);
}

function onLoadedFromStdin(contents) {
  const processed = processString(contents.toString());
  process.stdout.write(processed);
}

function onStdinError(err) {
  console.log(err);
}

// processing from file

function processFile(filepath) {
  readFile(filepath, onFileContentsLoaded);
}

function onFileContentsLoaded(error, contents) {
  if (error) {
    console.error(error.toString());

    return;
  }
  // write takes a buffer as its param
  // so no need to stringify
  // process.stdout.write(contents);
  const processed = processString(contents.toString());
  process.stdout.write(processed);
}

// input processing

function processString(str) {
  return str.toUpperCase();
}
