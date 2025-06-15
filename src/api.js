// src/api.js
import axios from 'axios';

export const extractReceiptDetails = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(
    'http://localhost:5000/receipt/extract-receipt-details',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
