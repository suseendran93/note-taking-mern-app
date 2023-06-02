import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
  group: {
    type: String,
    default: "",
  },
  archive: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  },
});

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
