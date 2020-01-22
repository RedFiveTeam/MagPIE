import * as React from 'react';
import theme from '../theme';

const pathD = 'M5 8L9.33013 0.5H0.669873L5 8Z';

const LowerSortButtonVector = () => {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fill={theme.color.fontLoading}
      />
    </svg>
  );
};

export default LowerSortButtonVector;

