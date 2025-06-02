import { ValidationError } from '../types/error.types';

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

export const formatPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
};

export const validateStudent = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters long'
    });
  }

  // Email validation
  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please provide a valid email address'
    });
  }

  // Phone validation
  if (!data.phoneNumber || !isValidPhoneNumber(data.phoneNumber)) {
    errors.push({
      field: 'phoneNumber',
      message: 'Please provide a valid 10-digit phone number'
    });
  }

  // GPA validation
  if (data.gpa === undefined || data.gpa === null || !isValidGPA(Number(data.gpa))) {
    errors.push({
      field: 'gpa',
      message: 'GPA must be between 0.0 and 4.0'
    });
  }

  // Graduation year validation
  if (!data.graduationYear || !isValidGraduationYear(Number(data.graduationYear))) {
    errors.push({
      field: 'graduationYear',
      message: 'Please provide a valid graduation year'
    });
  }

  // Optional fields validation
  if (data.latitude && (data.latitude < -90 || data.latitude > 90)) {
    errors.push({
      field: 'latitude',
      message: 'Latitude must be between -90 and 90'
    });
  }

  if (data.longitude && (data.longitude < -180 || data.longitude > 180)) {
    errors.push({
      field: 'longitude',
      message: 'Longitude must be between -180 and 180'
    });
  }

  return errors;
};