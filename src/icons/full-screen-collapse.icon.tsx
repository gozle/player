import React from 'react';

type P = {
  fill?: string;
};

export const FullScreenCollapseIcon = ({ fill }: P) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.11111 5.77734V8.88845H5"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M15.8889 5.77734V8.88845H19"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M15.8889 18.2227V15.1115H19"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M8.11111 18.2227V15.1115H5"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
