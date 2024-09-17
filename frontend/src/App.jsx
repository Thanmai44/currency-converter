import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const currencyCodes = ["USD", "EUR", "GBP", "GHS", "JPY", "CAD", "BSD", "INR"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Clear previous result and error
    setResult(null);
    setError("");
    
    // HTTP Request
    try {
      const response = await axios.post(
        "http://localhost:5000/api/convert",
        formData
      );
      setResult(response?.data);
    } catch (error) {
      setError(error?.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <section className="hero">
        <h1>Global Currency Converter</h1>
        <p>Your go-to solution for real-time currency conversions worldwide.</p>
      </section>
      <section className="converter">
        <form onSubmit={handleSubmit}>
          <select
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select From Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <select
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="input"
          >
            <option value="">Select To Currency</option>
            {currencyCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            className="input"
          />
          <button type="submit" className="submit-btn">
            Convert
          </button>
        </form>
        {result && (
          <div className="result">
            <p>
              Converted Amount: {result.conversion_result} {formData.to}
            </p>
            <p>Conversion Rate: {result.conversion_rate}</p>
          </div>
        )}
        {error && <p className="error">Error: {error}</p>}
      </section>
      <section className="additional-info">
        <h2>Why Choose Global Currency Converter?</h2>
        <p>Detailed explanations on advantages or instructions for use.</p>
      </section>
    </div>
  );
}

export default App;