import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';

const ResultsDisplay = ({ results }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Calculation Results</Typography>
			<Typography>Violations:</Typography>
			{results.violations && results.violations.length > 0 ? (
			  results.violations.map((violation, index) => (
			    <Typography key={index}>- {violation}</Typography>
			  ))
			) : (
			  <Typography>No violations found.</Typography>
			)}
			<Typography style={{ marginTop: '10px' }}>
			  Trench Width: {results.finalTrenchWidth || 'N/A'} inches
			</Typography>
			<Typography>
			  Trench Depth: {results.finalTrenchDepth || 'N/A'} inches
			</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResultsDisplay;
