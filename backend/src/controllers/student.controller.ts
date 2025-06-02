import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/student.service';
import { ApiResponse } from '../types/response.types';
import { StudentFilters } from '../types/student.types';
import { AppError } from '../middleware/error.middleware';

export class StudentController {
  static async getAllStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const filters: StudentFilters = {
        search: req.query.search as string,
        graduationYear: req.query.graduationYear ? parseInt(req.query.graduationYear as string) : undefined,
        minGpa: req.query.minGpa ? parseFloat(req.query.minGpa as string) : undefined,
        maxGpa: req.query.maxGpa ? parseFloat(req.query.maxGpa as string) : undefined,
        city: req.query.city as string,
        state: req.query.state as string
      };

      const students = await StudentService.getAllStudents(filters);
      
      const response: ApiResponse = {
        success: true,
        data: students
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getStudentById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const student = await StudentService.getStudentById(id);
      
      const response: ApiResponse = {
        success: true,
        data: student
      };
      
      res.json(response);
    } catch (error) {
      if (error instanceof Error && error.message === 'Student not found') {
        next(new AppError('Student not found', 404));
      } else {
        next(error);
      }
    }
  }

  static async createStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await StudentService.createStudent(req.body);
      
      const response: ApiResponse = {
        success: true,
        data: student
      };
      
      res.status(201).json(response);
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        next(new AppError(error.message, 409));
      } else {
        next(error);
      }
    }
  }

  static async updateStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const student = await StudentService.updateStudent(id, req.body);
      
      const response: ApiResponse = {
        success: true,
        data: student
      };
      
      res.json(response);
    } catch (error) {
      if (error instanceof Error && error.message === 'Student not found') {
        next(new AppError('Student not found', 404));
      } else if (error instanceof Error && error.message.includes('already exists')) {
        next(new AppError(error.message, 409));
      } else {
        next(error);
      }
    }
  }

  static async deleteStudent(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      await StudentService.deleteStudent(id);
      
      const response: ApiResponse = {
        success: true,
        data: { message: 'Student deleted successfully' }
      };
      
      res.json(response);
    } catch (error) {
      if (error instanceof Error && error.message === 'Student not found') {
        next(new AppError('Student not found', 404));
      } else {
        next(error);
      }
    }
  }

  static async getStatistics(_req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await StudentService.getStudentStatistics();
      
      const response: ApiResponse = {
        success: true,
        data: stats
      };
      
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async exportStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const format = (req.query.format as 'csv' | 'json') || 'json';
      const data = await StudentService.exportStudents(format);
      
      if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=students.json');
      }
      
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}