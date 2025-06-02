import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { UseFormReturn } from '../../../hooks/useForm';

export type FormFieldVariant = 'default' | 'filled' | 'outlined' | 'minimal';
export type FormFieldSize = 'sm' | 'md' | 'lg';
export type FormFieldState = 'default' | 'error' | 'success' | 'warning';

export interface FormFieldBaseProps {
  label?: string;
  helpText?: string;
  required?: boolean;
  optional?: boolean;
  variant?: FormFieldVariant;
  size?: FormFieldSize;
  state?: FormFieldState;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  helpClassName?: string;
}

export interface FormFieldProps extends 
  FormFieldBaseProps,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  touched?: boolean;
}

export interface FormTextareaProps extends 
  FormFieldBaseProps,
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  error?: string;
  touched?: boolean;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export interface FormSelectProps extends 
  FormFieldBaseProps,
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  error?: string;
  touched?: boolean;
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
}

// Hook integration props
export interface FormFieldHookProps<T extends Record<string, any>> extends FormFieldBaseProps {
  form: UseFormReturn<T>;
  name: keyof T;
  type?: string;
  placeholder?: string;
  step?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
}

export interface FormTextareaHookProps<T extends Record<string, any>> extends FormFieldBaseProps {
  form: UseFormReturn<T>;
  name: keyof T;
  placeholder?: string;
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  disabled?: boolean;
}

export interface FormSelectHookProps<T extends Record<string, any>> extends FormFieldBaseProps {
  form: UseFormReturn<T>;
  name: keyof T;
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
  }>;
  placeholder?: string;
  disabled?: boolean;
}

export interface FormFieldVariantConfig {
  base: {
    container: string;
    label: string;
    input: string;
    helpText: string;
    errorText: string;
  };
  variant: Record<FormFieldVariant, {
    container: string;
    label: string;
    input: string;
  }>;
  size: Record<FormFieldSize, {
    label: string;
    input: string;
  }>;
  state: Record<FormFieldState, {
    input: string;
    label: string;
  }>;
} 