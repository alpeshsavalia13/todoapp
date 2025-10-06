import axios from 'axios';

const API = axios.create({
  baseURL: window.appUrl,
  withCredentials: true,
});

export const getCsrfCookie = () => API.get('/sanctum/csrf-cookie');
export default API;
