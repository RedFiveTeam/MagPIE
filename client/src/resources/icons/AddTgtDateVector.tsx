import * as React from 'react';
import theme from '../theme';

const pathD = 'M7 11V18H11V11H18V7H11V0H7V7H0V11H7Z';

const AddTgtDateVector = () => {
  return (
    <svg
      className="icon"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        fill={theme.color.fontAddDate}
      />
    </svg>
  );
};

export default AddTgtDateVector;


