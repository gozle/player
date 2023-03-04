import React from 'react';

type P = {
  fill?: string;
};

export const FullScreenExpandIcon = ({ fill }: P) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 8.88888V5.77777H8.11111"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 8.88888V5.77777H15.8889"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 15.1111V18.2222H15.8889"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 15.1111V18.2222H8.11111"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
