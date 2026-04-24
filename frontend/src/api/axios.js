import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });
const api = axios.create({
  //baseURL: 'https://taskflow-backend.onrender.com/api', // ← Render URL
    baseURL: 'https://taskflow-backend-qk24.onrender.com',        
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto logout if token expired
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
