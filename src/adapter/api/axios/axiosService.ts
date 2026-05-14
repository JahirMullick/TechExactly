import { AxiosRequestConfig, AxiosError } from 'axios';
import apiInstance from './axiosInstance';
import { setupAxiosInterceptors } from './axiosInterceptors';

// Run interceptors once during import (only runs once due to singleton pattern)
setupAxiosInterceptors();

interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
}

class ApiService {
    static async get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiInstance.get<T>(url, config);
            return response;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    static async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiInstance.post<T>(url, data, config);
            return response;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    static async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiInstance.put<T>(url, data, config);
            return response;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    static async patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiInstance.patch<T>(url, data, config);
            return response;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    static async delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<ApiResponse<T>> {
        try {
            const response = await apiInstance.delete<T>(url, config);
            return response;
        } catch (error) {
            throw this.handleError(error as AxiosError);
        }
    }

    private static handleError(error: AxiosError): Error {
        if (error.response) {
            const status = error.response.status;
            const message =
                (error.response.data && (error.response.data as { message?: string }).message)
                || error.message;

            switch (status) {
                case 400: return new Error(`Bad Request: ${message}`);
                case 401: return new Error(`Unauthorized: ${message}`);
                case 403: return new Error(`Forbidden: ${message}`);
                case 404: return new Error(`Not Found: ${message}`);
                case 500: return new Error(`Server Error: ${message}`);
                default: return new Error(`HTTP ${status}: ${message}`);
            }
        } else if (error.request) {
            return new Error('Network Error: Please check your connection');
        } else {
            return new Error(error.message || 'An unexpected error occurred');
        }
    }
}

export default ApiService;