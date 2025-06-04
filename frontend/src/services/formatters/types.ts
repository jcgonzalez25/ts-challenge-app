// Formatter types and interfaces
export interface FieldFormatter<T = any> {
  format: (value: string, currentValue?: T) => T;
  display: (value: T) => string;
}

export type FormatterType = 'text' | 'number' | 'decimal' | 'integer' | 'phone' | 'email';

export type FormFormattersSchema<T extends Record<string, any>> = {
  [K in keyof T]?: FormatterType;
}; 