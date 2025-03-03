"use client"
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const VARIANTS = {
  primary: {
    base: 'border-b-4',
    default: 'bg-green-400 hover:bg-green-500 border-green-500 hover:border-green-600',
    disabled: 'bg-gray-600 border-gray-700',
  },
  secondary: {
    base: 'border-b-4',
    default: 'bg-yellow-400 hover:bg-yellow-500 border-yellow-500 hover:border-yellow-600',
    disabled: 'bg-gray-600 border-gray-700',
  },
  dropdown: {
    base: 'border-2',
    default: 'bg-white/10 hover:bg-white/15 border-white/20',
    disabled: 'bg-white/10 border-white/10',
  },
  ghost: {
    base: '',
    default: 'bg-white/10 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10',
    disabled: 'bg-gray-600',
  },
};

const Button = ({ 
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  className = '',
  icon,
  isFullWidth = false,
  showCaret = false,
  isCaretOpen = false,
  isHidden = false,
}) => {
  // Base animation settings
  const baseAnimation = {
    whileHover: disabled ? {} : { scale: 1.05 },
    whileTap: disabled ? {} : { scale: 0.95 },
  };

  return (
    <motion.button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={cn(
        // Base styles - these can be overridden by variant styles
        'flex items-center justify-center gap-2',
        'px-2 py-1 rounded-xl',
        'text-white font-bold',
        'shadow-lg transform transition-all duration-200',
        
        // Variant base styles
        VARIANTS[variant].base,
        
        // Variant conditional styles
        disabled ? VARIANTS[variant].disabled : VARIANTS[variant].default,
        
        // State styles
        {
          'opacity-50 cursor-not-allowed': disabled,
          'w-full': isFullWidth,
          'hidden md:flex': isHidden,
        },
        
        // Custom classes - these will override any conflicting classes above
        className
      )}
      {...baseAnimation}
    >
      {icon && (
        <span className={cn(
          "w-5 h-5",
          // Allow icon size to be customized through className on the Button
          className?.includes('w-') && className?.match(/w-\[.*?\]|w-\d+/)?.[0],
          className?.includes('h-') && className?.match(/h-\[.*?\]|h-\d+/)?.[0]
        )}>
          {icon}
        </span>
      )}
      {children}
      {showCaret && (
        <motion.span
          animate={{ rotate: isCaretOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "stroke-current",
              // Allow SVG customization through className
              className?.includes('w-') && className?.match(/w-\[.*?\]|w-\d+/)?.[0],
              className?.includes('h-') && className?.match(/h-\[.*?\]|h-\d+/)?.[0]
            )}
          >
            <path
              d="M7 10L12 15L17 10"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      )}
    </motion.button>
  );
};

export default Button; 