import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`container mx-auto p-4 ${className}`}>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default PageLayout; 