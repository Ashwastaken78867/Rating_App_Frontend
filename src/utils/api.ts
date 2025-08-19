import axios from 'axios';

// Always use the deployed backend URL
const api = axios.create({
  baseURL: 'https://rating-app-backend-k9u7.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

// Add Authorization header with Bearer token for every request if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
