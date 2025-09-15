import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export const getCsrfCookie = () => API.get('/sanctum/csrf-cookie');
export default API;
