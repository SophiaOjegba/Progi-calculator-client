import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

export const calculateFees = (basePrice, vehicleType) => {
  return apiClient.get('/calculate', {
    params: { basePrice, vehicleType }
  });
};
