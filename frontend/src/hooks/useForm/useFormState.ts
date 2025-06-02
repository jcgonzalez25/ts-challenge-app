import { useState, useMemo, useCallback } from 'react';
import { FormStateConfig, FieldError } from './types';

export function useFormState<T extends Record<string, any>>(config: FormStateConfig<T>) {
  const { initialValues, enableReinitialize } = config;

  // Core state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, FieldError>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Computed state
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  // Helper functions
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string | null) => {
    if (error) {
      setErrors(prev => ({
        ...prev,
        [field]: { message: error, type: 'server' },
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }));
  }, []);

  const setFormErrors = useCallback((newErrors: Partial<Record<keyof T, string>>) => {
    const errorMap: Partial<Record<keyof T, FieldError>> = {};
    Object.entries(newErrors).forEach(([field, message]) => {
      if (message) {
        errorMap[field as keyof T] = { message, type: 'server' };
      }
    });
    setErrors(errorMap);
  }, []);

  const setFormTouched = useCallback((newTouched: Partial<Record<keyof T, boolean>>) => {
    setTouched(prev => ({ ...prev, ...newTouched }));
  }, []);

  const resetForm = useCallback((newValues?: Partial<T>) => {
    const resetValues = newValues ? { ...initialValues, ...newValues } : initialValues;
    setValues(resetValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [initialValues]);

  const incrementSubmitCount = useCallback(() => {
    setSubmitCount(prev => prev + 1);
  }, []);

  const markAllTouched = useCallback(() => {
    const allTouched: Partial<Record<keyof T, boolean>> = {};
    Object.keys(values).forEach(key => {
      allTouched[key as keyof T] = true;
    });
    setTouched(allTouched);
  }, [values]);

  // Update errors with validation type
  const setValidationErrors = useCallback((
    errorsOrCallback: Partial<Record<keyof T, FieldError>> | ((prev: Partial<Record<keyof T, FieldError>>) => Partial<Record<keyof T, FieldError>>)
  ) => {
    if (typeof errorsOrCallback === 'function') {
      setErrors(errorsOrCallback);
    } else {
      setErrors(errorsOrCallback);
    }
  }, []);

  // Reinitialize when initialValues change (if enabled)
  useState(() => {
    if (enableReinitialize) {
      setValues(initialValues);
    }
  });

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isValid,
    isDirty,
    submitCount,

    // Setters
    setFieldValue,
    setFieldError,
    setFieldTouched,
    setValues: setFormValues,
    setErrors: setFormErrors,
    setTouched: setFormTouched,
    setSubmitting: setIsSubmitting,
    setValidating: setIsValidating,
    resetForm,

    // Internal helpers
    incrementSubmitCount,
    markAllTouched,
    setValidationErrors,
  };
} 