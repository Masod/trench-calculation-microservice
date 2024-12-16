import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const DownloadButton = ({ results }) => {
  const handleDownload = () => {
    if (!results || results.length === 0) {
      console.error('No results available to download');
      return;
    }

    // Prepare data for each section
    const data = results.map((section) => ({
      SectionName: section.sectionName,
      TrenchType: section.trenchType,
      Violations: section.results?.violations?.join(', ') || 'None',
      FinalTrenchWidth: section.results?.finalTrenchWidth || 'N/A',
      FinalTrenchDepth: section.results?.finalTrenchDepth || 'N/A',
    }));

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trench Results');

    // Create Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'trench_results.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ marginTop: '20px' }}
      onClick={handleDownload}
    >
      Download Excel Sheet
    </Button>
  );
};

export default DownloadButton;
