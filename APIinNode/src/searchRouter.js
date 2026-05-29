import { Router } from "express";
import db from "./db.js";

const searchRouter = Router();

searchRouter.get("/search", handleSearch);

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
    params,
  );

  res.status(200).json({ rows });
  // res.status(500).json({ message: "not implemented", page });
}

export default searchRouter;
