import { StudentService } from '../../services/student.service';
import { StudentModel } from '../../models/student.model';
import { StudentFactory } from '../factories/student.factory';

/**
 * Unit Tests for StudentService
 * 
 * These tests verify the business logic in the StudentService class.
 * They mock the StudentModel to isolate the service layer and test
 * only the service's logic without database dependencies.
 * 
 * Testing Strategy:
 * - Mock StudentModel to avoid database calls
 * - Test both success and error scenarios
 * - Verify service calls model with correct parameters
 * - Test business logic validation and transformation
 * - Use StudentFactory for consistent test data
 * 
 * @category Unit Tests
 */

// Mock the StudentModel to isolate service testing
jest.mock('../../models/student.model');
const mockedStudentModel = StudentModel as jest.Mocked<typeof StudentModel>;

describe('StudentService', () => {
  /**
   * Reset all mocks before each test to ensure test isolation
   * This prevents tests from affecting each other
   */
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests for getAllStudents method
   * 
   * This method should retrieve students with optional filtering.
   * It delegates to StudentModel.findAll() and passes through filters.
   */
  describe('getAllStudents', () => {
    /**
     * Test happy path: service returns students when model succeeds
     * 
     * Scenario: Model returns array of students
     * Expected: Service returns the same array
     */
    it('should return all students with no filters', async () => {
      // Arrange - Use factory to create consistent test data
      const mockStudents = StudentFactory.buildList(2);
      
      mockedStudentModel.findAll.mockResolvedValue(mockStudents as any);

      // Act - Execute the method under test
      const result = await StudentService.getAllStudents({});

      // Assert - Verify the results and interactions
      expect(mockedStudentModel.findAll).toHaveBeenCalledWith({});
      expect(result).toEqual(mockStudents);
    });

    /**
     * Test filtering: service passes filters to model correctly
     * 
     * Scenario: Service called with search filter
     * Expected: Filter is passed through to model
     */
    it('should filter students by search term', async () => {
      // Arrange - Use factory with specific name for search
      const mockStudents = StudentFactory.buildList(1, { name: 'John Doe' });
      
      mockedStudentModel.findAll.mockResolvedValue(mockStudents as any);

      // Act
      const filters = { search: 'John' };
      const result = await StudentService.getAllStudents(filters);

      // Assert - Verify filter is passed correctly
      expect(mockedStudentModel.findAll).toHaveBeenCalledWith(filters);
      expect(result).toEqual(mockStudents);
    });
  });

  /**
   * Tests for getStudentById method
   * 
   * This method should retrieve a single student by ID and handle
   * the case where the student is not found by throwing an error.
   */
  describe('getStudentById', () => {
    /**
     * Test happy path: return student when found
     * 
     * Scenario: Model returns a student object
     * Expected: Service returns the student
     */
    it('should return student by ID', async () => {
      // Arrange - Use factory to create test student
      const mockStudent = StudentFactory.build({ id: 1 });
      
      mockedStudentModel.findById.mockResolvedValue(mockStudent as any);

      // Act
      const result = await StudentService.getStudentById(1);

      // Assert
      expect(mockedStudentModel.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockStudent);
    });

    /**
     * Test error case: throw error when student not found
     * 
     * Scenario: Model returns null (student not found)
     * Expected: Service throws 'Student not found' error
     */
    it('should throw error if student not found', async () => {
      // Arrange - Mock model to return null
      mockedStudentModel.findById.mockResolvedValue(null);

      // Act & Assert - Verify error is thrown
      await expect(StudentService.getStudentById(999))
        .rejects.toThrow('Student not found');
    });
  });

  /**
   * Tests for createStudent method
   * 
   * This method handles student creation with validation,
   * email uniqueness checking, and phone number formatting.
   */
  describe('createStudent', () => {
    /**
     * Test successful student creation
     * 
     * Scenario: Valid data, no existing email, validation passes
     * Expected: Student is created and returned with ID
     */
    it('should create a new student', async () => {
      // Arrange - Use factory for clean, valid student data
      const newStudent = StudentFactory.buildCreateDto({
        email: 'test@example.com'
      });

      const mockCreatedStudent = StudentFactory.build({ 
        id: 1, 
        ...newStudent 
      });
      
      // Mock the validation and email check flow
      mockedStudentModel.findByEmail.mockResolvedValue(null); // No existing email
      mockedStudentModel.create.mockResolvedValue(mockCreatedStudent as any);

      // Act
      const result = await StudentService.createStudent(newStudent);

      // Assert - Verify the complete flow
      expect(mockedStudentModel.findByEmail).toHaveBeenCalledWith(newStudent.email);
      expect(mockedStudentModel.create).toHaveBeenCalled();
      expect(result).toEqual(mockCreatedStudent);
    });

    /**
     * Test email uniqueness validation
     * 
     * Scenario: Email already exists in database
     * Expected: Service throws error about duplicate email
     */
    it('should throw error if email already exists', async () => {
      // Arrange - Use factory for both new and existing student
      const newStudent = StudentFactory.buildCreateDto({
        email: 'duplicate@example.com'
      });

      const existingStudent = StudentFactory.build({ 
        id: 2, 
        email: 'duplicate@example.com' 
      });
      
      // Mock email check to return existing student
      mockedStudentModel.findByEmail.mockResolvedValue(existingStudent as any);

      // Act & Assert
      await expect(StudentService.createStudent(newStudent))
        .rejects.toThrow('A student with this email already exists');
    });

    /**
     * Test validation with invalid data
     * 
     * Scenario: Invalid student data provided
     * Expected: Service throws validation error
     */
    it('should throw validation error for invalid data', async () => {
      // Arrange - Use factory to create invalid student data
      const invalidStudent = StudentFactory.buildInvalid('email');

      // Act & Assert
      await expect(StudentService.createStudent(invalidStudent as any))
        .rejects.toThrow();
    });
  });
}); 