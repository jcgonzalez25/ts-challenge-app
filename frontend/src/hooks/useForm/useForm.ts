/**
 * @fileoverview Main useForm hook for form state management and validation
 * @description Provides a comprehensive form management solution with validation, formatting, and submission handling
 */

import { UseFormConfig, UseFormReturn, FormHelpers } from './types';
import { useFormState } from './useFormState';
import { useFormValidation } from './useFormValidation';
import { useFormHandlers } from './useFormHandlers';

/**
 * Custom hook for comprehensive form management
 * @template T The type of the form data object
 * @param config - Configuration object for form behavior
 * @returns Form state, helpers, and handlers
 * 
 * @example
 * ```typescript
 * interface LoginForm {
 *   email: string;
 *   password: string;
 * }
 * 
 * const form = useForm<LoginForm>({
 *   initialValues: { email: '', password: '' },
 *   validationSchema: {
 *     email: [required(), email()],
 *     password: [required(), minLength(8)]
 *   },
 *   formatters: {
 *     email: 'email'
 *   },
 *   onSubmit: async (values) => {
 *     await api.login(values);
 *   }
 * });
 * 
 * return (
 *   <form onSubmit={form.handleSubmit}>
 *     <input
 *       name="email"
 *       value={form.values.email}
 *       onChange={form.handleChange}
 *       onBlur={form.handleBlur}
 *     />
 *     {form.getFieldMeta('email').error && (
 *       <span>{form.getFieldMeta('email').error}</span>
 *     )}
 *   </form>
 * );
 * ```
 */
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
