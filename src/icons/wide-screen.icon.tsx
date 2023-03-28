import React from 'react';

type P = {
  fill?: string;
};

export const WideScreenIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
