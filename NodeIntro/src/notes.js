import { insert, getDB, saveDB } from './db.js'

export async function newNote(noteText, noteTags) {
  const note = {
    tags: noteTags,
    content: noteText,
    id: Date.now(),
  };
  return await insert(note);
}

export async function getAllNotes() {
  const db = await getDB();
  return db.notes;
}

export async function findNotes(filter) {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
}

export async function removeNote(id) {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (!match) return;

  const newNotes = notes.filter((note) => note.id !== id);
  await saveDB({ notes: newNotes });
  return id;
}

export async function removeAllNotes() {
  await saveDB({ notes: [] });
}
