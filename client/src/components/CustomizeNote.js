import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCheck,
  faClose,
  faImage,
  faListDots,
  faPalette,
  faRedo,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { updateNote } from "../api";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const CustomizeNote = ({ id, notes, setRefresh, refresh }) => {
  const [color, setColor] = useState("");
  const [data, setData] = useState([]);
  const [showColorPalette, setShowColorPalette] = useState(false);
  useEffect(() => {
    notes.map((note) => {
      if (note._id === id) {
        setData(note);
      }
      return null;
    });
  }, [id, notes]);

  const colors = [
    { name: "DEFAULT", code: "#26292C" },
    { name: "LIGHTMEDIUMORCHID", code: "#DB97C6" },
    { name: "AFRICANVIOLET", code: "#AB91C4" },
    { name: "CAMBRIDGEBLUE", code: "#A5CBAF" },
  ];
  const handleColorChange = (e) => {
    e.preventDefault();
    setShowColorPalette(true);
  };

  const handleApplyColor = (e) => {
    e.preventDefault();

    const newData = { ...data, color: color };
    updateNote(newData, id);
    setRefresh(!refresh);
    setShowColorPalette(false);
  };
  return (
    <div className="row">
      <div className="col-2 col-md-1 edit-icons">
        <FontAwesomeIcon
          icon={faPalette}
          style={{ cursor: "pointer", fontSize: "16px" }}
          onClick={handleColorChange}
        />
      </div>
      <div className="col-2 col-md-1 edit-icons">
        <FontAwesomeIcon
          icon={faImage}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      <div className="col-2 col-md-1 edit-icons">
        <FontAwesomeIcon
          icon={faArchive}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      <div className="col-2 col-md-1 edit-icons">
        <FontAwesomeIcon
          icon={faListDots}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      <div className="col-2 col-md-1 edit-icons">
        <FontAwesomeIcon
          icon={faUndo}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      <div className="col-2 col-md-1 edit-icons">
        <FontAwesomeIcon
          icon={faRedo}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      {showColorPalette && (
        <Modal
          className="p-3"
          show={showColorPalette}
          onHide={() => setShowColorPalette(false)}
          backdrop="static"
          size="sm"
        >
          <Modal.Header style={{ background: color || data.color }}>
            <Modal.Title
              className="modal-title col-10"
              style={{ background: color || data.color }}
            >
              Pick a color
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="modal-body"
            style={{
              whiteSpace: "pre-line",
              overflow: "hidden",
              backgroundColor: color || data.color,
            }}
          >
            <div className="row color-palette">
              {colors &&
                colors.map((color, key) => {
                  return (
                    <div
                      key={key}
                      className="col-2 choose-color-icon"
                      style={{ background: color.code || data.color }}
                      onClick={() => {
                        setColor(color.code);
                      }}
                    ></div>
                  );
                })}
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: color || data.color,
            }}
          >
            <FontAwesomeIcon
              icon={faCheck}
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={handleApplyColor}
            />
            <FontAwesomeIcon
              icon={faClose}
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={() => {
                setShowColorPalette(false);
                setColor("");
              }}
            />
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CustomizeNote;
