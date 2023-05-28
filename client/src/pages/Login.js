import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Assuming you have initialized Firebase in your project
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      toast(error.message);
    }
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
            <div className="col-2 m-2">
              <button
                type="button"
                className="custom-btn"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="col-2">
              <button
                type="button"
                className="custom-btn"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
