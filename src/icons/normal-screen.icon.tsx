import React from 'react';

type P = {
  fill?: string;
};

export const NormalScreenIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <rect
      x="5"
      y="8"
      width="14"
      height="8"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
