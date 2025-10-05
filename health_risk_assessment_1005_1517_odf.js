// 代码生成时间: 2025-10-05 15:17:49
// Import necessary modules
const React = require('react');

// Define constants for health risk categories
const HEALTH_RISK_CATEGORIES = {
  HEART_DISEASE: 'heart disease',
  DIABETES: 'diabetes',
  HIGH_BLOOD_PRESSURE: 'high blood pressure'
};

// HealthRiskAssessment component
class HealthRiskAssessment extends React.Component {
  // Initialize state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      riskFactors: {},
      error: null
    };
  }

  // Method to handle risk factor input changes
  handleRiskFactorChange = (category, event) => {
    const { riskFactors } = this.state;
    const newRiskFactors = { ...riskFactors, [category]: event.target.value };
    this.setState({ riskFactors: newRiskFactors });
  };

  // Method to perform health risk assessment
  performAssessment = () => {
    try {
      const { riskFactors } = this.state;
      // Perform assessment logic (simplified for example purposes)
      const riskScore = Object.values(riskFactors)
        .reduce((sum, value) => sum + parseInt(value, 10), 0);

      this.setState({
        assessmentResult: `Your total risk score is: ${riskScore}`
      });
    } catch (error) {
      // Handle errors during assessment
      this.setState({ error: 'An error occurred during assessment.' });
    }
  };

  // Render method
  render() {
    const { riskFactors, error, assessmentResult } = this.state;
    const { HEART_DISEASE, DIABETES, HIGH_BLOOD_PRESSURE } = HEALTH_RISK_CATEGORIES;

    return (
      <div>
        <h1>Health Risk Assessment</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {assessmentResult && <p>{assessmentResult}</p>}
        <form>
          <label>
            Heart Disease Risk:
            <input
              type="number"
              value={riskFactors[HEART_DISEASE] || ''}
              onChange={this.handleRiskFactorChange.bind(this, HEART_DISEASE)}
            />
          </label>
          <br />
          <label>
            Diabetes Risk:
            <input
              type="number"
              value={riskFactors[DIABETES] || ''}
              onChange={this.handleRiskFactorChange.bind(this, DIABETES)}
            />
          </label>
          <br />
          <label>
            High Blood Pressure Risk:
            <input
              type="number"
              value={riskFactors[HIGH_BLOOD_PRESSURE] || ''}
              onChange={this.handleRiskFactorChange.bind(this, HIGH_BLOOD_PRESSURE)}
            />
          </label>
          <br />
          <button type="button" onClick={this.performAssessment}>
            Assess Risk
          </button>
        </form>
      </div>
    );
  }
}

// Export the component
module.exports = HealthRiskAssessment;