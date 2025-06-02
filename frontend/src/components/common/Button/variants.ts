import { ButtonVariantConfig } from './types';

export const buttonVariants: ButtonVariantConfig = {
  base: `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    active:scale-95
  `.replace(/\s+/g, ' ').trim(),

  variant: {
    primary: `
      bg-indigo-600 text-white
      hover:bg-indigo-700 focus:ring-indigo-500
      disabled:bg-indigo-400 disabled:hover:bg-indigo-400
      shadow-sm hover:shadow-md
    `.replace(/\s+/g, ' ').trim(),

    secondary: `
      bg-gray-100 text-gray-900 border border-gray-300
      hover:bg-gray-200 focus:ring-gray-500
      disabled:bg-gray-50 disabled:text-gray-400
    `.replace(/\s+/g, ' ').trim(),

    danger: `
      bg-red-600 text-white
      hover:bg-red-700 focus:ring-red-500
      disabled:bg-red-400 disabled:hover:bg-red-400
      shadow-sm hover:shadow-md
    `.replace(/\s+/g, ' ').trim(),

    success: `
      bg-green-600 text-white
      hover:bg-green-700 focus:ring-green-500
      disabled:bg-green-400 disabled:hover:bg-green-400
      shadow-sm hover:shadow-md
    `.replace(/\s+/g, ' ').trim(),

    warning: `
      bg-yellow-500 text-white
      hover:bg-yellow-600 focus:ring-yellow-500
      disabled:bg-yellow-400 disabled:hover:bg-yellow-400
      shadow-sm hover:shadow-md
    `.replace(/\s+/g, ' ').trim(),

    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 focus:ring-gray-500
      disabled:text-gray-400 disabled:hover:bg-transparent
    `.replace(/\s+/g, ' ').trim(),

    link: `
      bg-transparent text-indigo-600 underline-offset-4
      hover:underline focus:ring-indigo-500
      disabled:text-indigo-400 disabled:no-underline
      p-0 h-auto font-normal
    `.replace(/\s+/g, ' ').trim(),

    outline: `
      bg-transparent border-2 border-indigo-600 text-indigo-600
      hover:bg-indigo-600 hover:text-white focus:ring-indigo-500
      disabled:border-indigo-300 disabled:text-indigo-300
    `.replace(/\s+/g, ' ').trim(),
  },

  size: {
    xs: 'px-2 py-1 text-xs gap-1',
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    xl: 'px-8 py-4 text-lg gap-3',
  },

  state: {
    default: '',
    loading: 'cursor-wait',
    disabled: 'cursor-not-allowed opacity-50',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
  },
};

// Utility function to combine variant classes
export function getButtonClasses(
  variant: keyof typeof buttonVariants.variant = 'primary',
  size: keyof typeof buttonVariants.size = 'md',
  state: keyof typeof buttonVariants.state = 'default',
  fullWidth = false,
  className = ''
): string {
  const classes = [
    buttonVariants.base,
    buttonVariants.variant[variant],
    buttonVariants.size[size],
    buttonVariants.state[state],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return classes.replace(/\s+/g, ' ').trim();
} 