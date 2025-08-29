import { readFile as readFileFS } from "node:fs";
import getStdin from "get-stdin";
import { createHandler } from "./createHandler.js";

function canHandle({ name, params: { path } }) {
  return (name == "read_file" && !!path) || name == "read_stdin";
}
function handle({ name, params: { path } }) {
  switch (name) {
    case "read_file":
      readFile(path);
      break;
    case "read_stdin":
      console.log("processing from stdin");
      readStdin();
      break;

    default:
      break;
  }
}

export const readFileHandler = createHandler(canHandle, handle);

// processing file after it is fully loaded from stdin stream

function readStdin() {
  getStdin().then(onStdinRead).catch(onStdinReadError);
}

function onStdinRead(contents) {
  const processed = processString(contents.toString());
  process.stdout.write(processed);
}

function onStdinReadError(err) {
  console.log(err);
}

// processing file

function readFile(filepath) {
  readFileFS(filepath, onFileRead);
}

function onFileRead(error, contents) {
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
