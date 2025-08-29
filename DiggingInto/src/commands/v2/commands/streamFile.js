import { createReadStream } from "node:fs";
import { createHandler } from "./createHandler.js";
import { Transform } from "node:stream";

function canHandle({ name, params: { path } }) {
  return name == "stream_stdin" || name == "stream_file";
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
  var transformStream = new Transform({ transform });
  process.stdin.pipe(transformStream).pipe(process.stdout);
}

// processing from file

function streamFile(filepath) {
  // short version:
  createReadStream(filepath) // creates readstream
    .pipe(new Transform({ transform })) // pipes it to writable transform stream
    .pipe(process.stdout); // pipes resulting readable stream to the final writable stdout strean

  // verbose version:
  // var transformStream = new Transform({ transform });
  // var fileStream = createReadStream(filepath);
  // fileStream.pipe(transformStream).pipe(process.stdout);
}

function transform(chunk, _, next) {
  // short node-v20 version:
  next(null, String(chunk).toLocaleUpperCase());

  // longer version:
  // this.push(String(chunk).toLocaleUpperCase());
  // next();

  // to see that the process actually deals with chunks:
  // note: each chunk takes about 64kB, so the file
  // needs to be bigger than that if there are to be
  // at least two iterations
  // setTimeout(function () {
  //   return next(null, String(chunk).toLocaleUpperCase());
  // }, 1000);

}
