import axios from 'axios';
import { getCookie } from './cookies';
import { env } from './function';

// axios.defaults.baseURL = env('AUTHENTICATION_SERVER');
axios.defaults.baseURL = env('SERVER');
axios.defaults.withCredentials = false;

axios.interceptors.request.use(function (config) {
    const accessToken = getCookie('accessToken-projects');
    if (!config.headers.Authorization) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});
