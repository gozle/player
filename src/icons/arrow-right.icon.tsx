import React from 'react';

type P = {
  fill?: string;
};

export const ArrowRightIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 18L15 12L9 6"
      strokeWidth="1.24444"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
