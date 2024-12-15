import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const DownloadButton = ({ results }) => {
  const handleDownload = () => {
    if (!results) {
      console.error('Results object is undefined');
      return;
    }

    // Prepare data for Excel
    const data = [];

    // Split violations into separate rows
    if (results.violations?.length) {
      results.violations.forEach((violation) => {
        data.push({ Header: 'Violation', Value: violation });
      });
    } else {
      data.push({ Header: 'Violations', Value: 'None' });
    }

    data.push(
      { Header: 'Final Trench Width', Value: results.finalTrenchWidth || 'N/A' },
      { Header: 'Final Trench Depth', Value: results.finalTrenchDepth || 'N/A' }
    );

    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data, { header: ['Header', 'Value'] });

    // Add styling for rows with specific conditions (e.g., "exceeds trench width allotment")
    const redFill = {
      patternType: 'solid',
      fgColor: { rgb: 'FF0000' }, // Red background
    };

    Object.keys(worksheet).forEach((cell) => {
      // Ensure the cell has a value and check for specific conditions
      const cellValue = worksheet[cell]?.v;
      if (
        cellValue &&
        typeof cellValue === 'string' &&
		typeof '!@#$%^&*()>.' &&
        cellValue.includes('exceeds trench') &&
        cellValue.includes('>') && cellValue.includes(')') && cellValue.includes('(')
      ) {
        worksheet[cell].s = {
		//	style: {
		//	  backgroundColor: "red"
		//	}
          fill: "red",//redFill,
        };
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Trench Results');

    // Create Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
      cellStyles: true,
    });
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
      style={{ marginTop: '10px' }}
      onClick={handleDownload}
    >
      Download Excel Sheet
    </Button>
  );
};

export default DownloadButton;
