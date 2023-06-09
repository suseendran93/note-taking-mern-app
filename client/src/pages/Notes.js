import { useState } from "react";
import NotesDisplay from "../components/NotesDisplay";
import { addNote } from "../api";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { changeRefresh } from "../slices/RefreshSlice";
const Notes = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [noteModal, setNoteModal] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const refresh = useSelector((state) => state.refresh.value);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddNote();
    addNote(title, content, userId).then(() => {
      setTitle("");
      setContent("");
      dispatch(changeRefresh(!refresh));
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

  const handleCloseNoteModal = () => {
    setNoteModal(false);
  };
  return (
    <>
      <div className="add-notes p-2">
        {!noteModal ? (
          <FontAwesomeIcon
            className="note-add-btn p-3"
            icon={faAdd}
            onClick={handleAddNote}
          />
        ) : (
          <Modal
            className="p-3"
            show={noteModal}
            onHide={handleCloseNoteModal}
            backdrop="static"
            size="lg"
            scrollable={true}
          >
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
          </Modal>
        )}
      </div>
      <div className="container" style={{ minHeight: "100vh" }}>
        <div className="row justify-content-center align-items-center">
          <NotesDisplay userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Notes;
