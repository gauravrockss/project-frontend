import axios from 'axios';
import { getCookie } from './cookies';
import { env } from './function';

const accessToken = getCookie('accessToken');

const universal = axios.create({
    baseURL: env('SERVER'),
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

export default universal;
