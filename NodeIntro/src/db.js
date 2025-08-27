import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function getDB() {
  const db = await fs.readFile(`${__dirname}/db.json`, "utf-8");
  // const db = await fs.readFile("db.json", "utf-8");
  return JSON.parse(db);
}

export async function saveDB(db) {
  await fs.writeFile(`${__dirname}/db.json`, JSON.stringify(db, null, 2));
  return db;
}

export async function insert(data) {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
}
