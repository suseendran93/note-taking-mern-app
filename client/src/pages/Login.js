import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Assuming you have initialized Firebase in your project
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // confirmPasswordReset,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { oobCode, newPassword } = useParams();
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const handleLogin = async () => {
    try {
      const signin = await signInWithEmailAndPassword(auth, email, password);
      let userId = signin.user.uid;
      sessionStorage.setItem("userId", userId);
      navigate("/notes"); // Redirect to notes page upon successful login
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("login", true);
      navigate("/notes"); // Redirect to notes page upon successful registration
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    }
  };
  // const confirmPassword = () => {
  //   confirmPasswordReset(auth, oobCode, newPassword)
  //     .then(() => {
  //       console.log("Password reset confirmed successfully.");
  //       // You can display a success message to the user if needed.
  //     })
  //     .catch((error) => {
  //       console.log("Error confirming password reset:", error);
  //       // Handle error scenarios (e.g., display an error message).
  //     });
  // };
  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email).then(() => {
        toast("Password reset email sent successfully.", { theme: "dark" });
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { theme: "dark" });
    }
    // confirmPassword();
    setIsForgotPasswordModalOpen(false);
  };
  return (
    <div className="container" style={{ height: "100vh" }}>
      <div className="row p-3">
        <form>
          <div className="col-12 my-3">
            <input
              type="email"
              id="email"
              className="note-input-field px-3 py-1"
              value={email}
              placeholder="Username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-12 my-3">
            <input
              type="password"
              id="password"
              className="note-input-field px-3 py-1"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row">
            <ToastContainer />
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-sm-2 col-6 my-2">
              <button
                type="button"
                className="custom-btn edit-icons"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="col-sm-2 col-6">
              <button
                type="button"
                className="custom-btn edit-icons"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
            <div className="row">
              <div className="col-12 m-2">
                <button
                  type="button"
                  className="custom-btn edit-icons"
                  onClick={() => setIsForgotPasswordModalOpen(true)}
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isForgotPasswordModalOpen && (
        <Modal
          className="forgot-password"
          show={isForgotPasswordModalOpen}
          onHide={() => setIsForgotPasswordModalOpen(false)}
          backdrop="static"
          size="md"
          scrollable={true}
        >
          <div className="row justify-content-center align-items-center">
            <div className="col-12 m-2" style={{ textAlign: "center" }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="note-input-field px-3 py-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-12" style={{ textAlign: "center" }}>
              <button
                onClick={handleForgotPassword}
                type="button"
                className="custom-btn edit-icons"
              >
                Send Reset Email
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Login;
