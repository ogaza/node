import fs from "node:fs";
// import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

fs.readFile(`${__dirname}/tweets.json`, useTweets);
// fs.readFile("./tweets.json", useTweets);
// const file = fs.readFile("./tweets.json", useTweets);
// file.then(useTweets);
setTimeout(printHello, 0);
setImmediate(immediate);
console.log("me first");
blockFor500ms();

// functions ---------------------

function printHello() {
  console.log("hello");
}

function immediate() {
  console.log("immediate");
}

function useTweets(error, data) {
  console.log("tweets loaded");
  // console.log(data);
  console.log(JSON.parse(data));
}

function blockFor500ms() {
  for (let i = 0; i < 500000000; i++) {
    if (i % 1000000000 == 0) {
      console.log("busy");
      // console.log(file);
    }
  }
}
