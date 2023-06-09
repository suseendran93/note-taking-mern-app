import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ handleSidebar, openSidebar }) => {
  const navigate = useNavigate();

  const handleArchive = () => {
    handleSidebar(!openSidebar);
    navigate("/notes/archived");
  };

  // const handlePinned = () => {
  //   handleSidebar(!openSidebar);
  //   navigate("/pinned");
  // };
  return (
    <Nav className="flex-column">
      <div className="container">
        <NavItem className="row nav-item" onClick={handleArchive}>
          <div className="col-4 menu-icon">
            <FontAwesomeIcon icon={faArchive} />
          </div>
          <div className="col-8 menu-label">Archive</div>
        </NavItem>
        {/* <NavItem className="row nav-item" onClick={handlePinned}>
          <div className="col-4 menu-icon">
            <FontAwesomeIcon icon={faMapPin} />
          </div>
          <div className="col-8 menu-label">Pinned</div>
        </NavItem> */}
      </div>
    </Nav>
  );
};

export default Sidebar;
