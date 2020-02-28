import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';

const pathD = "M16.2 9H19.8V16.2H27V19.8H19.8V27H16.2V19.8H9V16.2H16.2V9ZM18 0C27.936 0 36 8.064 36 18C36 27.936 " +
  "27.936 36 18 36C8.064 36 0 27.936 0 18C0 8.064 8.064 0 18 0ZM18 32.4C25.938 32.4 32.4 25.938 32.4 18C32.4 10.062 " +
  "25.938 3.6 18 3.6C10.062 3.6 3.6 10.062 3.6 18C3.6 25.938 10.062 32.4 18 32.4Z";

interface MyProps {
  className?: string;
}

const TgtPageButtonVector = (props: MyProps) => {
  return (
    <div className={props.className}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={pathD}
          fill={theme.color.buttonInactive}
        />
      </svg>
    </div>
  );
};

export const StyledTgtPageButtonVector = styled(TgtPageButtonVector)`
svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transform: matrix(-1, 0, 0, 1, 0, 0);
  
    :hover {
      filter: drop-shadow(0 0px 4px #FFFFFF);
    }
  }
`;

export default TgtPageButtonVector;
