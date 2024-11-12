// Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      await setDoc(doc(db, "users", uid), {
        firstName,
        lastName,
        email,
      });

      setSuccessMessage("Account created successfully! You can now login.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("There was an error creating your account. Please try again.");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-page">
      <header className="header">
        <a href="https://kswork2001.github.io/minebyte" className="brand">MineByte</a>
        <nav className="nav-links">
          <Link to="https://kswork2001.github.io/minebyte-about">About</Link>
          <Link to="https://kswork2001.github.io/minebyte-contact">Contact</Link>
        </nav>
      </header>

      <div className="register-container">
        <h2 className="register-title">Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
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
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <div className="login-section">
          <p>Already have an account?</p>
          <button className="login-button" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
