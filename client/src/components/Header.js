import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import the Firebase auth object

// Function to handle user sign-out

export const Header = () => {
  const navigate = useNavigate();

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
      Notefy
      <button className="signout-btn" onClick={handleSignOut}>
        Sign out
      </button>
    </header>
  );
};
