import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase"; // Import the Firebase auth object
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
// Function to handle user sign-out

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful. Perform any additional actions if needed.
        navigate("/");
        sessionStorage.clear();
      })
      .catch((error) => {
        // An error occurred during sign-out. Handle the error.
        console.error("Error signing out:", error);
      });
  };
  const handleSidebar = (toggle) => {
    setOpenSidebar(toggle);
  };
  return (
    <>
      <header
        style={{
          backgroundColor: "rgba(33,37,41,1)",
          color: "rgba(255, 255, 255, 0.55)",
          position: "relative",
        }}
      >
        {location.pathname !== "/" ? (
          <button className="sidemenu-btn edit-icons">
            <FontAwesomeIcon
              icon={faHamburger}
              style={{ cursor: "pointer", fontSize: "16px" }}
              onClick={() => setOpenSidebar(!openSidebar)}
            />
          </button>
        ) : null}

        <h4
          className="title-name edit-icons"
          onClick={() => navigate("/notes")}
        >
          Noteyfy
        </h4>
        {location.pathname !== "/" ? (
          <button className="signout-btn edit-icons" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        ) : null}
      </header>
      {openSidebar && (
        <div className={`sidebar ${openSidebar ? "open" : ""} `}>
          <Sidebar openSidebar={openSidebar} handleSidebar={handleSidebar} />
        </div>
      )}
    </>
  );
};
