import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger', isLoading?: boolean }> = ({ 
  children, variant = 'primary', className = '', isLoading, ...props 
}) => {
  const baseStyle = "px-4 py-3 rounded-xl font-medium transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-stone-800 text-stone-50 hover:bg-stone-700 shadow-md shadow-stone-200",
    secondary: "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 shadow-sm",
    ghost: "text-stone-500 hover:bg-stone-100 hover:text-stone-800",
    danger: "text-red-600 bg-red-50 hover:bg-red-100"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className} ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-stone-100 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}>
    {children}
  </div>
);

export const Tag: React.FC<{ label: string, color?: string }> = ({ label, color = 'bg-stone-100 text-stone-600' }) => (
  <span className={`text-xs px-2 py-1 rounded-full font-medium tracking-wide ${color}`}>
    {label}
  </span>
);

export const FadeIn: React.FC<{ children: React.ReactNode, delay?: number }> = ({ children, delay = 0 }) => (
  <div className="animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: `${delay}ms` }}>
    {children}
  </div>
);
