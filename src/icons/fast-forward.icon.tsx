import React from 'react';

type P = {
  fill?: string;
};

export const FastForwardIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="m4 18 8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
  </svg>
);
