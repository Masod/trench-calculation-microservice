/**
 * 
 */
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/trench';

export const calculateTrench = async (data) => {
  const response = await axios.post(`${API_URL}/calculate?trenchType=${data.trenchType}`, data.conduits);
  return response.data;
};
