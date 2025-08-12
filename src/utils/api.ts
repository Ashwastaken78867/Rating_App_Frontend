import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header with Bearer token for every request if token exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
