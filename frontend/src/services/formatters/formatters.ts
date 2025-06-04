import { FieldFormatter } from './types';

// Individual formatter implementations
export const textFormatter: FieldFormatter<string> = {
  format: (value: string) => value,
  display: (value: string) => value || '',
};

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

export const emailFormatter: FieldFormatter<string> = {
  format: (value: string) => value.toLowerCase().trim(),
  display: (value: string) => value || '',
}; 