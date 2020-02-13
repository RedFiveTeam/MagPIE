import * as React from 'react';
import theme from '../theme';

const pathD1 = "M9 15.5L23 7.15385V11H26V0L0 15.5L26 31V20H23V23.8462L9 15.5Z";
const pathD2 = "M19 13H30L32 12V13H39L41 12V19L39 18H32V19L30 18H19L15 15.5L19 13Z";

const TgtBackButtonVector = () => {
  return (
    <svg
      width="41"
      height="31"
      viewBox="0 0 41 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD1}
        fill={theme.color.backgroundAction}
      />
      <path
        d={pathD2}
        fill={theme.color.backgroundAction}
      />
    </svg>
  );
};

export default TgtBackButtonVector;
