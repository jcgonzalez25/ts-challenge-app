import { forwardRef } from 'react';
import { FormFieldProps } from './types';
import { getFormFieldClasses } from './variants';

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({
  label,
  helpText,
  required = false,
  optional = false,
  variant = 'default',
  size = 'md',
  state = 'default',
  error,
  touched = false,
  className = '',
  labelClassName = '',
  inputClassName = '',
  errorClassName = '',
  helpClassName = '',
  id,
  name,
  ...props
}, ref) => {
  const hasError = touched && error;
  const fieldId = id || name || 'field';
  const helpTextId = `${fieldId}-help`;
  const errorId = `${fieldId}-error`;

  const classes = getFormFieldClasses(variant, size, state, !!hasError);

  // Build aria-describedby string
  const describedByIds: string[] = [];
  if (helpText && !hasError) describedByIds.push(helpTextId);
  if (hasError) describedByIds.push(errorId);
  const describedBy = describedByIds.length > 0 ? describedByIds.join(' ') : undefined;

  return (
    <div className={`${classes.container} ${className}`}>
      {label && (
        <label 
          htmlFor={fieldId} 
          className={`${classes.label} ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
          {optional && <span className="text-gray-400 ml-1">(optional)</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={fieldId}
        name={name}
        className={`${classes.input} ${inputClassName}`}
        aria-invalid={!!hasError}
        {...(describedBy && { 'aria-describedby': describedBy })}
        {...props}
      />
      
      {helpText && !hasError && (
        <p 
          id={helpTextId} 
          className={`${classes.helpText} ${helpClassName}`}
        >
          {helpText}
        </p>
      )}
      
      {hasError && (
        <p 
          id={errorId} 
          className={`${classes.errorText} ${errorClassName}`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField; 