import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase"; // Import the Firebase auth object
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
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
      <div className="container header">
        <header className="row header align-items-center">
          {location.pathname !== "/" ? (
            <div className="col-4">
              <button className="sidemenu-btn edit-icons">
                <FontAwesomeIcon
                  icon={faHamburger}
                  style={{ cursor: "pointer", fontSize: "16px" }}
                  onClick={() => setOpenSidebar(!openSidebar)}
                />
              </button>
              <h4
                className="title-name edit-icons"
                onClick={() => navigate("/notes")}
              >
                Noteyfy
              </h4>
            </div>
          ) : null}

          {location.pathname === "/" && (
            <div className="col-12">
              <h4 className="title-name edit-icons">Noteyfy</h4>
            </div>
          )}
          {location.pathname !== "/" ? (
            <div className="col-4" style={{ margin: "5px 0 5px 0" }}>
              <SearchBar />
            </div>
          ) : null}

          {location.pathname !== "/" ? (
            <div className="col-2">
              <button
                className="signout-btn ed it-icons"
                onClick={handleSignOut}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          ) : null}
        </header>
      </div>
      {openSidebar && (
        <div className={`sidebar ${openSidebar ? "open" : ""} `}>
          <Sidebar openSidebar={openSidebar} handleSidebar={handleSidebar} />
        </div>
      )}
    </>
  );
};
