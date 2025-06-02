import { useCallback } from 'react';
import { ValidationError } from '../../types/api.types';
import { validateField, validateForm, FieldValidationRules } from '../../utils/validators';
import { FormValidationConfig, FieldError } from './types';

interface ValidationResult<T extends Record<string, any>> {
  isValid: boolean;
  errors: Partial<Record<keyof T, FieldError>>;
}

export function useFormValidation<T extends Record<string, any>>(config: FormValidationConfig<T>) {
  const { values, validationSchema, validateOnChange, validateOnBlur, validateOnSubmit } = config;

  // Validate a single field
  const validateFieldInternal = useCallback(async (field: keyof T): Promise<string | null> => {
    if (!validationSchema || !validationSchema[field]) {
      return null;
    }

    const fieldRules = validationSchema[field] as FieldValidationRules;
    const fieldErrors = validateField(values[field], fieldRules, values);
    
    return fieldErrors.length > 0 ? fieldErrors[0] : null;
  }, [values, validationSchema]);

  // Validate entire form
  const validateFormInternal = useCallback(async (setValidating: (validating: boolean) => void): Promise<ValidationResult<T>> => {
    if (!validationSchema) return { isValid: true, errors: {} };

    setValidating(true);
    try {
      const validationErrors = validateForm(values, validationSchema);
      
      const newErrors: Partial<Record<keyof T, FieldError>> = {};
      validationErrors.forEach((error: ValidationError) => {
        newErrors[error.field as keyof T] = {
          message: error.message,
          type: 'validation',
        };
      });

      return { isValid: validationErrors.length === 0, errors: newErrors };
    } finally {
      setValidating(false);
    }
  }, [values, validationSchema]);

  // Validate field on change if enabled
  const validateOnChangeIfEnabled = useCallback(async (
    field: keyof T,
    setValidationErrors: (errorsOrCallback: Partial<Record<keyof T, FieldError>> | ((prev: Partial<Record<keyof T, FieldError>>) => Partial<Record<keyof T, FieldError>>)) => void
  ) => {
    if (!validateOnChange) return;

    const error = await validateFieldInternal(field);
    setValidationErrors((prev: Partial<Record<keyof T, FieldError>>) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = { message: error, type: 'validation' };
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  }, [validateOnChange, validateFieldInternal]);

  // Validate field on blur if enabled
  const validateOnBlurIfEnabled = useCallback(async (
    field: keyof T,
    setValidationErrors: (errorsOrCallback: Partial<Record<keyof T, FieldError>> | ((prev: Partial<Record<keyof T, FieldError>>) => Partial<Record<keyof T, FieldError>>)) => void
  ) => {
    if (!validateOnBlur) return;

    const error = await validateFieldInternal(field);
    setValidationErrors((prev: Partial<Record<keyof T, FieldError>>) => {
      const newErrors = { ...prev };
      if (error) {
        newErrors[field] = { message: error, type: 'validation' };
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  }, [validateOnBlur, validateFieldInternal]);

  // Validate form on submit if enabled
  const validateOnSubmitIfEnabled = useCallback(async (
    setValidating: (validating: boolean) => void,
    setValidationErrors: (errorsOrCallback: Partial<Record<keyof T, FieldError>> | ((prev: Partial<Record<keyof T, FieldError>>) => Partial<Record<keyof T, FieldError>>)) => void
  ): Promise<boolean> => {
    if (!validateOnSubmit) return true;

    const result = await validateFormInternal(setValidating);
    setValidationErrors(result.errors);
    return result.isValid;
  }, [validateOnSubmit, validateFormInternal]);

  return {
    validateField: validateFieldInternal,
    validateForm: validateFormInternal,
    validateOnChangeIfEnabled,
    validateOnBlurIfEnabled,
    validateOnSubmitIfEnabled,
  };
} 