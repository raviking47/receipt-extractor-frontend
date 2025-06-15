// src/components/FilePreview.js
import React from 'react';

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

const FilePreview = ({ file, onCancel, onSubmit }) => {
  return (
    <div className="file-preview">
      <h2>Preview Selected File</h2>

      <div className="preview-info">
        <p><strong>Name:</strong> {file.name}</p>
        <p><strong>Size:</strong> {formatBytes(file.size)}</p>
      </div>

      <div className="preview-image">
        <img src={URL.createObjectURL(file)} alt="Receipt Preview" />
      </div>

      <div className="preview-actions">
        <button className="btn-secondary" onClick={onCancel}>Cancel</button>
        <button className="btn-primary" onClick={() => onSubmit(file)}>Submit</button>
      </div>
    </div>
  );
};

export default FilePreview;
