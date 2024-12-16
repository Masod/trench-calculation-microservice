import React from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results) {
    return <p 
	style={{marginRight: '20px auto', padding: '20px auto'}}>
		No results calculated yet.
	</p>;
  }

  return (
    <div className="results-display">
      <h3>Calculation Results</h3>
      <p>Violations: {results.violations?.join(', ') || 'None'}</p>
      <p>Trench Width: {results.finalTrenchWidth || 'N/A'}</p>
      <p>Trench Depth: {results.finalTrenchDepth || 'N/A'}</p>
    </div>
  );
};

export default ResultsDisplay;
