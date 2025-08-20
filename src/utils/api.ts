import axios from 'axios';

// Use environment variable if available, fallback to localhost for dev
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  // 'http://localhost:5000',
  // import.meta.env.VITE_API_BASE_URL
  //  || 
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
