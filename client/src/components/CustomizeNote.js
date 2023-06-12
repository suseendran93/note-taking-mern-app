import { useSelector, useDispatch } from "react-redux";
import { changeColor } from "../slices/colorSlice";
import { changeRefresh } from "../slices/RefreshSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faCheck,
  faClose,
  // faImage,
  faMapPin,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { updateNote } from "../api";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const CustomizeNote = ({ id, notes, setShowEditModal }) => {
  const [data, setData] = useState([]);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const color = useSelector((state) => state.color.value);
  const refresh = useSelector((state) => state.refresh.value);

  const dispatch = useDispatch();
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

    const newData = { ...data, color: color.payload };
    updateNote(newData, id).then(() => {
      dispatch(changeRefresh(!refresh));
      setShowColorPalette(false);
    });
  };

  const handleArchive = (e) => {
    e.preventDefault();
    const newData = { ...data, archive: !data.archive };
    updateNote(newData, id);
    dispatch(changeRefresh(!refresh));
    setShowEditModal(null);
  };
  const handlePinned = (e) => {
    e.preventDefault();
    const newData = { ...data, pinned: !data.pinned };
    updateNote(newData, id);
    dispatch(changeRefresh(!refresh));
    setShowEditModal(null);
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
      {/* <div className="col-2 col-md-1 edit-icons">
        <FontAwesomeIcon
          icon={faImage}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div> */}
      <div className="col-2 col-md-1 edit-icons" onClick={handleArchive}>
        <FontAwesomeIcon
          icon={faArchive}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      <div className="col-2 col-md-1 edit-icons" onClick={handlePinned}>
        <FontAwesomeIcon
          icon={faMapPin}
          style={{ cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      {/* <div className="col-2 col-md-1 edit-icons">
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
      </div> */}
      {showColorPalette && (
        <Modal
          className="p-3"
          show={showColorPalette}
          onHide={() => setShowColorPalette(false)}
          backdrop="static"
          size="sm"
        >
          <Modal.Header style={{ background: color.payload || data.color }}>
            <Modal.Title
              className="modal-title col-10"
              style={{ background: color.payload || data.color }}
            >
              Pick a color
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="modal-body"
            style={{
              whiteSpace: "pre-line",
              overflow: "hidden",
              backgroundColor: color.payload || data.color,
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
                        dispatch(changeColor(color.code));
                      }}
                    ></div>
                  );
                })}
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: color.payload || data.color,
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
                dispatch(changeColor(""));
              }}
            />
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CustomizeNote;
