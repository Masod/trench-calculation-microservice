/**
 * 
 */
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavigationBar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#1976D2' }}>
      <Toolbar>
        <Typography variant="h6">Trench Calculation Tool</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
