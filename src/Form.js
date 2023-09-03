

import React, { useState } from 'react';
import './App.css';

function Form() {
  const [businessName, setBusinessName] = useState('');
  const [yearEstablished, setYearEstablished] = useState('');
  const [accountingProvider, setAccountingProvider] = useState('Xero');
  const[loanAmount,setLoanAmount]=useState('')
  const [preAssessment, setPreAssessment] = useState('null');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
   try{
    const response = await fetch('http://localhost:3001/submit-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        businessDetails: {
          name: businessName,
          year: yearEstablished,
        },
        accountingProvider: accountingProvider,
        loanAmount: parseFloat(loanAmount),
      }),
    });

    if(!response.ok){
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setPreAssessment(data.preAssessment);
  } catch (error) {
    console.error('There was a problem with the fetch operation:',error);
  }
};

  return (
    <div className="form">
      <h1>Business Loan Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Business Name: <br></br>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Year Established: <br></br>
          <input
            type="number"
            value={yearEstablished}
            onChange={(e) => setYearEstablished(e.target.value)}
          />
        </label>
        <br />
        <label>
          Accounting Provider:<br></br>
          <select
            value={accountingProvider}
            onChange={(e) => setAccountingProvider(e.target.value)}
          >
            <option value="Xero">Xero</option>
            <option value="MYOB">MYOB</option>
          
          </select>
        </label>
        <br />

        <label>
          Loan Amount: <br></br> {/* New input field for loan amount */}
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {preAssessment !== null && (
        <div>
          <h2>Pre-assessment Result</h2>
          <p>Pre-assessment value: {preAssessment}</p>
        </div>
      )}
    </div>
  );
}

export default Form;



