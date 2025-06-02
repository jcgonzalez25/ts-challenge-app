import { forwardRef } from 'react';
import { ButtonProps } from './types';
import { getButtonClasses } from './variants';
import { ButtonGroup } from './ButtonGroup';
import { ButtonIcon } from './ButtonIcon';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  state = 'default',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  iconOnly = false,
  href,
  external = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;
  const currentState = isLoading ? 'loading' : (isDisabled ? 'disabled' : state);
  
  const buttonClasses = getButtonClasses(variant, size, currentState, fullWidth, className);

  const content = (
    <>
      {isLoading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && icon && iconPosition === 'left' && (
        <ButtonIcon className={iconOnly ? '' : 'mr-2'}>{icon}</ButtonIcon>
      )}
      
      {!iconOnly && children}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <ButtonIcon className={iconOnly ? '' : 'ml-2'}>{icon}</ButtonIcon>
      )}
    </>
  );

  // Render as link for href prop or link variant
  if (href || variant === 'link') {
    return (
      <a
        href={href || '#'}
        className={buttonClasses}
        onClick={onClick as any}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={buttonClasses}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

// Compound components
const ButtonWithCompounds = Object.assign(Button, {
  Group: ButtonGroup,
  Icon: ButtonIcon,
});

export default ButtonWithCompounds; 