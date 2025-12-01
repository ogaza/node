import express from "express";
import path from "path";
import db from "./db.js";

const app = express();
const port = 5000;

app.use(express.static("static"));

app.get("/", handleRootGet);
app.get("/recipes", handleGetRecipes);
app.get("/recipes/:id", handleGetRecipe);
app.get("/search", handleSearch);

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

async function handleGetRecipe(req, res) {
  const {
    params: { id },
  } = req;

  const { rows } = await db.query(
    `SELECT * FROM recipes WHERE recipe_id = $1`,
    [id]
  );

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age: 0, no-cache");
  res.writeHead(200);
  res.end(JSON.stringify(rows));
}

async function handleSearch({ query }, res) {
  let { term, page } = query;

  term = !!term ? term : "";
  page = !!Number(page) ? Math.floor(Number(page)) : 1;

  const pageLength = 5;
  const offset = (page - 1) * pageLength;
  const params = [`%${term}%`, offset, pageLength];

  console.log(`getting page: ${page}`);
  console.log("params", params);

  const { rows } = await db.query(
    `SELECT
       *,
       count(*) OVER()::INT AS total_count
     FROM recipes
     WHERE
       title ILIKE $1
     OFFSET $2 LIMIT $3`,
    params
  );

  res.status(500).json({ rows });
  // res.status(500).json({ message: "not implemented", page });
}
