import { createReadStream, createWriteStream } from "node:fs";
import { createHandler } from "./createHandler.js";
import { Transform } from "node:stream";
import { createGzip } from "node:zlib";

function canHandle({ name, params: { path } }) {
  return name == "compress_file";
}
function handle({ name, params: { path } }) {
  compressFile(path);
}

export const compressFileHandler = createHandler(canHandle, handle);

// copy file using streams
function compressFile(path) {

  // version with callbacks informing abot
  // the process being run and being finished
  var inputStream = createReadStream(path);

  inputStream.on("data", function (chunk) {
    process.stdout.write("processing:\n");
    process.stdout.write(chunk);
  });
  inputStream.on("end", function () {
    console.log("compression complete");
  });

  inputStream
    .pipe(new Transform({ transform }))
    .pipe(createGzip())
    .pipe(createWriteStream("compressed.gz"));

  // the base version of processing
  // createReadStream(path)
  //   .pipe(new Transform({ transform }))
  //   .pipe(createGzip())
  //   .pipe(createWriteStream("compressed.gz"));
}

function transform(chunk, _, next) {
  // short node-v20 version:
  next(null, String(chunk).toLocaleUpperCase());

  // longer version:
  // this.push(String(chunk).toLocaleUpperCase());
  // next();

  // to see that the process actually deals with chunks:
  // setTimeout(function () {
  //   return next(null, String(chunk).toLocaleUpperCase());
  // }, 1000);
}
