import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import FormInput from '../components/FormInput';
import ResultsDisplay from '../components/ResultsDisplay';
import DownloadButton from '../components/DownloadButton';
import axios from 'axios';

const HomePage = () => {
  const [results, setResults] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/trench/calculate',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setResults(response.data); // Dynamically update results based on backend response
    } catch (error) {
      console.error('Error fetching results:', error);
      setResults({
        violations: ['Error fetching results from backend'],
        finalTrenchWidth: 'N/A',
        finalTrenchDepth: 'N/A',
      });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Trench Calculation
        </Typography>
        <FormInput onSubmit={handleFormSubmit} />
      </Paper>
      {results && (
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
          <Typography variant="h5" gutterBottom>
            Results
          </Typography>
          <ResultsDisplay results={results} />
          <DownloadButton results={results} />
        </Paper>
      )}
    </Box>
  );
};

export default HomePage;
