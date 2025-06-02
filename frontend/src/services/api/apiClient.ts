import axios from 'axios';
import { ApiResponse } from '../../types/api.types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token (if needed later)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    console.error('API Error:', error);
    
    // If we have a response with ApiResponse format
    if (error.response?.data) {
      const apiResponse: ApiResponse = error.response.data;
      if (!apiResponse.success && apiResponse.error) {
        // Create a more descriptive error
        const enhancedError = new Error(apiResponse.error);
        enhancedError.name = 'ApiError';
        (enhancedError as any).errors = apiResponse.errors;
        (enhancedError as any).statusCode = error.response.status;
        return Promise.reject(enhancedError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;