export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError extends Error {
  name: 'ApiError';
  errors?: ValidationError[];
  statusCode?: number;
}