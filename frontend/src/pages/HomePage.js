import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import ResultsDisplay from '../components/ResultsDisplay';
import DownloadButton from '../components/DownloadButton';
import { Grid, Button, Box, Typography } from '@mui/material';
import { calculateTrench } from '../services/api';

const HomePage = () => {
  const [sections, setSections] = useState([
    {
      sectionName: 'Section 1',
      trenchType: '',
      conduits: [],
      results: null,
    },
  ]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleNavigateSection = (direction) => {
    if (direction === 'first') setCurrentSectionIndex(0);
    else if (direction === 'prev' && currentSectionIndex > 0)
      setCurrentSectionIndex(currentSectionIndex - 1);
    else if (direction === 'next' && currentSectionIndex < sections.length - 1)
      setCurrentSectionIndex(currentSectionIndex + 1);
    else if (direction === 'last') setCurrentSectionIndex(sections.length - 1);
  };

  const handleAddSection = () => {
    const newSection = {
      sectionName: `Section ${sections.length + 1}`,
      trenchType: '',
      conduits: [],
      results: null,
    };

    setSections([...sections, newSection]);
    setCurrentSectionIndex(sections.length);
  };

  const handleRemoveSection = () => {
    if (sections.length > 1) {
      const updatedSections = sections.filter((_, idx) => idx !== currentSectionIndex);
      setSections(updatedSections);
      setCurrentSectionIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = sections[currentSectionIndex];
      let isEmpty = false;
	  
	  if (payload.trenchType === ''){
		return;
	  }
	  payload.conduits.forEach((conduit, index) => {
		if (conduit.type === '' || conduit.size === '' || conduit.count < 1 ){
			isEmpty = true;
		}
	  });
	  
	  if (isEmpty === true){
		return;
	  }
	  const response = await calculateTrench(payload);
      const updatedSections = [...sections];
      updatedSections[currentSectionIndex].results = response;
      setSections(updatedSections);
    } catch (error) {
      console.error('Error during calculation:', error);
      alert('Failed to calculate. Please try again.');
    }
  };

  return (
    <Box
      style={{
        margin: '20px auto',
        maxWidth: '900px',
        padding: '20px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1976d2',
        }}
      >
        Trench Calculation
      </Typography>

      <FormInput
        sectionName={sections[currentSectionIndex]?.sectionName || ''}
        setSectionName={(value) => {
          const updatedSections = [...sections];
          updatedSections[currentSectionIndex].sectionName = value;
          setSections(updatedSections);
        }}
        trenchType={sections[currentSectionIndex]?.trenchType || ''}
        setTrenchType={(value) => {
          const updatedSections = [...sections];
          updatedSections[currentSectionIndex].trenchType = value;
          setSections(updatedSections);
        }}
        conduits={sections[currentSectionIndex]?.conduits || []}
        handleInputChange={(index, field, value) => {
          const updatedSections = [...sections];
          updatedSections[currentSectionIndex].conduits[index][field] = value;
          setSections(updatedSections);
        }}
        handleCheckboxChange={(index) => {
          const updatedSections = [...sections];
          updatedSections[currentSectionIndex].conduits[index].checked =
            !updatedSections[currentSectionIndex].conduits[index].checked;
          setSections(updatedSections);
        }}
        handleAddConduit={() => {
          const updatedSections = [...sections];
          updatedSections[currentSectionIndex].conduits.push({
            type: '',
            sizes: '',
            count: 0,
            checked: false,
          });
          setSections(updatedSections);
        }}
        handleRemoveConduits={() => {
          const updatedSections = [...sections];
          updatedSections[currentSectionIndex].conduits =
            updatedSections[currentSectionIndex].conduits.filter(
              (c) => !c.checked
            );
          setSections(updatedSections);
        }}
        reloadPage={() => window.location.reload()}
        handleSubmit={handleSubmit}
        handleAddSection={handleAddSection}
        handleRemoveSection={handleRemoveSection}
        handleNavigateSection={handleNavigateSection}
        currentSectionIndex={currentSectionIndex}
        totalSections={sections.length}
      />

      <ResultsDisplay
        results={sections[currentSectionIndex]?.results}
        sectionName={sections[currentSectionIndex]?.sectionName || ''}
      />

      {sections.some((section) => section.results) && (
        <DownloadButton results={sections} />
      )}
    </Box>
  );
};

export default HomePage;
