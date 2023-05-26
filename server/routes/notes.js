import express from "express";
import {
  getAllNotes,
  getNoteById,
  addNote,
  deleteNote,
  updateNote,
} from "../controllers/notes.js";

export const notesRouter = express.Router();

notesRouter.get("/retrieve", getAllNotes);
notesRouter.get("/retrieve/:id", getNoteById);
notesRouter.post("/add", addNote);
notesRouter.delete("/remove/:id", deleteNote);
notesRouter.put("/update/:id", updateNote);
