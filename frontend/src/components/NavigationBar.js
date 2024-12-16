/**
 * 
 */

import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavigationBar = () => {//#B4643C , #d67724
  return (
	<div>
    <AppBar position="static" style={{ 
		backgroundColor: '#e67300'
	}}>
	<div style={{backgroundColor: '#ffb833', height: '10px', width: '100%'}} ></div>
      <Toolbar>
	  <img
	     src="/tarrar-logo.png" // Path to the logo
	     alt="Logo"
	     style={{ height: '80px', width: '130px', marginRight: '10px', marginTop: '0px', alignItems: 'center' }}
	  />
        <Typography variant="h6" 
		style={{ 
	  		color: 'black', 
	  		fontSize: '30px', 
	  		fontWeight: 'bold', 
			alignItems: 'center'
	  	}}>
		Trench Calculation Tool
		</Typography>
      </Toolbar>
    </AppBar>
	</div>
  );
};

export default NavigationBar;

/*
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/tarrar-logo.png" // Path to the logo
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <Typography variant="h6" component="div">
            Trench Calculation Tool
          </Typography>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
*/
