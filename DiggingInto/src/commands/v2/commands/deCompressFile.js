import { createReadStream, createWriteStream } from "node:fs";
import { createHandler } from "./createHandler.js";
import { Transform } from "node:stream";
import { createGunzip } from "node:zlib";

function canHandle({ name, params: { path } }) {
  return name == "decompress_file";
}
function handle({ name, params: { path} }) {
  deCompressFile(path);
}

export const deCompressFileHandler = createHandler(canHandle, handle);

// copy file using streams
function deCompressFile(path) {
  createReadStream(path)
    .pipe(createGunzip())
    .pipe(new Transform({ transform }))
    .pipe(createWriteStream("decompressed.txt"));
}

function transform(chunk, _, next) {
  // short node-v20 version:
  next(null, String(chunk).toLocaleLowerCase());

  // longer version:
  // this.push(String(chunk).toLocaleUpperCase());
  // next();

  // to see that the process actually deals with chunks:
  // setTimeout(function () {
  //   return next(null, String(chunk).toLocaleUpperCase());
  // }, 1000);
}
