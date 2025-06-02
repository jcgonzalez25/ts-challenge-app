import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';
import { validateStudentData, validateStudentId } from '../middleware/validation.middleware';

const router = Router();

// GET /api/students - Get all students with optional filters
router.get('/', StudentController.getAllStudents);

// GET /api/students/statistics - Get student statistics
router.get('/statistics', StudentController.getStatistics);

// GET /api/students/export - Export students data
router.get('/export', StudentController.exportStudents);

// GET /api/students/:id - Get student by ID
router.get('/:id', validateStudentId, StudentController.getStudentById);

// POST /api/students - Create a new student
router.post('/', validateStudentData, StudentController.createStudent);

// PUT /api/students/:id - Update a student
router.put('/:id', validateStudentId, StudentController.updateStudent);

// DELETE /api/students/:id - Delete a student
router.delete('/:id', validateStudentId, StudentController.deleteStudent);

export default router;