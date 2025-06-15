// src/components/LandingPage.js
import React, { useState } from 'react';

const LandingPage = ({ onFileSelect }) => {
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const isValidType = ['image/jpeg', 'image/png'].includes(selectedFile.type);
    if (isValidType) {
      setError('');
      onFileSelect(selectedFile);
    } else {
      setError('Only .jpg, .jpeg, and .png formats are supported.');
    }
  };

  return (
    <div className="landing-page">
      <h2>Upload a Receipt Image</h2>
      <p>Accepted formats: JPG, JPEG, PNG</p>

      <label className="upload-label">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        Choose File
      </label>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LandingPage;
