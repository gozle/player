import React from 'react';

type P = {
  fill?: string;
};

export const MuteIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 14.5714V9.42857H6.85714L10.7143 6V18L6.85714 14.5714H3Z"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5713 9L14.5713 15"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5713 9L20.5713 15"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
