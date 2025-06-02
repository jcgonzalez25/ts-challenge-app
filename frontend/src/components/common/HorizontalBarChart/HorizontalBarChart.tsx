import React from 'react';

interface HorizontalBarChartProps {
  data: Array<{
    label: string;
    value: number;
  }>;
  total: number;
  color: string;
  maxWidth?: number;
  className?: string;
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  total,
  color,
  maxWidth = 100,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {data.map(({ label, value }) => (
        <div key={label} className="flex justify-between items-center py-1">
          <span className="text-sm text-gray-600 truncate pr-2">{label}</span>
          <div className="flex items-center">
            <div 
              className={`h-4 rounded transition-all duration-300 mr-2 ${color}`}
              style={{ 
                width: `${total > 0 ? (value / total) * maxWidth : 0}px`, 
                maxWidth: `${maxWidth}px`,
                minWidth: value > 0 ? '4px' : '0px'
              }}
            />
            <span className="text-sm font-medium text-gray-900 w-8 text-right">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBarChart; 