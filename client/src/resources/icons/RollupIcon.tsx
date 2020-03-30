import * as React from 'react';
import styled from 'styled-components';

const pathD = 'M12.3332 24C18.6932 24 23.849 18.6274 23.849 12C23.849 5.37258 18.6932 0 12.3332 0C5.97319 0 0.817383' +
  ' 5.37258 0.817383 12C0.817383 18.6274 5.97319 24 12.3332 24ZM7.1308 3H16.2222V4.63636H7.1308V16.0909H5.61556V4.63' +
  '636C5.61556 3.73636 6.29742 3 7.1308 3ZM20.0103 11.1818L15.4646 6.27273H10.1613C9.3279 6.27273 8.65362 7.00909 8.' +
  '65362 7.90909L8.64604 19.3636C8.64604 20.2636 9.32032 21 10.1537 21H18.4951C19.3285 21 20.0103 20.2636 20.0103 19' +
  '.3636V11.1818ZM18.8739 12H14.707V7.5L18.8739 12Z';

const RollupIcon = () => {
  return (
    <Wrapper>
      <svg
        className={"icon"}
        width={"24"}
        height={"24"}
        viewBox={"0 0 24 24"}
        fill={"none"}
        xmlns={"http://www.w3.org/2000/svg"}
      >
        <path
          d={pathD}
          fillRule={"evenodd"}
          clipRule={"evenodd"}
          fill={"white"}
        />
      </svg>
    </Wrapper>
  );
};

export default RollupIcon;

const Wrapper = styled('div')`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
`;
