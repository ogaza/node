import { createHandler } from "./createHandler.js";
import { readFileSync } from "node:fs";
import sqlite3 from "sqlite3";

var myDB = new sqlite3.Database("./src/db/my.db");

function canHandle({ name, params: { path } }) {
  return name == "db_get_all";
}
async function handle({ name, params: { path } }) {
  dbGetAll();
}

export const handler = createHandler(canHandle, handle);

function dbGetAll() {
  myDB.all("SELECT ID, DATA FROM OTHER", onGetAll);
}

function onGetAll(_, data) {
  console.table(data);
}
