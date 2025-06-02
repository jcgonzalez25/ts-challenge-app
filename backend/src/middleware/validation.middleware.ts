import { Request, Response, NextFunction } from 'express';
import { validateStudent } from '../utils/validators';
import { ApiResponse } from 'types/response.types';

export const validateStudentData = (req: Request, res: Response, next: NextFunction) => {
  const errors = validateStudent(req.body);
  
  if (errors.length > 0) {
    const response: ApiResponse = {
      success: false,
      error: 'Validation failed',
      errors: errors
    };
    return res.status(400).json(response);
  }
  
  next();
};

export const validateStudentId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    const response: ApiResponse = {
      success: false,
      error: 'Invalid student ID'
    };
    return res.status(400).json(response);
  }
  
  req.params.id = id.toString();
  next();
};