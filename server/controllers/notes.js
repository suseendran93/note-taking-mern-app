import Notes from "../models/Notes.js";

export const getAllNotes = (req, res) => {
  Notes.find()
    .then((notes) => {
      const userNotes = [];
      notes.map((note) => {
        if (req.query.userId === note.userId) userNotes.push(note);
      });

      res.send(userNotes);
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

export const getNoteById = (req, res) => {
  const { id } = req.params;
  Notes.findById(id)
    .then((note) => {
      if (!note) {
        return res.status(404).send("Note not found");
      }
      res.send(note);
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

export const addNote = (req, res) => {
  const { userId, title, text } = req.body;
  const note = new Notes({
    userId,
    title,
    text,
  });

  note
    .save()
    .then(() => {
      res.json(note);
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

export const deleteNote = (req, res) => {
  const { id } = req.params;
  Notes.findByIdAndDelete(id)
    .then(() => {
      res.send(`Note ${id} deleted`);
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

export const updateNote = (req, res) => {
  const { id } = req.params;
  const updatedNote = { ...req.body, timestamp: Date.now() };

  Notes.findByIdAndUpdate(id, updatedNote)
    .then(() => {
      res.send("Note updated successfully");
    })
    .catch((error) => {
      console.error("Error updating note:", error);
      res.status(500).send("Internal server error");
    });
};
