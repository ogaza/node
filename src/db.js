import fs from "node:fs/promises";

// const DB_PATH = new URL("../db.json", import.meta.url).pathname;

export async function getDB() {
  const db = await fs.readFile("db.json", "utf-8");
  // const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
}

export async function saveDB(db) {
  await fs.writeFile("db.json", JSON.stringify(db, null, 2));
  // await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
}

export async function insert(data) {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
}
