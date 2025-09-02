import { createHandler } from "./createHandler.js";
import { readFileSync } from "node:fs";
import sqlite3 from "sqlite3";

function canHandle({ name, params: { path } }) {
  return name == "db_init";
}
async function handle({ name, params: { path } }) {
  dbInit();
}

export const handler = createHandler(canHandle, handle);

function dbInit() {
  myDB.exec(initSQL);
}

var myDB = new sqlite3.Database("./src/db/my.db");
var initSQL = readFileSync("./src/db/mydb.sql", "utf-8");

