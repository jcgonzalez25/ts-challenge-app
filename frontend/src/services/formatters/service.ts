/**
 * @fileoverview FormatterService and utility functions
 * @description Main service class for managing field formatters and automatic type detection
 */

import { FieldFormatter, FormatterType } from './types';
import {
  textFormatter,
  numberFormatter,
  decimalFormatter,
  integerFormatter,
  phoneFormatter,
  emailFormatter,
} from './formatters';

/**
 * Registry mapping formatter types to their implementations
 * @description Central registry for all available formatters
 */
export const formatters: Record<FormatterType, FieldFormatter> = {
  text: textFormatter,
  number: numberFormatter,
  decimal: decimalFormatter,
  integer: integerFormatter,
  phone: phoneFormatter,
  email: emailFormatter,
};

/**
 * Main service class for field formatting operations
 * @description Provides static methods for formatting values and accessing formatters
 * @example
 * ```typescript
 * // Format a value
 * const formatted = FormatterService.format("123.456", "decimal");
 * 
 * // Display a value
 * const displayed = FormatterService.display(123.45, "decimal");
 * 
 * // Get a formatter instance
 * const formatter = FormatterService.getFormatter("phone");
 * ```
 */
export class FormatterService {
  /**
   * Formats a string value using the specified formatter type
   * @template T The expected return type
   * @param value - The raw string value to format
   * @param formatterType - The type of formatter to use
   * @param currentValue - Optional current value for context
   * @returns The formatted value
   * @example
   * ```typescript
   * FormatterService.format("3.14159", "decimal"); // returns 3.14
   * FormatterService.format("", "number"); // returns NaN (empty state)
   * FormatterService.format("(123) 456-7890", "phone"); // returns "1234567890"
   * ```
   */
  static format<T>(value: string, formatterType: FormatterType, currentValue?: T): T {
    const formatter = formatters[formatterType];
    return formatter.format(value, currentValue);
  }

  /**
   * Displays a formatted value as a string for UI presentation
   * @template T The type of the value to display
   * @param value - The formatted value to display
   * @param formatterType - The formatter type to use for display
   * @returns String representation for input fields
   * @example
   * ```typescript
   * FormatterService.display(1234567890, "phone"); // returns "(123) 456-7890"
   * FormatterService.display(NaN, "number"); // returns ""
   * ```
   */
  static display<T>(value: T, formatterType: FormatterType): string {
    const formatter = formatters[formatterType];
    return formatter.display(value);
  }

  /**
   * Gets a specific formatter instance
   * @param formatterType - The type of formatter to retrieve
   * @returns The formatter implementation
   * @example
   * ```typescript
   * const phoneFormatter = FormatterService.getFormatter("phone");
   * const formatted = phoneFormatter.format("1234567890");
   * ```
   */
  static getFormatter(formatterType: FormatterType): FieldFormatter {
    return formatters[formatterType];
  }
}

/**
 * Maps HTML input types to appropriate formatter types
 * @param type - The HTML input type attribute
 * @returns The corresponding FormatterType
 * @example
 * ```typescript
 * getFormatterFromInputType("email"); // returns "email"
 * getFormatterFromInputType("tel"); // returns "phone"
 * getFormatterFromInputType("number"); // returns "number"
 * getFormatterFromInputType("text"); // returns "text"
 * ```
 */
export const getFormatterFromInputType = (type: string): FormatterType => {
  switch (type) {
    case 'email':
      return 'email';
    case 'tel':
      return 'phone';
    case 'number':
      return 'number';
    default:
      return 'text';
  }
}; 