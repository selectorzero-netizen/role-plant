import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('MOCK_TOKEN');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Pass errors down to UI level
    return Promise.reject(error);
  }
);
