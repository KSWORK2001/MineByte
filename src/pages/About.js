import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import aashikaImg from "./images/aashika.jpeg";
import masnunImg from "./images/masnun.jpeg";
import sanImg from "./images/san.jpeg";
import nathanImg from "./images/nathan.jpeg";
import karanImg from "./images/karan.jpg";

const About = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="about-page">
      <header className="about-header">
        <a href="/login" className="brand">MineByte</a>
        <nav className="nav-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <section className="project-description">
        <h1>So why Minebyte?</h1>
        <p>
        MineByte is a free, self-paced web app designed to help learners of all levels improve their coding and programming skills. Whether you’re just starting or looking to deepen your knowledge, MineByte adapts to your learning style, providing a personalized experience tailored to your needs. Unlike other platforms like LeetCode or LinkedIn Learning, MineByte doesn’t simply hand you the solutions — it challenges you with exercises that ensure you truly understand each concept before moving forward. </p><p>
        <br></br>Our app focuses on helping you build a strong foundation by reinforcing concepts through interactive tasks. As you progress, the platform adapts to offer the right challenges to suit your growing abilities, making learning both engaging and effective. MineByte isn’t just about solving problems; it's about understanding the why and how behind the solutions, making it the perfect tool for anyone serious about mastering coding.</p><p>
        <br></br>Take control of your learning journey with MineByte — where coding concepts come to life!
        </p>
      </section>

      <section className="meet-the-team">
        <h2>Meet the Team</h2>
          <div className="team-members">
            {/* First Row */}
            <div className="team-row">
              <div className="team-member">
                <a href="https://www.linkedin.com/in/maddi-aashika-922a1a235/" target="_blank" rel="noopener noreferrer">
                  <img src={aashikaImg} alt="Aashika" className="profile-pic" />
                </a>
                <p className="member-info"><strong>Aashika</strong></p>
                <p className="member-desc">Backend Developer</p>
              </div>
              <div className="team-member">
                <a href="https://www.linkedin.com/in/rubaiya-masnun/" target="_blank" rel="noopener noreferrer">
                  <img src={masnunImg} alt="Masnun" className="profile-pic" />
                </a>
                <p className="member-info"><strong>Masnun</strong></p>
                <p className="member-desc">Cloud and Database Architect</p>
              </div>
              <div className="team-member">
                <a href="https://www.linkedin.com/in/san-yi-6a297b28b/" target="_blank" rel="noopener noreferrer">
                  <img src={sanImg} alt="San" className="profile-pic" />
                </a>
                <p className="member-info"><strong>San</strong></p>
                <p className="member-desc">Frontend Designer/Developer</p>
              </div>
            </div>
            
            {/* Second Row */}
            <div className="team-row">
              <div className="team-member">
                <a href="https://www.linkedin.com/in/nathan-bailey-9969131bb/" target="_blank" rel="noopener noreferrer">
                  <img src={nathanImg} alt="Nathan" className="profile-pic" />
                </a>
                <p className="member-info"><strong>Nathan</strong></p>
                <p className="member-desc">Node JS Developer</p>
              </div>
              <div className="team-member">
                <a href="https://www.linkedin.com/in/kswork/" target="_blank" rel="noopener noreferrer">
                  <img src={karanImg} alt="Karan" className="profile-pic" />
                </a>
                <p className="member-info"><strong>Karan</strong></p>
                <p className="member-desc">React Developer</p>
              </div>
            </div>
          </div>
      </section>

      <button className="back-to-login" onClick={goToLogin}>Back to Login</button>
    </div>
  );
};

export default About;
