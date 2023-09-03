const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Use a different port than the frontend
app.use(cors());
// Simulated sample balance sheet data
const sampleBalanceSheet = [
    {
        "year": 2020,
        "month": 12,
        "profitOrLoss": 250000,
        "assetsValue": 1234
    },
    {
        "year": 2020,
        "month": 11,
        "profitOrLoss": 1150,
        "assetsValue": 5789
    },
    {
        "year": 2020,
        "month": 10,
        "profitOrLoss": 2500,
        "assetsValue": 22345
    },
    {
        "year": 2020,
        "month": 9,
        "profitOrLoss": -187000,
        "assetsValue": 223452
    }
];

app.use(bodyParser.json());

// Simulate fetching accounting data from the selected provider
function simulateFetchAccountingData(provider) {
    // Simulate fetching data from accounting software based on the provider
    return sampleBalanceSheet;
}

// Calculate pre-assessment based on profit and asset value
function calculatePreAssessment(balanceSheet, requestedLoanAmount) {
    // Calculate logic based on profit and average asset value
    const isProfitInLast12Months = balanceSheet.every(entry => entry.profitOrLoss > 0);
    const totalAssets = balanceSheet.reduce((sum, entry) => sum + entry.assetsValue, 0);
    const averageAssets = totalAssets / balanceSheet.length;

    let preAssessment=20 ;

    if (isProfitInLast12Months) {
        preAssessment = 60;
    }

    if (averageAssets > requestedLoanAmount) {
        preAssessment = 100;
    }

    return preAssessment;
}

// Simulate decision engine response
function simulateDecisionEngine(preAssessment) {
    // Simulate the decision engine's response based on pre-assessment
    if (preAssessment >= 60) {
        return 'Approved';
    } else {
        return 'Denied';
    }
}

app.get("/",(req,res)=>{
    res.send("welcome to the business-loan-application")
})

app.post('/submit-application', (req, res) => {
    const { businessDetails, accountingProvider,loanAmount } = req.body;

    // Simulate fetching accounting data
    const balanceSheet = simulateFetchAccountingData(accountingProvider);

    // Calculate pre-assessment value
    const requestedLoanAmount = 100000; // Replace with the actual loan amount from frontend
    const preAssessment = calculatePreAssessment(balanceSheet, loanAmount);

    // Simulate decision engine response
    const decision = simulateDecisionEngine(preAssessment);

    // Prepare response
    const response = {
        businessDetails,
        preAssessment,
        decision,
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`);
});

