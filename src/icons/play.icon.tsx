import React from 'react';

type P = {
  fill?: string;
};

export const PlayIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 5v14l10-7L8 5Z"
      stroke="white"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
