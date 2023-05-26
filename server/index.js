import express from "express";
import bodyParser from "body-parser";
import mongoose, { connect } from "mongoose";
import Notes from "./models/Notes.js";
import cors from "cors";
import { connectDatabase } from "./database.js";
import { notesRouter } from "./routes/notes.js";

//To use above import statements in node insert type: module in package.json

const app = express();
const PORT = 5000;

app.use(bodyParser.json()); //This is a middleware
app.use(cors());
connectDatabase();

app.use("/notes", notesRouter);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
