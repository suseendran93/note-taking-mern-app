import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faImage,
  faListDots,
  faPalette,
  faRedo,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { updateNote } from "../api";
import { useEffect, useState } from "react";

const CustomizeNote = ({ id, notes }) => {
  const [color, setColor] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    notes.map((note) => {
      if (note._id === id) {
        setData(note);
        setColor("#957DAD");
      }
      return null;
    });
  }, [id, notes]);
  const handleColorChange = (e) => {
    e.preventDefault();

    const newData = { ...data, color: color };
    updateNote(newData, id);
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
    </div>
  );
};

export default CustomizeNote;
