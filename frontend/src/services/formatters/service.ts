import { FieldFormatter, FormatterType } from './types';
import {
  textFormatter,
  numberFormatter,
  decimalFormatter,
  integerFormatter,
  phoneFormatter,
  emailFormatter,
} from './formatters';

// Formatter registry
export const formatters: Record<FormatterType, FieldFormatter> = {
  text: textFormatter,
  number: numberFormatter,
  decimal: decimalFormatter,
  integer: integerFormatter,
  phone: phoneFormatter,
  email: emailFormatter,
};

// Formatter service
export class FormatterService {
  static format<T>(value: string, formatterType: FormatterType, currentValue?: T): T {
    const formatter = formatters[formatterType];
    return formatter.format(value, currentValue);
  }

  static display<T>(value: T, formatterType: FormatterType): string {
    const formatter = formatters[formatterType];
    return formatter.display(value);
  }

  static getFormatter(formatterType: FormatterType): FieldFormatter {
    return formatters[formatterType];
  }
}

// Helper to get formatter type from HTML input type
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