import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase"; // Import the Firebase auth object
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
// Function to handle user sign-out

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  return (
    <header
      style={{
        backgroundColor: "rgba(33,37,41,1)",
        color: "rgba(255, 255, 255, 0.55)",
      }}
    >
      <h4
        style={{ display: "inline", cursor: "pointer" }}
        onClick={() => window.location.reload()}
      >
        Noteyfy
      </h4>
      {location.pathname !== "/" ? (
        <button className="signout-btn" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      ) : null}
    </header>
  );
};
