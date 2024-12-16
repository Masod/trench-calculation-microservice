import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
} from '@mui/material';

const FormInput = ({
  sectionName,
  setSectionName,
  trenchType,
  setTrenchType,
  conduits,
  handleInputChange,
  handleCheckboxChange,
  handleAddConduit,
  handleRemoveConduits,
  reloadPage,
  handleSubmit,
  handleAddSection,
  handleRemoveSection,
  handleNavigateSection,
  currentSectionIndex,
  totalSections,
}) => {
  return (
    <Grid
      container
      spacing={2}
      style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}
    >
      {/* Navigation Buttons */}
      <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button
          variant="contained"
          disabled={currentSectionIndex <= 0}
          onClick={() => handleNavigateSection('first')}
        >
          {'<<'}
        </Button>
        <Button
          variant="contained"
          disabled={currentSectionIndex <= 0}
          onClick={() => handleNavigateSection('prev')}
          style={{ marginLeft: '10px' }}
        >
          {'<'}
        </Button>
        <span style={{ margin: '0 20px', fontWeight: 'bold' }}>
          Section {currentSectionIndex + 1} of {totalSections}
        </span>
        <Button
          variant="contained"
          disabled={currentSectionIndex >= totalSections - 1}
          onClick={() => handleNavigateSection('next')}
          style={{ marginRight: '10px' }}
        >
          {'>'}
        </Button>
        <Button
          variant="contained"
          disabled={currentSectionIndex >= totalSections - 1}
          onClick={() => handleNavigateSection('last')}
        >
          {'>>'}
        </Button>
      </Grid>

      {/* Editable Section Name */}
      <Grid item xs={12}>
        <TextField
          label="Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          fullWidth
        />
      </Grid>

      {/* Trench Type Dropdown */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel style={{ backgroundColor: 'white', marginRight: '1px' }}>
            Trench Type
          </InputLabel>
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
      {(conduits || []).map((conduit, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          alignItems="center"
          style={{ marginTop: '10px' }}
        >
          <Grid item xs={1}>
            <Checkbox
              checked={conduit.checked || false}
              onChange={() => handleCheckboxChange(index)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Conduit Type"
              value={conduit.type || ''}
              onChange={(e) =>
                handleInputChange(index, 'type', e.target.value)
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Sizes (comma-separated)"
              value={conduit.sizes || ''}
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
              value={conduit.count || 0}
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
	             Add Conduit
	           </Button>
	         </Grid>
	         {conduits.length > 0 && (
	           <Grid item>
	             <Button
	               variant="contained"
	               color="error"
	               size="small"
	               onClick={handleRemoveConduits}
	             >
	               Remove Conduit
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


      {/* Add and Remove Section Buttons */}
      <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '2px'}}>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleAddSection}
          >
            Add Section
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleRemoveSection}
            disabled={totalSections <= 1} // Disable if only one section remains
          >
            Remove Section
          </Button>
        </Grid>
      </Grid>

      {/* Calculate Button */}
      <Grid item xs={12} style={{marginTop: '20px', marginLeft: '0.5px' }}>
        <Button
          variant="contained"
		  style={{
		        backgroundColor: 'black', // Set background color to black
		        color: 'white',          // Ensure the text is readable
		      }}
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
