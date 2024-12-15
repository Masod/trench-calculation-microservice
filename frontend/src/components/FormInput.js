import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const FormInput = ({ onSubmit }) => {
  const [trenchType, setTrenchType] = useState('Distribution');
  const [conduits, setConduits] = useState([]);

  const handleAddConduit = () => {
    setConduits([...conduits, { type: '', sizes: '', count: '', checked: false }]);
  };

  const handleRemoveConduits = () => {
    const updatedConduits = conduits.filter((conduit) => !conduit.checked);
    setConduits(updatedConduits);
  };

  const handleCheckboxChange = (index) => {
    const updatedConduits = [...conduits];
    updatedConduits[index].checked = !updatedConduits[index].checked;
    setConduits(updatedConduits);
  };

  const handleInputChange = (index, field, value) => {
    const updatedConduits = [...conduits];
    updatedConduits[index][field] = value;
    setConduits(updatedConduits);
  };

  const handleSubmit = () => {
	if ( conduits.length == 0 || conduits[0].sizes === '' ){
		  return;
	}
    onSubmit({ trenchType, conduits });
  };
  
  const reloadPage = () => {
  	window. location. reload()
  }

  return (
    <Grid
      container
      spacing={2}
      style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}
    >
      {/* Trench Type Dropdown */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel style={{backgroundColor: 'white', marginRight: '1px'}} >Trench Type</InputLabel>
          <Select
            value={trenchType}
            onChange={(e) => setTrenchType(e.target.value)}
          >
            <MenuItem value="Distribution">Distribution</MenuItem>
            <MenuItem value="Service">Service</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Conduits Rows */}
      {conduits.map((conduit, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          alignItems="center"
          style={{ marginTop: '10px' }}
        >
          <Grid item xs={1}>
            <Checkbox
              checked={conduit.checked}
			  style={{ marginLeft: '2px' }}
              onChange={() => handleCheckboxChange(index)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Conduit Type"
              value={conduit.type}
              onChange={(e) =>
                handleInputChange(index, 'type', e.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Sizes (comma-separated)"
			  style={{ width: '100%' }}
              value={conduit.sizes}
              onChange={(e) =>
                handleInputChange(index, 'sizes', e.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Count"
              type="number"
			  style={{ width: '100px' }}
              value={conduit.count}
              onChange={(e) =>
                handleInputChange(index, 'count', e.target.value)
              }
              fullWidth
            />
          </Grid>
        </Grid>
      ))}

      {/* Add and Remove Buttons */}
      <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '0.5px'}}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAddConduit}
          >
            Add
          </Button>
        </Grid>
        {conduits.length > 0 && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleRemoveConduits}
            >
              Remove
            </Button>
          </Grid>
        )}
		<Grid item>
		        <Button
		          variant="contained"
		          color="primary"
		          size="small"
				  onClick={reloadPage}
		        >
		          Reset
		        </Button>
		</Grid>
      </Grid>

      {/* Calculate Button */}
      <Grid item xs={12} style={{ marginTop: '20px', marginLeft: '0.5px' }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSubmit}
        >
          Calculate
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormInput;
