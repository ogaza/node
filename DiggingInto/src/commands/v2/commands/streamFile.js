import { createReadStream } from "node:fs";
import { createHandler } from "./createHandler.js";
import { Transform } from "node:stream";

function canHandle({ name, params: { path } }) {
  return (
    name == "stream_stdin" ||
    name == "stream_file"
  );
}
function handle({ name, params: { path } }) {
  switch (name) {
    case "stream_stdin":
      streamStdin();
      break;
    case "stream_file":
      streamFile(path);
      break;

    default:
      break;
  }
}

export const streamFileHandler = createHandler(canHandle, handle);

// processing file as it is being read from stdin
function streamStdin() {
  var stream = process.stdin;
  stream.pipe(process.stdout);
}

// processing from file

function streamFile(filepath) {
  const fileStream = createReadStream(filepath);

  fileStream.pipe(process.stdout);
}
