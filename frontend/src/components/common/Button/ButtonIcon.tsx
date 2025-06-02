import React from 'react';
import { ButtonIconComponentProps } from './types';

export const ButtonIcon: React.FC<ButtonIconComponentProps> = ({
  children,
  className = ''
}) => {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
}; 