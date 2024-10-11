// MainPage.js
import React from 'react';
import './MainPage.css'; // Assuming you are styling it separately

const MainPage = () => (
  <div className="main-page">
    <div className="left-section">
      <div className="progress">Progress</div>
      <div className="stats">Stats</div>
    </div>
    <div className="right-section">
      <div className="profile">Profile</div>
      <div className="highlights">Highlights</div>
      <div className="courses-summary">Courses Summary</div>
    </div>
  </div>
);

export default MainPage;
