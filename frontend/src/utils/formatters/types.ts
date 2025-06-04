/**
 * @fileoverview Type definitions for the FormatterService
 * @description Provides interfaces and types for input field formatting strategies
 */

/**
 * Interface for field formatters that handle input transformation and display
 * @template T The type of the formatted value
 */
export interface FieldFormatter<T = any> {
  /**
   * Formats a raw string input value into the appropriate type
   * @param value - The raw string value from the input field
   * @param currentValue - The current formatted value (optional)
   * @returns The formatted value of type T
   * @example
   * ```typescript
   * const formatter = numberFormatter;
   * formatter.format("123.45") // returns 123.45
   * formatter.format("") // returns NaN (for empty state)
   * ```
   */
  format: (value: string, currentValue?: T) => T;
  
  /**
   * Displays a formatted value as a string for UI presentation
   * @param value - The formatted value to display
   * @returns String representation for display in input fields
   * @example
   * ```typescript
   * const formatter = numberFormatter;
   * formatter.display(123.45) // returns "123.45"
   * formatter.display(NaN) // returns "" (empty string)
   * ```
   */
  display: (value: T) => string;
}

/**
 * Available formatter types for different input field scenarios
 * @description Each type corresponds to a specific formatting strategy
 */
export type FormatterType = 
  | 'text'      // Plain text, no formatting
  | 'number'    // Numeric values with NaN support for empty state
  | 'decimal'   // Numbers rounded to 2 decimal places
  | 'integer'   // Whole numbers only
  | 'phone'     // Phone number formatting (###) ###-####
  | 'email';    // Email normalization (lowercase, trim)

/**
 * Configuration schema for specifying formatters per form field
 * @template T The form data type
 * @example
 * ```typescript
 * const formatters: FormFormattersSchema<StudentForm> = {
 *   gpa: 'decimal',
 *   phoneNumber: 'phone',
 *   email: 'email'
 * };
 * ```
 */
export type FormFormattersSchema<T extends Record<string, any>> = {
  [K in keyof T]?: FormatterType;
}; 