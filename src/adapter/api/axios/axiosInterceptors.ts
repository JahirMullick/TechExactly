import { AxiosError, AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import apiInstance from './axiosInstance';

let interceptorsSetup = false;

/**
 * Setup all request and response interceptors for the Axios instance
 * Uses singleton pattern to ensure interceptors are only setup once
 */
export function setupAxiosInterceptors(): void {
    if (interceptorsSetup) {
        console.warn('Axios interceptors already setup. Skipping...');
        return;
    }

    apiInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // Modify request config if needed (e.g., add auth token)
            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    apiInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    interceptorsSetup = true;
    console.log('Axios interceptors setup completed');
}