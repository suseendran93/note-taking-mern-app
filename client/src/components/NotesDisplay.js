import { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { getNote } from "../api";
const NotesDisplay = ({ refresh }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [id, setId] = useState();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    getNote().then((data) => {
      setNotes(data);
    });
  }, [refresh]);

  const handleShowNoteModal = (note) => {
    setSelectedNote(note);
  };

  const handleCloseNoteModal = () => {
    setSelectedNote(null);
  };

  const handleToggleMenu = (noteId) => {
    setOpenMenuId(openMenuId === noteId ? null : noteId); //This toggles the menu
  };

  const handleShowEditModal = (note) => {
    // Handle edit logic
    setId(note._id);
    setShowEditModal(note);
  };

  const handleCloseEditModal = () => {
    // Handle edit logic
    setShowEditModal(null);
  };

  const handleDeleteDialogBox = (id) => {
    setId(id);
    setShowConfirmDialog(true);
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/notes/remove/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getNote().then((data) => {
          setShowConfirmDialog(false);
          setNotes(data);
        });
      })
      .catch((error) => console.log(error));
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || showEditModal.title,
        text: content || showEditModal.text,
      }),
    };
    fetch("http://localhost:5000/notes/update/" + id, requestOptions).then(
      () => {
        setContent("");
        setTitle("");
        setShowEditModal(null);
        getNote().then((data) => {
          setShowConfirmDialog(false);
          setNotes(data);
        });
      }
    );
  };

  const reversedData = notes && notes.slice().reverse();
  return (
    <>
      {reversedData ? (
        reversedData.map((note) => {
          return (
            <div
              className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center"
              key={note._id}
            >
              <div
                className="card card-size m-1 "
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowNoteModal(note);
                }}
              >
                <div className="card-body">
                  <h5 className="card-title custom-title-field whitespace">
                    {note.title}
                  </h5>
                  <DropdownButton
                    id={`cardMenuButton-${note._id}`}
                    variant="secondary"
                    title={<i className="bi bi-three-dots-vertical"></i>}
                    show={openMenuId === note._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleMenu(note._id);
                    }}
                    menualign="center"
                    align="end"
                  >
                    <Dropdown.Item onClick={() => handleShowEditModal(note)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDeleteDialogBox(note._id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </DropdownButton>
                  <p className="card-text text-box whitespace">{note.text}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ color: "rgba(255, 255, 255, 0.55)", height: "100vh" }}>
          No notes to display , add a note.
        </div>
      )}

      {selectedNote && (
        <Modal
          show={selectedNote}
          onHide={handleCloseNoteModal}
          backdrop="static"
          size="lg"
          scrollable={true}
        >
          <Modal.Header closeButton onClick={handleCloseNoteModal}>
            <Modal.Title className="modal-title">
              {selectedNote.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="modal-body "
            style={{ whiteSpace: "pre-line" }}
          >
            <>{selectedNote.text}</>
          </Modal.Body>
        </Modal>
      )}
      <Modal
        show={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {showEditModal && (
        <Modal
          className="p-3"
          show={showEditModal}
          backdrop="static"
          size="lg"
          scrollable={true}
        >
          <form onSubmit={handleUpdate}>
            <div className="col-12 note-window" style={{ margin: "10px auto" }}>
              <input
                type="text"
                className="custom-input-field"
                placeholder="Title"
                defaultValue={showEditModal.title}
                onChange={handleTitleChange}
                maxLength={40}
              />

              <textarea
                className="notes-content"
                placeholder="Take a note...."
                defaultValue={showEditModal.text}
                onChange={handleContentChange}
              ></textarea>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="col-2 m-2">
                <button className="custom-btn" type="submit" value="submit">
                  Update
                </button>
              </div>
              <div className="col-2">
                <button className="custom-btn" onClick={handleCloseEditModal}>
                  Close
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default NotesDisplay;
