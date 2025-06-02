import React from 'react';

interface EmptyStateProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  action,
  className = '',
}) => {
  return (
    <div className={`text-center py-8 text-gray-500 ${className}`}>
      {title && <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>}
      <p className="mb-4">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState; 