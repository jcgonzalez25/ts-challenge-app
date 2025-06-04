/**
 * @fileoverview Display formatting utilities
 * @description Contains utility functions for formatting data for display purposes
 */

/**
 * GPA formatter for student display
 * @description Safely formats GPA values to 2 decimal places with fallback
 * @example
 * ```typescript
 * formatStudentGPA("3.14159") // returns "3.14"
 * formatStudentGPA(3.9) // returns "3.90"
 * formatStudentGPA("invalid") // returns "0.00"
 * ```
 */
export const formatStudentGPA = (gpa: number | string | undefined): string => {
  const numericGPA = typeof gpa === 'string' ? parseFloat(gpa) : gpa;
  return !isNaN(Number(numericGPA)) ? Number(numericGPA).toFixed(2) : '0.00';
};

/**
 * Coordinate formatter for student location display
 * @description Safely formats latitude/longitude to 4 decimal places with fallback
 * @example
 * ```typescript
 * formatCoordinate("40.7128") // returns "40.7128"
 * formatCoordinate(40.7128) // returns "40.7128"
 * formatCoordinate("invalid") // returns "0.0000"
 * ```
 */
export const formatCoordinate = (coord: number | string | undefined): string => {
  const numericCoord = typeof coord === 'string' ? parseFloat(coord) : coord;
  return !isNaN(Number(numericCoord)) ? Number(numericCoord).toFixed(4) : '0.0000';
};

/**
 * Location formatter for student city/state display
 * @description Combines city and state with proper comma separation
 * @example
 * ```typescript
 * formatLocation("New York", "NY") // returns "New York, NY"
 * formatLocation("", "NY") // returns "NY"
 * formatLocation("New York", "") // returns "New York"
 * formatLocation("", "") // returns ""
 * ```
 */
export const formatLocation = (city?: string, state?: string): string => {
  return [city, state].filter(Boolean).join(', ');
};

/**
 * Phone number formatter for display
 * @description Formats phone numbers for display only (not for input)
 * @example
 * ```typescript
 * formatPhoneDisplay("1234567890") // returns "(123) 456-7890"
 * formatPhoneDisplay("123456") // returns "123456" (invalid format, returns as-is)
 * ```
 */
export const formatPhoneDisplay = (phone: string): string => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone; // Return as-is if not 10 digits
};

/**
 * Date formatter with multiple format options
 * @description Formats dates for display with various options
 * @example
 * ```typescript
 * formatDate("2023-12-25", "short") // returns "12/25/2023"
 * formatDate("2023-12-25", "long") // returns "December 25, 2023"
 * formatDate("2023-12-25", "iso") // returns "2023-12-25"
 * ```
 */
export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' | 'iso' = 'short'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'long':
      return dateObj.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'iso':
      return dateObj.toISOString().split('T')[0];
    case 'short':
    default:
      return dateObj.toLocaleDateString();
  }
}; 