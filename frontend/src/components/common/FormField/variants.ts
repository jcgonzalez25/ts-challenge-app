import { FormFieldVariantConfig } from './types';

export const formFieldVariants: FormFieldVariantConfig = {
  base: {
    container: 'space-y-1',
    label: 'block font-medium text-gray-700',
    input: `
      block w-full rounded-md shadow-sm
      transition-colors duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-0
      disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
    `.replace(/\s+/g, ' ').trim(),
    helpText: 'text-gray-500',
    errorText: 'text-red-600',
  },

  variant: {
    default: {
      container: '',
      label: '',
      input: `
        border-gray-300 
        focus:border-indigo-500 focus:ring-indigo-500
        placeholder:text-gray-400
      `.replace(/\s+/g, ' ').trim(),
    },

    filled: {
      container: '',
      label: '',
      input: `
        border-0 bg-gray-100
        focus:bg-white focus:ring-indigo-500
        placeholder:text-gray-500
      `.replace(/\s+/g, ' ').trim(),
    },

    outlined: {
      container: '',
      label: '',
      input: `
        border-2 border-gray-200 bg-transparent
        focus:border-indigo-500 focus:ring-indigo-500
        placeholder:text-gray-400
      `.replace(/\s+/g, ' ').trim(),
    },

    minimal: {
      container: '',
      label: '',
      input: `
        border-0 border-b-2 border-gray-200 bg-transparent rounded-none
        focus:border-indigo-500 focus:ring-0 focus:shadow-none
        placeholder:text-gray-400
      `.replace(/\s+/g, ' ').trim(),
    },
  },

  size: {
    sm: {
      label: 'text-sm',
      input: 'px-3 py-1.5 text-sm',
    },
    md: {
      label: 'text-sm',
      input: 'px-3 py-2 text-sm',
    },
    lg: {
      label: 'text-base',
      input: 'px-4 py-3 text-base',
    },
  },

  state: {
    default: {
      input: '',
      label: '',
    },
    error: {
      input: 'border-red-300 focus:border-red-500 focus:ring-red-500',
      label: 'text-red-700',
    },
    success: {
      input: 'border-green-300 focus:border-green-500 focus:ring-green-500',
      label: 'text-green-700',
    },
    warning: {
      input: 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500',
      label: 'text-yellow-700',
    },
  },
};

// Utility function to get field classes
export function getFormFieldClasses(
  variant: keyof typeof formFieldVariants.variant = 'default',
  size: keyof typeof formFieldVariants.size = 'md',
  state: keyof typeof formFieldVariants.state = 'default',
  hasError = false
) {
  const currentState = hasError ? 'error' : state;
  
  return {
    container: [
      formFieldVariants.base.container,
      formFieldVariants.variant[variant].container,
    ].filter(Boolean).join(' '),

    label: [
      formFieldVariants.base.label,
      formFieldVariants.size[size].label,
      formFieldVariants.variant[variant].label,
      formFieldVariants.state[currentState].label,
    ].filter(Boolean).join(' '),

    input: [
      formFieldVariants.base.input,
      formFieldVariants.variant[variant].input,
      formFieldVariants.size[size].input,
      formFieldVariants.state[currentState].input,
    ].filter(Boolean).join(' '),

    helpText: [
      formFieldVariants.base.helpText,
      formFieldVariants.size[size].label, // Use same size as label
    ].filter(Boolean).join(' '),

    errorText: [
      formFieldVariants.base.errorText,
      formFieldVariants.size[size].label, // Use same size as label
    ].filter(Boolean).join(' '),
  };
} 