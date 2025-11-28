import express from "express";
import path from "path";
import db from "./db.js";

const app = express();
const port = 5000;

app.use(express.static("static"));

app.get("/", handleRootGet);
app.get("/recipes", handleGetRecipes);

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

async function handleGetRecipes(req, res) {

  const { rows } = await db.query(`SELECT * FROM recipes`);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age: 0, no-cache");
  res.writeHead(200);
  res.end(JSON.stringify(rows));
}
