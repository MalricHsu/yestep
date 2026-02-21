import axios from 'axios';
export const TrailsApi = axios.create({
    baseURL: 'https://yestep.zeabur.app/',
});
