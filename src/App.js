// src/App.js
import React, { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import FilePreview from './components/FilePreview';
import ExtractingLoader from './components/ExtractingLoader';
import ExtractionResults from './components/ExtractionResults';
import { extractReceiptDetails } from './api';

export default function App() {
  /** -----------------------------------
   *  State
   * ----------------------------------- */
  const [file, setFile]               = useState(null);
  const [extracting, setExtracting]   = useState(false);
  const [receiptDetails, setReceipt]  = useState(null);
  const [error, setError]             = useState(null);

  /** -----------------------------------
   *  Helpers
   * ----------------------------------- */
  const currentStep = (() => {
    if (extracting)            return 3;      // Extracting
    if (receiptDetails)        return 4;      // Results
    if (file)                  return 2;      // Preview
    return 1;                                  // Landing
  })();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleCancel = () => {
    setFile(null);
    setError(null);
  };

  const handleSubmit = async (uploadFile) => {
    setExtracting(true);
    setError(null);
    try {
      const { data } = await extractReceiptDetails(uploadFile); // <- receipt object
      setReceipt(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Extraction failed');
    } finally {
      setExtracting(false);
    }
  };

  const handleRestart = () => {
    setFile(null);
    setReceipt(null);
    setError(null);
  };

  /** -----------------------------------
   *  Render
   * ----------------------------------- */
  return (
    <div className="App">


      
      {/* ------- Global header / stepper ------- */}
        <center><h1>Receipt Extractor </h1></center>
      <header className="stepper">
        {['Upload', 'Preview', 'Extract', 'Results'].map((label, i) => {
          const step = i + 1;
          return (
            <div
              key={label}
              className={`step ${currentStep === step ? 'active' : ''} ${
                currentStep > step ? 'complete' : ''
              }`}
            >
              <span className="step-number">{step}</span>
              <span className="step-label">{label}</span>
            </div>
          );
        })}
      </header>

      {/* ------- Main content ------- */}
      <main className="content">
        {/* 1. Landing */}
        {!file && !extracting && !receiptDetails && (
          <LandingPage onFileSelect={handleFileSelect} />
        )}

        {/* 2. Preview */}
        {file && !extracting && !receiptDetails && (
          <FilePreview
            file={file}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}

        {/* 3. Loading */}
        {extracting && <ExtractingLoader />}

        {/* 4. Results */}
        {receiptDetails && !extracting && (
          <ExtractionResults
            receiptDetails={receiptDetails}
            receiptImageUrl={receiptDetails.image_url}
            onRestart={handleRestart}
          />
        )}

        {/* Error banner */}
        {error && !extracting && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={handleRestart} className="btn-secondary">
              Try Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
