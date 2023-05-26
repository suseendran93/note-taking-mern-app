import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
