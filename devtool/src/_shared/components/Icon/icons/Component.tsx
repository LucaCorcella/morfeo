import React from 'react';
import { IconProps } from './props';

export const Component: React.FC<IconProps> = props => {
  return (
    <svg
      width="74"
      height="74"
      viewBox="0 0 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M64.75 49.3334V24.6667C64.7489 23.5853 64.4634 22.5232 63.9222 21.587C63.3811 20.6507 62.6032 19.8732 61.6667 19.3325L40.0833 6.99921C39.1459 6.45797 38.0825 6.17303 37 6.17303C35.9175 6.17303 34.8541 6.45797 33.9167 6.99921L12.3333 19.3325C11.3968 19.8732 10.6189 20.6507 10.0778 21.587C9.53657 22.5232 9.25111 23.5853 9.25 24.6667V49.3334C9.25111 50.4148 9.53657 51.4769 10.0778 52.4131C10.6189 53.3494 11.3968 54.1268 12.3333 54.6675L33.9167 67.0009C34.8541 67.5421 35.9175 67.8271 37 67.8271C38.0825 67.8271 39.1459 67.5421 40.0833 67.0009L61.6667 54.6675C62.6032 54.1268 63.3811 53.3494 63.9222 52.4131C64.4634 51.4769 64.7489 50.4148 64.75 49.3334Z"
        stroke={props.stroke}
        strokeWidth="6.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0825 21.46L37 37.0309L63.9175 21.46"
        stroke={props.stroke}
        strokeWidth="6.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 68.08V37"
        stroke={props.stroke}
        strokeWidth="6.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
