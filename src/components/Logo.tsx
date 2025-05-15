
import React from 'react';

const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  // Size classes based on the size prop
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <svg 
          viewBox="0 0 100 100" 
          className={`text-interbantu-orange ${sizeClasses[size]}`} 
          fill="currentColor"
        >
          <path 
            d="M30,30 C40,30 50,40 60,40 C70,40 80,30 90,30 C80,40 80,50 70,60 C60,70 50,70 40,60 C30,50 20,40 30,30 Z" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="8"
            stroke="currentColor"
            fill="none"
          />
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-interbantu-burgundy font-bold text-lg leading-tight">
          Interbantu
        </span>
        <span className="text-interbantu-orange text-xs leading-tight">
          IBSTOCK
        </span>
      </div>
    </div>
  );
};

export default Logo;
