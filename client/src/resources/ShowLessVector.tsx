import * as React from 'react';
import theme from '../styles/theme';

const pathD = 'M2.28571 10L8 4.12698L13.7143 10L16 8.8254L8 0.603173L0 8.8254L2.28571 10Z';

const IconShowLess = () => {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d={pathD}
        fill={theme.color.fontPrimary}
      />
    </svg>
  );
};

export default IconShowLess;


