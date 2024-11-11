// Accomplishments.js
import React from 'react';
import './Accomplishments.css'; // Import the CSS file for styling
import certiImage from './images/certi.jpeg'; // Import the image

const accomplishments = [
  { language: 'C++', certificate: 'Passed' },
  { language: 'Python', certificate: 'Passed' },
  { language: 'Java', certificate: 'Passed' },
];

const Accomplishments = () => (
  <div className="accomplishments" style={{ marginTop: '50px' }}>
    {accomplishments.map((accomplishment, index) => (
      <div key={index} className="accomplishment-card">
        <img src={certiImage} alt="Certificate" className="certificate-image" />
        <div className="accomplishment-text">
          <strong>{accomplishment.language}</strong>: {accomplishment.certificate}
        </div>
      </div>
    ))}
  </div>
);

export default Accomplishments;
