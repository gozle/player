import React from 'react';

type P = {
  fill?: string;
};

export const PauseIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="5" width="2" height="14" rx=".5" />
    <rect x="7" y="5" width="2" height="14" rx=".5" />
  </svg>
);
