import request from 'supertest';
import { createApp } from '../../app';
import { StudentController } from '../../controllers/student.controller';
import { StudentFactory } from '../factories/student.factory';

// Mock the student controller
jest.mock('../../controllers/student.controller');
const mockedController = StudentController as jest.Mocked<typeof StudentController>;

describe('Student Routes', () => {
  const app = createApp();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/students', () => {
    it('should call StudentController.getAllStudents', async () => {
      // Use factory to create consistent test data
      const mockStudents = StudentFactory.buildList(3);
      
      mockedController.getAllStudents.mockImplementation(async (req, res, next) => {
        res.status(200).json({ success: true, data: mockStudents });
      });

      const response = await request(app)
        .get('/api/students')
        .expect(200);

      expect(mockedController.getAllStudents).toHaveBeenCalledTimes(1);
      // Convert Date objects to strings for comparison (JSON serialization effect)
      const expectedData = JSON.parse(JSON.stringify(mockStudents));
      expect(response.body.data).toEqual(expectedData);
    });

    it('should handle search filters', async () => {
      const searchTerm = 'John';
      const mockStudents = StudentFactory.buildList(1, { name: 'John Doe' });
      
      mockedController.getAllStudents.mockImplementation(async (req, res, next) => {
        res.status(200).json({ success: true, data: mockStudents });
      });

      await request(app)
        .get(`/api/students?search=${searchTerm}`)
        .expect(200);

      expect(mockedController.getAllStudents).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/students/statistics', () => {
    it('should call StudentController.getStatistics', async () => {
      const mockStats = {
        total: 150,
        byGraduationYear: { '2024': 50, '2025': 75, '2026': 25 },
        byState: { 'CA': 60, 'NY': 45, 'TX': 30, 'FL': 15 },
        averageGPA: 3.42
      };

      mockedController.getStatistics.mockImplementation(async (req, res, next) => {
        res.status(200).json({ success: true, data: mockStats });
      });

      const response = await request(app)
        .get('/api/students/statistics')
        .expect(200);

      expect(mockedController.getStatistics).toHaveBeenCalledTimes(1);
      expect(response.body.data).toEqual(mockStats);
    });
  });

  describe('POST /api/students', () => {
    it('should validate student data', async () => {
      // This will test the validation middleware with empty data
      await request(app)
        .post('/api/students')
        .send({}) // Invalid empty data
        .expect(400); // Should return validation error
    });

    it('should validate specific field requirements', async () => {
      // Use factory to create invalid data for testing validation
      const invalidStudent = StudentFactory.buildInvalid('email');
      
      await request(app)
        .post('/api/students')
        .send(invalidStudent)
        .expect(400); // Should return validation error
    });

    it('should call StudentController.createStudent with valid data', async () => {
      // Use factory to create valid student data
      const validStudentData = StudentFactory.buildCreateDto({
        email: 'test@example.com'
      });

      const createdStudent = StudentFactory.build({ 
        id: 1, 
        ...validStudentData 
      });

      mockedController.createStudent.mockImplementation(async (req, res, next) => {
        res.status(201).json({ success: true, data: createdStudent });
      });

      const response = await request(app)
        .post('/api/students')
        .send(validStudentData)
        .expect(201);

      expect(mockedController.createStudent).toHaveBeenCalledTimes(1);
      // Convert Date objects to strings for comparison (JSON serialization effect)
      const expectedData = JSON.parse(JSON.stringify(createdStudent));
      expect(response.body.data).toEqual(expectedData);
    });

    it('should handle batch creation with multiple students', async () => {
      // Use factory to create multiple students for batch testing
      const studentsData = StudentFactory.buildCreateDtoList(3);
      const createdStudents = studentsData.map((student, index) => 
        StudentFactory.build({ id: index + 1, ...student })
      );

      mockedController.createStudent.mockImplementation(async (req, res, next) => {
        const student = createdStudents.find(s => s.email === req.body.email);
        res.status(201).json({ success: true, data: student });
      });

      // Test creating each student individually
      for (const studentData of studentsData) {
        await request(app)
          .post('/api/students')
          .send(studentData)
          .expect(201);
      }

      expect(mockedController.createStudent).toHaveBeenCalledTimes(3);
    });
  });

  describe('GET /api/students/:id', () => {
    it('should validate student ID format', async () => {
      await request(app)
        .get('/api/students/invalid-id')
        .expect(400); // Should return validation error
    });

    it('should call StudentController.getStudentById with valid ID', async () => {
      // Use factory to create test student
      const mockStudent = StudentFactory.build({ id: 1 });

      mockedController.getStudentById.mockImplementation(async (req, res, next) => {
        res.status(200).json({ success: true, data: mockStudent });
      });

      const response = await request(app)
        .get('/api/students/1')
        .expect(200);

      expect(mockedController.getStudentById).toHaveBeenCalledTimes(1);
      // Convert Date objects to strings for comparison (JSON serialization effect)
      const expectedData = JSON.parse(JSON.stringify(mockStudent));
      expect(response.body.data).toEqual(expectedData);
    });

    it('should handle student not found', async () => {
      mockedController.getStudentById.mockImplementation(async (req, res, next) => {
        res.status(404).json({ 
          success: false, 
          message: 'Student not found' 
        });
      });

      await request(app)
        .get('/api/students/999')
        .expect(404);

      expect(mockedController.getStudentById).toHaveBeenCalledTimes(1);
    });
  });
}); 