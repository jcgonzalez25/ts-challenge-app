/**
 * @fileoverview Individual formatter implementations
 * @description Contains concrete formatter strategies for different input types
 */

import { FieldFormatter } from './types';

/**
 * Text formatter that passes values through unchanged
 * @description Used for plain text inputs with no special formatting needs
 */
export const textFormatter: FieldFormatter<string> = {
  format: (value: string) => value,
  display: (value: string) => value || '',
};

/**
 * Number formatter with support for empty state clearing
 * @description Handles numeric inputs, uses NaN for empty state to allow field clearing
 * @example
 * ```typescript
 * numberFormatter.format("123.45") // returns 123.45
 * numberFormatter.format("") // returns NaN (displays as empty)
 * numberFormatter.format("invalid") // returns 0 (fallback)
 * ```
 */
export const numberFormatter: FieldFormatter<number> = {
  format: (value: string) => {
    if (value === '') return NaN; // Empty state for clearing
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  },
  display: (value: number) => {
    if (isNaN(value)) return '';
    return value.toString();
  },
};

/**
 * Decimal formatter that rounds to 2 decimal places
 * @description Specialized number formatter for currency, GPA, and other decimal values
 * @example
 * ```typescript
 * decimalFormatter.format("3.14159") // returns 3.14
 * decimalFormatter.format("3.999") // returns 4.00
 * ```
 */
export const decimalFormatter: FieldFormatter<number> = {
  format: (value: string) => {
    if (value === '') return NaN;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : Math.round(parsed * 100) / 100; // Round to 2 decimals
  },
  display: (value: number) => {
    if (isNaN(value)) return '';
    return value.toString();
  },
};

/**
 * Integer formatter that only accepts whole numbers
 * @description Used for year, count, and other integer-only fields
 * @example
 * ```typescript
 * integerFormatter.format("123.45") // returns 123
 * integerFormatter.format("2024") // returns 2024
 * ```
 */
export const integerFormatter: FieldFormatter<number> = {
  format: (value: string) => {
    if (value === '') return NaN;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? 0 : parsed;
  },
  display: (value: number) => {
    if (isNaN(value)) return '';
    return Math.floor(value).toString();
  },
};

/**
 * Phone number formatter for US phone numbers
 * @description Stores only digits, displays in (###) ###-#### format
 * @example
 * ```typescript
 * phoneFormatter.format("(123) 456-7890") // returns "1234567890"
 * phoneFormatter.display("1234567890") // returns "(123) 456-7890"
 * ```
 */
export const phoneFormatter: FieldFormatter<string> = {
  format: (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    return digits;
  },
  display: (value: string) => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  },
};

/**
 * Email formatter for consistent email handling
 * @description Normalizes email addresses by converting to lowercase and trimming whitespace
 * @example
 * ```typescript
 * emailFormatter.format("  John.Doe@EXAMPLE.COM  ") // returns "john.doe@example.com"
 * ```
 */
export const emailFormatter: FieldFormatter<string> = {
  format: (value: string) => value.toLowerCase().trim(),
  display: (value: string) => value || '',
}; 