import { UseFormConfig, UseFormReturn, FormHelpers } from './types';
import { useFormState } from './useFormState';
import { useFormValidation } from './useFormValidation';
import { useFormHandlers } from './useFormHandlers';

export function useForm<T extends Record<string, any>>(config: UseFormConfig<T>): UseFormReturn<T> {
  const {
    initialValues,
    validationSchema,
    formatters,
    validateOnChange = false,
    validateOnBlur = true,
    validateOnSubmit = true,
    onSubmit,
    enableReinitialize = false,
  } = config;

  // Form state management
  const formState = useFormState<T>({
    initialValues,
    enableReinitialize,
  });

  // Form validation
  const validation = useFormValidation<T>({
    values: formState.values,
    validationSchema,
    validateOnChange,
    validateOnBlur,
    validateOnSubmit,
  });

  // Create form helpers object
  const formHelpers: FormHelpers<T> = {
    setFieldValue: formState.setFieldValue,
    setFieldError: formState.setFieldError,
    setFieldTouched: formState.setFieldTouched,
    setValues: formState.setValues,
    setErrors: formState.setErrors,
    setTouched: formState.setTouched,
    resetForm: formState.resetForm,
    validateField: validation.validateField,
    validateForm: (setValidating = formState.setValidating) => 
      validation.validateForm(setValidating).then(result => result.isValid),
    setSubmitting: formState.setSubmitting,
  };

  // Form handlers
  const handlers = useFormHandlers<T>({
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    formatters,
    setFieldValue: formState.setFieldValue,
    setFieldTouched: formState.setFieldTouched,
    setValidationErrors: formState.setValidationErrors,
    markAllTouched: formState.markAllTouched,
    incrementSubmitCount: formState.incrementSubmitCount,
    setSubmitting: formState.setSubmitting,
    validation,
    onSubmit,
    formHelpers,
  });

  return {
    // State
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isSubmitting: formState.isSubmitting,
    isValidating: formState.isValidating,
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    submitCount: formState.submitCount,
    
    // Helpers
    setFieldValue: formState.setFieldValue,
    setFieldError: formState.setFieldError,
    setFieldTouched: formState.setFieldTouched,
    setValues: formState.setValues,
    setErrors: formState.setErrors,
    setTouched: formState.setTouched,
    resetForm: formState.resetForm,
    validateField: validation.validateField,
    validateForm: formHelpers.validateForm,
    setSubmitting: formState.setSubmitting,
    
    // Handlers
    handleChange: handlers.handleChange,
    handleBlur: handlers.handleBlur,
    handleSubmit: handlers.handleSubmit,
    getFieldProps: handlers.getFieldProps,
    getFieldMeta: handlers.getFieldMeta,
  };
}

// Re-export types for convenience
export type {
  UseFormConfig,
  UseFormReturn,
  FormHelpers,
  FormHandlers,
  FormState,
  FieldError,
} from './types';
