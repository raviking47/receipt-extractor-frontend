// src/components/ExtractionResults.js
import React from 'react';

const ExtractionResults = ({ receiptDetails, receiptImageUrl, onRestart }) => {
  const {
    date,
    currency,
    vendor_name,
    receipt_items = [],
    tax,
    total,
  } = receiptDetails || {};

  return (
    <div className="extraction-results">
      {/* Receipt Image */}
      {receiptImageUrl && (
        <div className="receipt-image">
          <img src={receiptImageUrl} alt="Receipt" />
        </div>
      )}

      {/* Receipt Summary */}
      <div className="receipt-meta">
        <h2>Receipt Summary</h2>
        <p><strong>Date:</strong> {date || 'N/A'}</p>
        <p><strong>Currency:</strong> {currency || 'N/A'}</p>
        <p><strong>Vendor:</strong> {vendor_name || 'N/A'}</p>
      </div>

      {/* Items List */}
      <div className="receipt-items">
        <h3>Items</h3>
        {receipt_items.length > 0 ? (
          <ul>
            {receipt_items.map((item, idx) => (
              <li key={idx} className="item-entry">
                <span><strong>Name:</strong> {item.item_name || '—'}</span>
                <span><strong>Cost:</strong> {item.item_cost || '—'}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found.</p>
        )}
      </div>

      {/* Totals */}
      <div className="receipt-totals">
        <p><strong>Tax:</strong> {tax || 'N/A'}</p>
        <p><strong>Total:</strong> {total || 'N/A'}</p>
      </div>

      {/* Restart Button */}
      <div className="restart-button">
        <button onClick={onRestart}>Start New Extraction</button>
      </div>
    </div>
  );
};

export default ExtractionResults;
