import React from 'react';
import { IconProps } from '../types';

export const Icon: React.FC<IconProps> = ({ name, className = "", fill = false }) => {
  return (
    <span 
      className={`material-symbols-outlined ${fill ? 'fill-1' : ''} ${className}`}
    >
      {name}
    </span>
  );
};