import * as React from 'react';
import theme from '../theme';

const pathD = 'M7.5 0C3.85925 0 0.825112 2.59444 0.143737 6.03515H2.22565C2.86713 3.72195 4.98254 2.02149 7.5 ' +
  '2.02149C9.01336 2.02149 10.3809 2.63643 11.3709 3.62915L8.96485 6.03515H15V0L12.8027 2.19726C11.4457 0.839763 ' +
  '9.57123 0 7.5 0ZM0 8.96485V15L2.19726 12.8027C3.55433 14.1602 5.42878 15 7.5 15C11.1407 15 14.1749 12.4056 ' +
  '14.8563 8.96485H12.7744C12.1329 11.278 10.0175 12.9785 7.5 12.9785C5.98664 12.9785 4.61908 12.3636 3.62915 ' +
  '11.3709L6.03515 8.96485H0Z';

const RefreshButtonVector = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d={pathD}
        fill={theme.color.buttonInactive}
      />
    </svg>
  );
};

export default RefreshButtonVector;
