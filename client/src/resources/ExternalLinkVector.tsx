import * as React from 'react';
import theme from '../styles/theme';

const pathD = 'M10 10H0L5 17L10 10ZM0 7H10L5 0L0 7Z';

const IconExternalLink = () => {
  return (
    <svg
      className="icon"
      width="10"
      height="17"
      viewBox="0 0 10 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fill={theme.color.fontPrimary}
      />
    </svg>
  );
};

export default IconExternalLink;


