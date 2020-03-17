import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';
import classNames from 'classnames';

const pathD = 'M2.28571 10L8 4.12698L13.7143 10L16 8.8254L8 0.603173L0 8.8254L2.28571 10Z';

interface MyProps {
  className?: string;
}

const IconShowLess = (props: MyProps) => {
  return (
    <div className={classNames(props.className, 'see-less')}>
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
    </div>
  );
};

export const StyledIconShowLess = styled(IconShowLess)`
   
   svg {
    :hover {
      filter: drop-shadow(0 0px 4px #FFFFFF);
    }
  }

`;
