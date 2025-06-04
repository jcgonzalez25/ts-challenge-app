import { CreateStudentDto, Student } from '../../types/student.types';

/**
 * Student Test Data Factory
 * 
 * This factory provides methods to generate consistent test data for student objects.
 * It helps maintain DRY principles in tests and makes it easy to create test data
 * with specific overrides when needed.
 * 
 * Benefits:
 * - Consistent test data across all tests
 * - Easy to modify default values in one place
 * - Supports partial overrides for specific test cases
 * - Reduces test setup boilerplate
 * 
 * @category Test Utilities
 */
export class StudentFactory {
  /**
   * Default student data template
   * These values represent a valid student that passes all validations
   */
  private static readonly DEFAULT_STUDENT_DATA = {
    name: 'John Doe',
    email: 'john.doe@university.edu',
    graduationYear: 2024,
    phoneNumber: '5551234567',
    gpa: 3.8,
    city: 'New York',
    state: 'NY',
    latitude: 40.7128,
    longitude: -74.0060,
  };

  /**
   * Build a single student DTO for creation
   * 
   * @param overrides - Partial data to override defaults
   * @returns CreateStudentDto with merged data
   * 
   * @example
   * ```typescript
   * // Create default student
   * const student = StudentFactory.buildCreateDto();
   * 
   * // Create student with specific email
   * const student = StudentFactory.buildCreateDto({ 
   *   email: 'jane@example.com' 
   * });
   * 
   * // Create student with multiple overrides
   * const student = StudentFactory.buildCreateDto({
   *   name: 'Jane Smith',
   *   gpa: 4.0,
   *   graduationYear: 2025
   * });
   * ```
   */
  static buildCreateDto(overrides: Partial<CreateStudentDto> = {}): CreateStudentDto {
    return {
      ...this.DEFAULT_STUDENT_DATA,
      ...overrides,
    };
  }

  /**
   * Build a complete student object (with ID and timestamps)
   * 
   * @param overrides - Partial data to override defaults
   * @returns Complete Student object
   * 
   * @example
   * ```typescript
   * // Create student with ID
   * const student = StudentFactory.build({ id: 1 });
   * 
   * // Create student with custom data
   * const student = StudentFactory.build({
   *   id: 5,
   *   name: 'Alice Johnson',
   *   email: 'alice@test.com'
   * });
   * ```
   */
  static build(overrides: Partial<Student> = {}): Student {
    const now = new Date();
    return {
      id: 1,
      ...this.DEFAULT_STUDENT_DATA,
      createdAt: now,
      updatedAt: now,
      ...overrides,
    };
  }

  /**
   * Build a list of student DTOs for creation
   * 
   * @param count - Number of students to create
   * @param baseOverrides - Common overrides applied to all students
   * @returns Array of CreateStudentDto objects
   * 
   * @example
   * ```typescript
   * // Create 5 students with default data
   * const students = StudentFactory.buildCreateDtoList(5);
   * 
   * // Create 3 students, all from same city
   * const students = StudentFactory.buildCreateDtoList(3, { 
   *   city: 'Boston',
   *   state: 'MA' 
   * });
   * ```
   */
  static buildCreateDtoList(
    count: number, 
    baseOverrides: Partial<CreateStudentDto> = {}
  ): CreateStudentDto[] {
    return Array.from({ length: count }, (_, index) => 
      this.buildCreateDto({
        ...baseOverrides,
        email: `student${index + 1}@university.edu`,
        name: `Student ${index + 1}`,
      })
    );
  }

  /**
   * Build a list of complete student objects
   * 
   * @param count - Number of students to create
   * @param baseOverrides - Common overrides applied to all students
   * @returns Array of complete Student objects
   * 
   * @example
   * ```typescript
   * // Create 10 students with sequential IDs
   * const students = StudentFactory.buildList(10);
   * 
   * // Create 5 students, all graduating in 2025
   * const students = StudentFactory.buildList(5, { 
   *   graduationYear: 2025 
   * });
   * ```
   */
  static buildList(
    count: number, 
    baseOverrides: Partial<Student> = {}
  ): Student[] {
    return Array.from({ length: count }, (_, index) => 
      this.build({
        ...baseOverrides,
        id: index + 1,
        email: `student${index + 1}@university.edu`,
        name: `Student ${index + 1}`,
      })
    );
  }

  /**
   * Build student data with specific graduation years
   * Useful for testing filtering and statistics
   * 
   * @param years - Array of graduation years
   * @returns Array of students with specified graduation years
   * 
   * @example
   * ```typescript
   * // Create students graduating in different years
   * const students = StudentFactory.buildWithGraduationYears([2024, 2025, 2026]);
   * ```
   */
  static buildWithGraduationYears(years: number[]): Student[] {
    return years.map((year, index) => 
      this.build({
        id: index + 1,
        graduationYear: year,
        email: `student${index + 1}@university.edu`,
        name: `Student ${index + 1}`,
      })
    );
  }

  /**
   * Build students with different GPAs for testing GPA-based filtering
   * 
   * @param gpas - Array of GPA values
   * @returns Array of students with specified GPAs
   * 
   * @example
   * ```typescript
   * // Create students with various GPAs
   * const students = StudentFactory.buildWithGpas([3.5, 3.8, 4.0, 2.9]);
   * ```
   */
  static buildWithGpas(gpas: number[]): Student[] {
    return gpas.map((gpa, index) => 
      this.build({
        id: index + 1,
        gpa,
        email: `student${index + 1}@university.edu`,
        name: `Student ${index + 1}`,
      })
    );
  }

  /**
   * Build invalid student data for testing validation
   * 
   * @param type - Type of invalid data to generate
   * @returns Invalid student data for testing error cases
   * 
   * @example
   * ```typescript
   * // Test email validation
   * const invalidStudent = StudentFactory.buildInvalid('email');
   * 
   * // Test GPA validation
   * const invalidStudent = StudentFactory.buildInvalid('gpa');
   * ```
   */
  static buildInvalid(type: 'email' | 'gpa' | 'phone' | 'name'): Partial<CreateStudentDto> {
    const base = this.buildCreateDto();
    
    switch (type) {
      case 'email':
        return { ...base, email: 'invalid-email' };
      case 'gpa':
        return { ...base, gpa: 5.0 }; // Invalid: over 4.0
      case 'phone':
        return { ...base, phoneNumber: '123' }; // Invalid: too short
      case 'name':
        return { ...base, name: '' }; // Invalid: empty name
      default:
        return base;
    }
  }
} 