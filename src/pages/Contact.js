import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";  // Link the new styles for this page

const Contact = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="contact-page">
      <header className="contact-header">
        <a href="/login" className="brand">MineByte</a>
        <nav className="nav-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <section className="contact-content">
        <div className="content-block">
          <h1>Reach out to us</h1>
          <p>
            IT'S AS SIMPLE AS SAYING "HELLO"
          </p>
          <p>
            We would love to know more about your requirements to see how we can help to achieve your Customer Experience (CX) goals. Alternatively, you can also fill up our contact form, or visit one of our offices in person.
          </p>
        </div>

        <div className="team-info">
          <h2>Sales Enquiries</h2>
          <div className="contact-info">
            <div className="info-block">
              <h3>Sales Enquiries - Malaysia</h3>
              <p>+603 2162 1088</p>
              <p>business@scicom.com.my</p>
            </div>
            <div className="info-block">
              <h3>Sales Enquiries - Sri Lanka</h3>
              <p>+94 115 882 865</p>
              <p>business@scicom.com.my</p>
            </div>
          </div>
        </div>

        <button className="back-to-login" onClick={goToLogin}>Back to Login</button>
      </section>
    </div>
  );
};

export default Contact;
