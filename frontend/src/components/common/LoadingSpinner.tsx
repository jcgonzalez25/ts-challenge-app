import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="flex justify-center items-center space-x-2">
        <div className={`${sizeClasses[size]} border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}></div>
        {message && <span className="text-gray-600">{message}</span>}
      </div>
    </div>
  );
};

export default LoadingSpinner; 