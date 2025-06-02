import { ValidationError } from '../types/api.types';

// Validation rule types
export type ValidationRule<T = any> = {
  validate: (value: T, formData?: Record<string, any>) => boolean;
  message: string;
};

export type FieldValidationRules<T = any> = ValidationRule<T>[];

export type FormValidationSchema<T extends Record<string, any>> = {
  [K in keyof T]?: FieldValidationRules<T[K]>;
};

// Common validation functions
export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value) && value !== null && value !== undefined;
  return value !== null && value !== undefined && value !== '';
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  // Accepts formats like: 123-456-7890, (123) 456-7890, 1234567890
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  const digits = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digits.length === 10;
};

export const isValidGPA = (gpa: number): boolean => {
  return gpa >= 0 && gpa <= 4.0;
};

export const isValidGraduationYear = (year: number): boolean => {
  const currentYear = new Date().getFullYear();
  return year >= currentYear - 10 && year <= currentYear + 10;
};

export const hasMinLength = (min: number) => (value: string): boolean => {
  return value.length >= min;
};

export const hasMaxLength = (max: number) => (value: string): boolean => {
  return value.length <= max;
};

export const isNumberInRange = (min: number, max: number) => (value: number): boolean => {
  return value >= min && value <= max;
};

export const matchesPattern = (pattern: RegExp) => (value: string): boolean => {
  return pattern.test(value);
};

// Common validation rule builders
export const required = (message = 'This field is required'): ValidationRule => ({
  validate: isRequired,
  message,
});

export const email = (message = 'Please enter a valid email address'): ValidationRule => ({
  validate: isValidEmail,
  message,
});

export const phoneNumber = (message = 'Please enter a valid 10-digit phone number'): ValidationRule => ({
  validate: isValidPhoneNumber,
  message,
});

export const gpa = (message = 'GPA must be between 0.0 and 4.0'): ValidationRule => ({
  validate: isValidGPA,
  message,
});

export const graduationYear = (message = 'Please enter a valid graduation year'): ValidationRule => ({
  validate: isValidGraduationYear,
  message,
});

export const minLength = (min: number, message?: string): ValidationRule => ({
  validate: hasMinLength(min),
  message: message || `Must be at least ${min} characters long`,
});

export const maxLength = (max: number, message?: string): ValidationRule => ({
  validate: hasMaxLength(max),
  message: message || `Must be no more than ${max} characters long`,
});

export const numberRange = (min: number, max: number, message?: string): ValidationRule => ({
  validate: isNumberInRange(min, max),
  message: message || `Must be between ${min} and ${max}`,
});

export const pattern = (regex: RegExp, message: string): ValidationRule => ({
  validate: matchesPattern(regex),
  message,
});

// Custom validation rule creator
export const custom = <T = any>(
  validate: (value: T, formData?: Record<string, any>) => boolean,
  message: string
): ValidationRule<T> => ({
  validate,
  message,
});

// Validate a single field
export const validateField = <T = any>(
  value: T,
  rules: FieldValidationRules<T>,
  formData?: Record<string, any>
): string[] => {
  const errors: string[] = [];
  
  for (const rule of rules) {
    if (!rule.validate(value, formData)) {
      errors.push(rule.message);
    }
  }
  
  return errors;
};

// Validate entire form
export const validateForm = <T extends Record<string, any>>(
  formData: T,
  schema: FormValidationSchema<T>
): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  for (const [fieldName, rules] of Object.entries(schema) as [keyof T, FieldValidationRules][]) {
    if (!rules) continue;
    
    const fieldErrors = validateField(formData[fieldName], rules, formData);
    
    fieldErrors.forEach(message => {
      errors.push({
        field: String(fieldName),
        message,
      });
    });
  }
  
  return errors;
};

