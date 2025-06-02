import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/response.types';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    const response: ApiResponse = {
      success: false,
      error: err.message,
      errors: err.errors
    };
    return res.status(err.statusCode).json(response);
  }

  // Handle validation errors from service
  if (err.message.startsWith('[') || err.message.startsWith('{')) {
    try {
      const errors = JSON.parse(err.message);
      const response: ApiResponse = {
        success: false,
        error: 'Validation failed',
        errors: Array.isArray(errors) ? errors : [errors]
      };
      return res.status(400).json(response);
    } catch (e) {
      // Not a JSON error, continue
    }
  }

  // Default error response
  const response: ApiResponse = {
    success: false,
    error: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message
  };
  
  res.status(500).json(response);
};

export const notFoundHandler = (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: false,
    error: 'Resource not found'
  };
  res.status(404).json(response);
};