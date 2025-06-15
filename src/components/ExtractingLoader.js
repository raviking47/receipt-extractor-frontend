// src/components/ExtractingLoader.js
import React from 'react';

const ExtractingLoader = () => {
  return (
    <div className="extracting-container">
      <div className="spinner" />
      <p className="extracting-text">Extracting receipt details...</p>
    </div>
  );
};

export default ExtractingLoader;
