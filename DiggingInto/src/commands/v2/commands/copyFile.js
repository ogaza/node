import { createReadStream, createWriteStream } from "node:fs";
import { createHandler } from "./createHandler.js";
import { Transform } from "node:stream";

function canHandle({ name, params: { srcPath, dstPath } }) {
  return name == "copy_file";
}
function handle({ name, params: { srcPath, dstPath } }) {
  copyFile(srcPath, dstPath);
}

export const copyFileHandler = createHandler(canHandle, handle);

// copy file using streams
function copyFile(srcPath, dstPath) {
  if (!srcPath || !dstPath) {
    console.log("paths needed");
    return;
  }

  createReadStream(srcPath)
    .pipe(new Transform({ transform }))
    .pipe(createWriteStream(dstPath));
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
