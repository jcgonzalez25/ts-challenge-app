import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string | number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const InfoField: React.FC<InfoFieldProps> = ({ 
  label, 
  value, 
  className = '', 
  size = 'sm' 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <p className={`text-gray-600 ${sizeClasses[size]} ${className}`}>
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
};

export default InfoField; 