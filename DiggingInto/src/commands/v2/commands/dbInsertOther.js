import { createHandler } from "./createHandler.js";
import { readFileSync } from "node:fs";
import sqlite3 from "sqlite3";

function canHandle({ name, params: { path } }) {
  return name == "db_insert_other";
}
function handle({ name, params }) {
  dbInsertOther(params);
}

export const handler = createHandler(canHandle, handle);

function dbInsertOther({ id, data }) {
  myDB.run(
    `
    INSERT INTO
      OTHER (ID, DATA)
    VALUES
      (?, ?)
    `,
    id,
    data,
    onInserted
  );
}

var myDB = new sqlite3.Database("./src/db/my.db");

function onInserted() {
  // console.log("this", this);
  // console.log("changes", this.changes);
}
