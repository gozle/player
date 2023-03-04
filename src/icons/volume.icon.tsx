import React from 'react';

type P = {
  fill?: string;
};

export const VolumeIcon = ({ fill }: P) => (
  <svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 14.5714V9.42857H6.85714L10.7143 6V18L6.85714 14.5714H3Z"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 9.42773C15.5382 10.1441 15.8571 11.0346 15.8571 11.9996C15.8571 12.9646 15.5382 13.8551 15 14.5714"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.4292 6.85742C19.5052 8.28998 20.1429 10.0707 20.1429 12.0003C20.1429 13.9299 19.5052 15.7106 18.4292 17.1431"
      strokeWidth="1.24"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
