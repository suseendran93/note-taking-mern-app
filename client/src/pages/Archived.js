import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeColor } from "../slices/colorSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Modal, Button } from "react-bootstrap";
import { getNote, updateNote, deleteNote } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import CustomizeNote from "../components/CustomizeNote";
const Archived = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const location = useLocation();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [id, setId] = useState();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const instantColor = useSelector((state) => state.color.value);
  const refresh = useSelector((state) => state.refresh.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = sessionStorage.getItem("userId");
  const params = new URLSearchParams(location.search);

  const searchParam = params.get("search");

  /*
  rebeccapurple
  cadetblue
  darkolivegreen
  goldenrod
  */
  useEffect(() => {
    // Filter the notes based on the searchParam
    const filteredNotes = searchParam
      ? notes.filter(
          (note) =>
            note.text.toLowerCase().includes(searchParam.toLowerCase()) ||
            note.title.toLowerCase().includes(searchParam.toLowerCase())
        )
      : notes;
    setFilteredNotes(filteredNotes);
  }, [notes, searchParam]);
  useEffect(() => {
    getNote(userId).then((data) => {
      setNotes(data);
    });
  }, [userId, refresh, dispatch]);

  const handleShowEditModal = (note) => {
    // Handle edit logic
    setId(note._id);
    dispatch(changeColor(""));

    setShowEditModal({ ...note, color });
  };

  const handleCloseEditModal = (e) => {
    // Handle edit logic
    handleUpdate(e);
    setShowEditModal(null);
  };

  const handleDelete = () => {
    deleteNote(id).then(() => {
      getNote(userId).then((data) => {
        setShowConfirmDialog(false);
        setShowEditModal(null);
        setNotes(data);
      });
    });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const newData = {
      title: title || showEditModal.title,
      text: content || showEditModal.text,
    };
    if (
      newData.title !== showEditModal.title ||
      newData.text !== showEditModal.text
    ) {
      updateNote(newData, id).then(() => {
        setContent("");
        setTitle("");
        setShowEditModal(null);
        getNote(userId).then((data) => {
          setShowConfirmDialog(false);
          setNotes(data);
        });
      });
    }
  };

  const reversedData = notes && notes.slice().reverse();
  return (
    <div className="container add-archive" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col">
          <div
            className="edit-icons"
            onClick={() => navigate("/notes")}
            style={{ color: "#fff", textAlign: "left" }}
          >
            <FontAwesomeIcon
              icon={faLeftLong}
              style={{ cursor: "pointer", fontSize: "16px" }}
            />
          </div>
          <div className="row justify-content-center align-items-center m-2">
            {reversedData && reversedData.length !== 0
              ? filteredNotes.map((note) => {
                  if (note.archive === true) {
                    return (
                      <div
                        className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center"
                        key={note._id}
                      >
                        <div
                          className="card card-size m-1 "
                          onClick={(e) => {
                            e.stopPropagation();
                            setColor(note.color);
                            handleShowEditModal(note);
                          }}
                          style={{ backgroundColor: note.color }}
                        >
                          <div className="card-body">
                            <h5 className="card-title custom-title-field whitespace">
                              {note.title}
                            </h5>

                            <p className="card-text text-box">{note.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else return null;
                })
              : null}

            {showEditModal && (
              <Modal
                className="p-3"
                show={showEditModal}
                onHide={handleCloseEditModal}
                backdrop="static"
                size="lg"
                scrollable={true}
              >
                <Modal.Header
                  className="row"
                  style={{ background: instantColor.payload || color }}
                >
                  <Modal.Title
                    className="modal-title col-10"
                    style={{ background: instantColor.payload || color }}
                  >
                    <input
                      type="text"
                      className="custom-input-field "
                      placeholder="Title"
                      defaultValue={showEditModal.title}
                      onChange={handleTitleChange}
                      maxLength={40}
                      style={{ background: instantColor.payload || color }}
                    />
                  </Modal.Title>
                  <div className="col-2" style={{ textAlign: "right" }}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer", fontSize: "16px" }}
                      onClick={() => setShowConfirmDialog(true)}
                    />
                  </div>
                </Modal.Header>
                <Modal.Body
                  className="modal-body"
                  style={{
                    whiteSpace: "pre-line",
                    overflow: "hidden",
                    backgroundColor: instantColor.payload || color,
                  }}
                >
                  <textarea
                    className="notes-content"
                    placeholder="Take a note...."
                    defaultValue={showEditModal.text}
                    onChange={handleContentChange}
                    rows="10"
                    cols="50"
                    style={{
                      resize: "none",
                      border: "none",
                      backgroundColor: instantColor.payload || color,
                    }}
                  ></textarea>
                </Modal.Body>
                <Modal.Footer
                  className="row"
                  style={{ background: instantColor.payload || color }}
                >
                  <div className="col-10" style={{ margin: 0 }}>
                    <CustomizeNote
                      id={id}
                      notes={notes}
                      setShowEditModal={setShowEditModal}
                    />
                  </div>

                  <div
                    className="edit-icons edit-close-btn col-2"
                    style={{ margin: 0, textAlign: "right" }}
                    onClick={handleCloseEditModal}
                  >
                    Close
                  </div>
                </Modal.Footer>
              </Modal>
            )}
            {/*Delete modal below------------------------------------------------------------------ */}
            <Modal
              show={showConfirmDialog}
              onHide={() => setShowConfirmDialog(false)}
            >
              <Modal.Header>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this note?
              </Modal.Body>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archived;
