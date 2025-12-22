import { Router } from "express";
import db from "./db.js";

const router = Router();

router.get("/recipes", handleGetRecipes);
router.get("/recipes/:id", handleGetRecipe);
router.post("/recipes", handlePostRecipe);
router.delete("/recipes/:id", handleDeleteRecipe);

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

function handlePostRecipe() {}
function handleDeleteRecipe() {}


export default router;
