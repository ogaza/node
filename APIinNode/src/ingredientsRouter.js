import { Router } from "express";
import db from "./db.js";

const ingredientsRouter = Router();

ingredientsRouter.get("/ingredients", handleGetIngredients);
ingredientsRouter.get("/ingredients/:id", handleGetIngredient);
ingredientsRouter.post("/ingredients", handlePostIngredient);
ingredientsRouter.delete("/ingredients/:id", handleDeleteIngredient);

async function handleGetIngredients(req, res) {
  const { rows } = await db.query(`SELECT * FROM ingredients`);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age: 0, no-cache");
  res.writeHead(200);
  res.end(JSON.stringify(rows));
}

async function handleGetIngredient(req, res) {
  const {
    params: { id },
  } = req;

  const { rows } = await db.query(
    `SELECT * FROM ingredients WHERE id = $1`,
    [id]
  );

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age: 0, no-cache");
  res.writeHead(200);
  res.end(JSON.stringify(rows));
}

function handlePostIngredient() {}
function handleDeleteIngredient() {}


export default ingredientsRouter;
