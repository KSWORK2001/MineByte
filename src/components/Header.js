// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Assuming you'll style it separately

const Header = () => (
  <header className="header">
    <Link to="/" className="brand">
      MineByte
    </Link>
    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/test-your-skills">Test Your Skills</Link>
      <Link to="/accomplishments">Accomplishments</Link>
      <Link to="/quizlet">Quizlet</Link>
    </nav>
  </header>
);

export default Header;
