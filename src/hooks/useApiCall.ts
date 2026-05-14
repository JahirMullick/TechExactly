import { useMutation, useQuery, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import ApiService from '../adapter/api/axios/axiosService';
import { ApiQueryKeys } from '../adapter/api';

type QueryParams = Record<string, string | number | boolean | undefined | null>;

const buildUrlWithParams = (baseUrl: string, params?: QueryParams): string => {
    if (!params) return baseUrl;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

// Default query options
const defaultQueryOptions = {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount: number, error: any) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
        }
        return failureCount < 3;
    },
};

// Default mutation options
const defaultMutationOptions = {
    retry: 1,
};

// SIMPLIFIED GET Hook
export function useApiGet<TResponse = any, TParams extends QueryParams = QueryParams>(
    url: keyof typeof ApiQueryKeys | string,
    params?: TParams,
    options?: Omit<UseQueryOptions<TResponse, Error>, 'queryKey' | 'queryFn'>
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];
    const finalUrl = buildUrlWithParams(endpoint, params);

    return useQuery<TResponse, Error>({
        queryKey: [endpoint, params],
        queryFn: async () => {
            const response = await ApiService.get<TResponse>(finalUrl);
            return response.data;
        },
        ...defaultQueryOptions,
        ...options,
    });
}

// SIMPLIFIED POST Hook
export function useApiPost<TResponse = any, TRequest = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, TRequest>
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];

    return useMutation<TResponse, Error, TRequest>({
        mutationFn: async (data: TRequest) => {
            const response = await ApiService.post<TResponse>(endpoint, data);
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// SIMPLIFIED PUT Hook
export function useApiPut<TResponse = any, TRequest = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, TRequest>
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];

    return useMutation<TResponse, Error, TRequest>({
        mutationFn: async (data: TRequest) => {
            const response = await ApiService.put<TResponse>(endpoint, data);
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// SIMPLIFIED PATCH Hook
export function useApiPatch<TResponse = any, TRequest = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, TRequest>
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];

    return useMutation<TResponse, Error, TRequest>({
        mutationFn: async (data: TRequest) => {
            const response = await ApiService.patch<TResponse>(endpoint, data);
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// SIMPLIFIED DELETE Hook
export function useApiDelete<TResponse = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, void>
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];

    return useMutation<TResponse, Error, void>({
        mutationFn: async () => {
            const response = await ApiService.delete<TResponse>(endpoint);
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// ADVANCED FILE UPLOAD Hook (for custom FormData - rare use case)
export function useApiUpload<TResponse = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, FormData> & {
        onUploadProgress?: (progress: number) => void;
    }
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];

    return useMutation<TResponse, Error, FormData>({
        mutationFn: async (formData: FormData) => {
            const response = await ApiService.post<TResponse>(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        options?.onUploadProgress?.(progress);
                    }
                },
            });
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// MULTIPLE FILES UPLOAD Hook - IMPROVED
export function useApiMultiUpload<TResponse = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, { files: File[]; data?: Record<string, any> }> & {
        onUploadProgress?: (progress: number) => void;
        fieldName?: string; // Default: 'files'
    }
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];
    const fieldName = options?.fieldName || 'files';

    return useMutation<TResponse, Error, { files: File[]; data?: Record<string, any> }>({
        mutationFn: async ({ files, data }) => {
            // FormData creation handled inside hook! 🎉
            const formData = new FormData();

            files.forEach((file, index) => {
                formData.append(`${fieldName}[${index}]`, file);
            });

            // Add any additional form data
            if (data) {
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, String(value));
                    }
                });
            }

            const response = await ApiService.post<TResponse>(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        options?.onUploadProgress?.(progress);
                    }
                },
            });
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// SINGLE FILE UPLOAD Hook (most common use case) - IMPROVED
export function useApiFileUpload<TResponse = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, { file: File; data?: Record<string, any> }> & {
        onUploadProgress?: (progress: number) => void;
        fieldName?: string; // Default: 'file'
    }
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];
    const fieldName = options?.fieldName || 'file';

    return useMutation<TResponse, Error, { file: File; data?: Record<string, any> }>({
        mutationFn: async ({ file, data }) => {
            // FormData creation handled inside hook! 🎉
            const formData = new FormData();
            formData.append(fieldName, file);

            // Add any additional form data
            if (data) {
                Object.entries(data).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, String(value));
                    }
                });
            }

            const response = await ApiService.post<TResponse>(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        options?.onUploadProgress?.(progress);
                    }
                },
            });
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// EVEN SIMPLER: Just pass file directly
export function useApiSimpleFileUpload<TResponse = any>(
    url: keyof typeof ApiQueryKeys | string,
    fieldName: string = 'file',
    options?: UseMutationOptions<TResponse, Error, File> & {
        onUploadProgress?: (progress: number) => void;
        extraData?: Record<string, any>; // Static extra data
    }
) {
    const endpoint = typeof url === 'string' ? url : ApiQueryKeys[url];

    return useMutation<TResponse, Error, File>({
        mutationFn: async (file: File) => {
            // FormData creation fully handled inside! 🚀
            const formData = new FormData();
            formData.append(fieldName, file);

            // Add static extra data if provided
            if (options?.extraData) {
                Object.entries(options.extraData).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, String(value));
                    }
                });
            }

            const response = await ApiService.post<TResponse>(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        options?.onUploadProgress?.(progress);
                    }
                },
            });
            return response.data;
        },
        ...defaultMutationOptions,
        ...options,
    });
}

// BONUS: Hook with loading state management
export function useApiPostWithLoading<TResponse = any, TRequest = any>(
    url: keyof typeof ApiQueryKeys | string,
    options?: UseMutationOptions<TResponse, Error, TRequest>
) {
    return useApiPost<TResponse, TRequest>(url, {
        onMutate: () => {
            // You can handle loading state here or let the component handle it via isPending
        },
        onSettled: () => {
            // Reset loading state
        },
        ...options,
    });
}


// usage
// get api call
// const { data: posts, isLoading, error } = useApiGet<ResponseType[]>(ApiQueryKeys.posts);

// Post Api call
// const loginMutation = useApiPost<any, any>(
//     ApiQueryKeys.posts,
//     {
//       onSuccess: (response) => {
//         Alert.alert('Success', 'Login successful!');
//         // Handle success
//       },
//       onError: (error) => {
//         Alert.alert('Error', error.message);
//       }
//     }
//   );

// loginMutation.mutate({
//   "title": "Sukanta's Post",
//   "body": "This is a test from React Native",
//   "userId": 1
// })

// // Option 1: Most flexible
// const fileUpload = useApiFileUpload<UploadResponse>(ApiQueryKeys.upload);

// const handleUpload = () => {
//   fileUpload.mutate({
//     file: selectedFile,
//     data: { category: 'documents', userId }  // Hook creates FormData!
//   });
// };

// // Option 2: Simplest (for basic uploads)
// const simpleUpload = useApiSimpleFileUpload<UploadResponse>(
//   ApiQueryKeys.upload,
//   'file', // field name
//   {
//     extraData: { category: 'documents' }, // Static data
//     onUploadProgress: setProgress
//   }
// );

// const handleSimpleUpload = () => {
//   simpleUpload.mutate(selectedFile); // Just pass the file!
// };

// // Option 3: Multiple files
// const multiUpload = useApiMultiUpload<UploadResponse>(ApiQueryKeys.uploadMultiple);

// const handleMultiUpload = () => {
//   multiUpload.mutate({
//     files: [file1, file2, file3],
//     data: { albumId: 123 }  // Hook creates FormData!
//   });
// };