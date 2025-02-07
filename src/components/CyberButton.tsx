import React from 'react';
import './CyberButton.css';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`cyber-button cyber-button-${variant} cyber-button-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CyberButton; 