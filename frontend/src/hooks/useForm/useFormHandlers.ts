import { useCallback } from 'react';
import { FormHelpers, FieldError } from './types';
import { useFormValidation } from './useFormValidation';
import { FormatterService, getFormatterFromInputType, FormFormattersSchema } from '../../services/formatters';

interface UseFormHandlersConfig<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, FieldError>>;
  touched: Partial<Record<keyof T, boolean>>;
  formatters?: FormFormattersSchema<T>;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldTouched: (field: keyof T, touched?: boolean) => void;
  setValidationErrors: (errorsOrCallback: Partial<Record<keyof T, FieldError>> | ((prev: Partial<Record<keyof T, FieldError>>) => Partial<Record<keyof T, FieldError>>)) => void;
  markAllTouched: () => void;
  incrementSubmitCount: () => void;
  setSubmitting: (submitting: boolean) => void;
  validation: ReturnType<typeof useFormValidation<T>>;
  onSubmit?: (values: T, formHelpers: FormHelpers<T>) => Promise<void> | void;
  formHelpers: FormHelpers<T>;
}

export function useFormHandlers<T extends Record<string, any>>(config: UseFormHandlersConfig<T>) {
  const {
    values,
    errors,
    touched,
    formatters,
    setFieldValue,
    setFieldTouched,
    setValidationErrors,
    markAllTouched,
    incrementSubmitCount,
    setSubmitting,
    validation,
    onSubmit,
    formHelpers,
  } = config;

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const field = name as keyof T;
    
    const formatterType = formatters?.[field] || getFormatterFromInputType(type);
    const fieldValue = FormatterService.format(value, formatterType, values[field]);
    
    setFieldValue(field, fieldValue);
    validation.validateOnChangeIfEnabled(field, setValidationErrors);
  }, [values, formatters, setFieldValue, validation, setValidationErrors]);

  // Handle input blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const field = name as keyof T;
    
    setFieldTouched(field, true);
    validation.validateOnBlurIfEnabled(field, setValidationErrors);
  }, [setFieldTouched, validation, setValidationErrors]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    incrementSubmitCount();
    setSubmitting(true);

    try {
      // Mark all fields as touched
      markAllTouched();

      // Validate form if validation is enabled
      const isFormValid = await validation.validateOnSubmitIfEnabled(
        (_validating: boolean) => {}, // We handle this in the state hook
        setValidationErrors
      );

      if (isFormValid && onSubmit) {
        await onSubmit(values, formHelpers);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  }, [
    values,
    incrementSubmitCount,
    setSubmitting,
    markAllTouched,
    validation,
    setValidationErrors,
    onSubmit,
    formHelpers,
  ]);

  // Get field props helper
  const getFieldProps = useCallback((field: keyof T) => ({
    name: String(field),
    value: values[field] ?? '',
    onChange: handleChange,
    onBlur: handleBlur,
  }), [values, handleChange, handleBlur]);

  // Get field meta helper
  const getFieldMeta = useCallback((field: keyof T) => ({
    error: errors[field]?.message,
    touched: touched[field] || false,
    invalid: !!errors[field],
  }), [errors, touched]);

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
    getFieldMeta,
  };
} 