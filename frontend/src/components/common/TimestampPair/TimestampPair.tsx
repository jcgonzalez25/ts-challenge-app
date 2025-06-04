import React from 'react';

interface TimestampPairProps {
  createdAt: string | Date;
  updatedAt: string | Date;
  createdLabel?: string;
  updatedLabel?: string;
  className?: string;
  dateFormat?: 'short' | 'long' | 'iso';
}

const TimestampPair: React.FC<TimestampPairProps> = ({
  createdAt,
  updatedAt,
  createdLabel = 'Created',
  updatedLabel = 'Updated',
  className = '',
  dateFormat = 'short',
}) => {
  const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    switch (dateFormat) {
      case 'long':
        return dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'iso':
        return dateObj.toISOString().split('T')[0];
      case 'short':
      default:
        return dateObj.toLocaleDateString();
    }
  };

  return (
    <div className={`flex flex-wrap gap-4 text-xs text-gray-500 ${className}`}>
      <span>
        <span className="font-medium">{createdLabel}:</span> {formatDate(createdAt)}
      </span>
      <span>
        <span className="font-medium">{updatedLabel}:</span> {formatDate(updatedAt)}
      </span>
    </div>
  );
};

export default TimestampPair; 