// Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      Cookies.set("idToken", idToken, {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict",
      });

      onLogin(user);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <header className="header">
        <a href="https://kswork2001.github.io/minebyte" className="brand">MineByte</a>
        <nav className="nav-links">
          <Link to="https://kswork2001.github.io/minebyte-about">About</Link>
          <Link to="https://kswork2001.github.io/minebyte-contact">Contact</Link>
        </nav>
      </header>

      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-section">
          <p>Don't have an account?</p>
          <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
