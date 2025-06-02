import React from 'react';
import { ButtonGroupProps } from './types';

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  className = ''
}) => {
  const groupClasses = [
    'inline-flex',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    orientation === 'horizontal' ? '[&>*:not(:first-child)]:ml-[-1px]' : '[&>*:not(:first-child)]:mt-[-1px]',
    '[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none',
    '[&>*:not(:first-child):not(:last-child)]:rounded-none',
    '[&>*]:focus:z-10 [&>*]:hover:z-10',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} role="group">
      {children}
    </div>
  );
}; 