//  for axios instances here
import axios, { AxiosInstance } from 'axios';
import { ApiUri } from '../../../constants';

const REQUEST_TIMEOUT = 10000;

const apiInstance: AxiosInstance = axios.create({
    baseURL: ApiUri.BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
