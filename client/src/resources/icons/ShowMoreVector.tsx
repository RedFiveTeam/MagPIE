import * as React from 'react';
import theme from '../theme';

const pathD = 'M2.28571 0.600098L8 6.47311L13.7143 0.600098L16 1.7747L8 9.99692L0 1.7747L2.28571 0.600098Z';

const IconShowMore = () => {
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

export default IconShowMore;


