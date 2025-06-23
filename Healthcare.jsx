import React from 'react';
import HealthcareStockCard from '../components/HealthcareStockCard'; // adjust path if needed

export default function Healthcare() {
  return (
    <div>
      <h1>Live Healthcare Stocks</h1>
      <HealthcareStockCard symbol="GSK" />
      <HealthcareStockCard symbol="PFE" />
      <HealthcareStockCard symbol="MRNA" />
      {/* ✅ Add more tickers here if needed */}
    </div>
  );
}
