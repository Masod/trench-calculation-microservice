/**
 * 
 */
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/trench';


export const calculateTrench = async (data) => {
  try {
	const response = await fetch('http://localhost:8080/api/trench/calculate', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate trench dimensions');
    }

    return response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};


/*
export const calculateTrench = async (data) => {
    // Your API logic here
	const response = await axios.post(`${API_URL}/calculate?trenchType=${data.trenchType}`, data.conduits);
	  return response.data;
};
*/

/*
export const calculateTrench = async (data) => {
  const response = await axios.post(`${API_URL}/calculate?trenchType=${data.trenchType}`, data.conduits);
  return response.data;
};
*/