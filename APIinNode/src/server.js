import express from "express";
import path from "path";
// const path = require("path");

const app = express();
const port = 5000;
app.use(express.static("static"));
/**
 * app.[method]([route], [route handler])
 */
app.get("/", handleRootGet);

export function appStart() {
  // creates and starts a server for our API on a defined port
  app.listen(port, function onAppListening() {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

function handleRootGet(req, res) {
  // sending back an HTML file that a browser can render on the screen.
  res.sendFile(path.resolve("pages/index.html"));
}
