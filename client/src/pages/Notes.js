import { useState } from "react";
import NotesDisplay from "../components/NotesDisplay";
import { addNote } from "../api";

const Notes = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNote();
    addNote(title, content, userId).then(() => {
      setTitle("");
      setContent("");
      setRefresh(!refresh);
    });
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddNote = () => {
    setNoteModal(!noteModal);
  };
  return (
    <>
      <div className="container">
        {!noteModal ? (
          <div className="row-2 m-3">
            <input
              type="text"
              className="note-input-field px-3 py-1"
              placeholder="Take a note..."
              onClick={handleAddNote}
            />
          </div>
        ) : (
          <div className="row-2 m-3">
            <form onSubmit={handleSubmit}>
              <div className="col-12 note-window">
                <input
                  type="text"
                  className="custom-input-field"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                  maxLength={40}
                />

                <textarea
                  className="notes-content"
                  placeholder="Take a note...."
                  value={content}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="row justify-content-center align-items-center">
                <div className="col-2 m-2">
                  <button className="custom-btn" type="submit" value="submit">
                    Add
                  </button>
                </div>
                <div className="col-2">
                  <button className="custom-btn" onClick={handleAddNote}>
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="container" style={{ height: "100vh" }}>
        <div className="row justify-content-center align-items-center">
          <NotesDisplay refresh={refresh} userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Notes;
