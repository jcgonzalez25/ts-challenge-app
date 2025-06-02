import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'danger' 
  | 'success'
  | 'warning'
  | 'ghost'
  | 'link'
  | 'outline';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonState = 'default' | 'loading' | 'disabled' | 'success' | 'error';

export interface ButtonIconProps {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
}

export interface ButtonVariantConfig {
  base: string;
  variant: Record<ButtonVariant, string>;
  size: Record<ButtonSize, string>;
  state: Record<ButtonState, string>;
}

export interface ButtonProps extends 
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
  ButtonIconProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string; // For link variant
  external?: boolean; // For external links
  className?: string;
}

export interface ButtonCompoundProps {
  Group: React.FC<ButtonGroupProps>;
  Icon: React.FC<ButtonIconComponentProps>;
}

export interface ButtonGroupProps {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export interface ButtonIconComponentProps {
  children: ReactNode;
  className?: string;
} 