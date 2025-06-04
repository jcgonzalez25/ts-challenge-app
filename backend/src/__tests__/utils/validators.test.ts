// Example utility test - create this as a template for testing utility functions

import {
  isValidEmail,
  isValidPhoneNumber,
  isValidGPA,
  isValidGraduationYear,
  formatPhoneNumber,
  validateStudent
} from '../../utils/validators';

/**
 * Unit Tests for Validator Utilities
 * 
 * These tests verify the validation logic used throughout the application.
 * They test pure functions that validate user input and format data.
 * 
 * Testing Strategy:
 * - Test valid inputs (happy path)
 * - Test invalid inputs (edge cases)
 * - Test boundary conditions
 * - Test formatting functions
 * 
 * @category Unit Tests
 */
describe('Validator Utilities', () => {
  /**
   * Email Validation Tests
   * 
   * Tests the email validation regex and logic
   */
  describe('isValidEmail', () => {
    /**
     * Test valid email formats
     */
    describe('valid emails', () => {
      it.each([
        'test@example.com',
        'user.name@domain.org',
        'firstname+lastname@company.co.uk',
        'user123@test-domain.net',
        'admin@subdomain.example.com',
      ])('should return true for valid email: %s', (email) => {
        expect(isValidEmail(email)).toBe(true);
      });
    });

    /**
     * Test invalid email formats
     */
    describe('invalid emails', () => {
      it.each([
        'invalid-email',
        'missing-at-symbol.com',
        'user@',
        '@domain.com',
        'user@domain',
        'user space@domain.com',
        '',
        'user@@domain.com',
      ])('should return false for invalid email: %s', (email) => {
        expect(isValidEmail(email)).toBe(false);
      });
    });
  });

  /**
   * Phone Number Validation Tests
   * 
   * Tests phone number validation for 10-digit US numbers
   */
  describe('isValidPhoneNumber', () => {
    /**
     * Test valid phone number formats
     */
    describe('valid phone numbers', () => {
      it.each([
        '1234567890',
        '123-456-7890',
        '(123) 456-7890',
        '123 456 7890',
        '(123)456-7890',
      ])('should return true for valid phone: %s', (phone) => {
        expect(isValidPhoneNumber(phone)).toBe(true);
      });
    });

    /**
     * Test invalid phone number formats
     */
    describe('invalid phone numbers', () => {
      it.each([
        '123456789',      // 9 digits
        '12345678901',    // 11 digits
        'abc-def-ghij',   // letters
        '123-456',        // incomplete
        '',               // empty
        '555-CALL-NOW',   // mixed format
        '123.456.7890',   // dots not supported
      ])('should return false for invalid phone: %s', (phone) => {
        expect(isValidPhoneNumber(phone)).toBe(false);
      });
    });
  });

  /**
   * GPA Validation Tests
   * 
   * Tests GPA validation for 0.0 to 4.0 scale
   */
  describe('isValidGPA', () => {
    /**
     * Test valid GPA values
     */
    describe('valid GPAs', () => {
      it.each([
        0.0,
        1.5,
        2.75,
        3.8,
        4.0,
      ])('should return true for valid GPA: %s', (gpa) => {
        expect(isValidGPA(gpa)).toBe(true);
      });
    });

    /**
     * Test invalid GPA values
     */
    describe('invalid GPAs', () => {
      it.each([
        -0.1,    // below minimum
        4.1,     // above maximum
        5.0,     // way above maximum
        -1.0,    // negative
      ])('should return false for invalid GPA: %s', (gpa) => {
        expect(isValidGPA(gpa)).toBe(false);
      });
    });
  });

  /**
   * Graduation Year Validation Tests
   * 
   * Tests graduation year validation (current year ± 10 years)
   */
  describe('isValidGraduationYear', () => {
    const currentYear = new Date().getFullYear();

    /**
     * Test valid graduation years
     */
    describe('valid graduation years', () => {
      it.each([
        currentYear - 5,   // 5 years ago
        currentYear,       // current year
        currentYear + 5,   // 5 years future
        currentYear - 10,  // boundary: 10 years ago
        currentYear + 10,  // boundary: 10 years future
      ])('should return true for valid year: %s', (year) => {
        expect(isValidGraduationYear(year)).toBe(true);
      });
    });

    /**
     * Test invalid graduation years
     */
    describe('invalid graduation years', () => {
      it.each([
        currentYear - 11,  // too far in past
        currentYear + 11,  // too far in future
        1900,              // way too old
        2100,              // way too future
      ])('should return false for invalid year: %s', (year) => {
        expect(isValidGraduationYear(year)).toBe(false);
      });
    });
  });

  /**
   * Phone Number Formatting Tests
   * 
   * Tests phone number formatting to standard (XXX) XXX-XXXX format
   */
  describe('formatPhoneNumber', () => {
    /**
     * Test formatting of various inputs with 10 digits
     */
    describe('formatting inputs with 10 digits', () => {
      it.each([
        ['1234567890', '(123) 456-7890'],
        ['123-456-7890', '(123) 456-7890'],
        ['(123) 456-7890', '(123) 456-7890'],
        ['123 456 7890', '(123) 456-7890'],
        ['123.456.7890', '(123) 456-7890'],  // formatPhoneNumber extracts digits
        ['abc123def456ghi7890', '(123) 456-7890'],  // extracts only digits
      ])('should format %s to %s', (input, expected) => {
        expect(formatPhoneNumber(input)).toBe(expected);
      });
    });

    /**
     * Test that inputs without exactly 10 digits are returned unchanged
     */
    describe('inputs without exactly 10 digits', () => {
      it.each([
        '123456789',     // 9 digits
        '12345678901',   // 11 digits
        'abc-def-ghij',  // no digits
        '',              // empty
        '555-CALL-NOW',  // mixed, but not 10 digits
        '123-456',       // 6 digits
      ])('should return unchanged for input without 10 digits: %s', (input) => {
        expect(formatPhoneNumber(input)).toBe(input);
      });
    });
  });

  /**
   * Complete Student Validation Tests
   * 
   * Tests the main validateStudent function that combines all validations
   */
  describe('validateStudent', () => {
    /**
     * Test validation with valid student data
     */
    it('should return no errors for valid student data', () => {
      const validStudent = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        gpa: 3.8,
        graduationYear: new Date().getFullYear() + 1,
        latitude: 40.7128,
        longitude: -74.0060,
      };

      const errors = validateStudent(validStudent);
      expect(errors).toEqual([]);
    });

    /**
     * Test validation with missing required fields
     */
    it('should return errors for missing required fields', () => {
      const invalidStudent = {};

      const errors = validateStudent(invalidStudent);
      
      // Should have errors for all required fields
      expect(errors).toHaveLength(5);
      expect(errors.some(e => e.field === 'name')).toBe(true);
      expect(errors.some(e => e.field === 'email')).toBe(true);
      expect(errors.some(e => e.field === 'phoneNumber')).toBe(true);
      expect(errors.some(e => e.field === 'gpa')).toBe(true);
      expect(errors.some(e => e.field === 'graduationYear')).toBe(true);
    });

    /**
     * Test individual field validations
     */
    describe('individual field validation', () => {
      const baseValidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        gpa: 3.8,
        graduationYear: new Date().getFullYear() + 1,
      };

      it('should validate name field', () => {
        const invalidName = { ...baseValidData, name: 'J' }; // too short
        const errors = validateStudent(invalidName);
        
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe('name');
        expect(errors[0].message).toBe('Name must be at least 2 characters long');
      });

      it('should validate email field', () => {
        const invalidEmail = { ...baseValidData, email: 'invalid-email' };
        const errors = validateStudent(invalidEmail);
        
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe('email');
        expect(errors[0].message).toBe('Please provide a valid email address');
      });

      it('should validate phone number field', () => {
        const invalidPhone = { ...baseValidData, phoneNumber: '123' };
        const errors = validateStudent(invalidPhone);
        
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe('phoneNumber');
        expect(errors[0].message).toBe('Please provide a valid 10-digit phone number');
      });

      it('should validate GPA field', () => {
        const invalidGPA = { ...baseValidData, gpa: 5.0 };
        const errors = validateStudent(invalidGPA);
        
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe('gpa');
        expect(errors[0].message).toBe('GPA must be between 0.0 and 4.0');
      });

      it('should validate graduation year field', () => {
        const invalidYear = { ...baseValidData, graduationYear: 1900 };
        const errors = validateStudent(invalidYear);
        
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe('graduationYear');
        expect(errors[0].message).toBe('Please provide a valid graduation year');
      });
    });

    /**
     * Test optional field validations
     */
    describe('optional field validation', () => {
      const baseValidData = {
        name: 'John Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        gpa: 3.8,
        graduationYear: new Date().getFullYear() + 1,
      };

      it('should validate latitude when provided', () => {
        const invalidLatitude = { ...baseValidData, latitude: 95 }; // > 90
        const errors = validateStudent(invalidLatitude);
        
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe('latitude');
        expect(errors[0].message).toBe('Latitude must be between -90 and 90');
      });

      it('should validate longitude when provided', () => {
        const invalidLongitude = { ...baseValidData, longitude: 185 }; // > 180
        const errors = validateStudent(invalidLongitude);
        
        expect(errors).toHaveLength(1);
        expect(errors[0].field).toBe('longitude');
        expect(errors[0].message).toBe('Longitude must be between -180 and 180');
      });

      it('should not validate optional fields when not provided', () => {
        const validWithoutOptional = baseValidData;
        const errors = validateStudent(validWithoutOptional);
        
        expect(errors).toEqual([]);
      });
    });
  });
}); 