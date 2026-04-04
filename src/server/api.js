import axios from 'axios';
export const TrailsApi = axios.create({
  // baseURL: 'https://yestep.zeabur.app/',
  baseURL: import.meta.env.VITE_API_URL || '/',
});
