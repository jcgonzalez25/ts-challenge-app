import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
}) => {
  const baseClasses = 'border rounded-md shadow-sm';
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow' : '';
  
  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const combinedClasses = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

export default Card; 