import { FormValidationSchema } from '../../utils/validators';
import { FormFormattersSchema } from '../../utils/formatters';

export interface FieldError {
  message: string;
  type: 'validation' | 'server';
}

export interface FormState<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, FieldError>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValidating: boolean;
  isValid: boolean;
  isDirty: boolean;
  submitCount: number;
}

export interface FormHelpers<T extends Record<string, any>> {
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string | null) => void;
  setFieldTouched: (field: keyof T, touched?: boolean) => void;
  setValues: (values: Partial<T>) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setTouched: (touched: Partial<Record<keyof T, boolean>>) => void;
  resetForm: (newValues?: Partial<T>) => void;
  validateField: (field: keyof T) => Promise<string | null>;
  validateForm: () => Promise<boolean>;
  setSubmitting: (submitting: boolean) => void;
}

export interface FormHandlers<T extends Record<string, any>> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  getFieldProps: (field: keyof T) => {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  };
  getFieldMeta: (field: keyof T) => {
    error?: string;
    touched: boolean;
    invalid: boolean;
  };
}

export interface UseFormConfig<T extends Record<string, any>> {
  initialValues: T;
  validationSchema?: FormValidationSchema<T>;
  formatters?: FormFormattersSchema<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  onSubmit?: (values: T, formHelpers: FormHelpers<T>) => Promise<void> | void;
  enableReinitialize?: boolean;
}

export interface UseFormReturn<T extends Record<string, any>> 
  extends FormState<T>, FormHelpers<T>, FormHandlers<T> {}

export interface FormValidationConfig<T extends Record<string, any>> {
  values: T;
  validationSchema?: FormValidationSchema<T>;
  validateOnChange: boolean;
  validateOnBlur: boolean;
  validateOnSubmit: boolean;
}

export interface FormStateConfig<T extends Record<string, any>> {
  initialValues: T;
  enableReinitialize: boolean;
} 