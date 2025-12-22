import express from "express";
import path from "path";
import db from "./db.js";
import router from "./router.js";

const app = express();
const port = 5000;

app.use(express.static("static"));

app.get("/", handleRootGet);
app.get("/search", handleSearch);

app.use("/api", router);

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
