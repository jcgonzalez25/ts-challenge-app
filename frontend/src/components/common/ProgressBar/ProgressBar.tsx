import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
  showPercentage?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  label, 
  value, 
  total, 
  color, 
  showPercentage = true,
  className = ''
}) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div className={`mb-3 ${className}`}>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>
          {value}
          {showPercentage && ` (${percentage.toFixed(1)}%)`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 