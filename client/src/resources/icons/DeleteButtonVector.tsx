import * as React from 'react';
import theme from '../theme';
import styled from 'styled-components';
import { crayonBox } from '../crayonBox';

const pathD1 = "M4.41644 30H21.5836C22.052 30 22.4415 29.6228 22.4775 29.1344L24.2069 5.62513H25.1034C25.5986 5.62513" +
  " 26 5.20539 26 4.68761C26 4.16983 25.5986 3.75009 25.1034 3.75009H18.631C18.2196 3.75009 17.861 3.4573 17.7613 " +
  "3.03995L17.2043 0.710139C17.1045 0.292785 16.7459 0 16.3345 0H9.66552C9.25412 0 8.89552 0.292786 8.79574 " +
  "0.71014L8.23874 3.03995C8.13896 3.4573 7.78036 3.75009 7.36896 3.75009H0.896552C0.4014 3.75009 0 4.16983 0 " +
  "4.68761C0 5.20539 0.4014 5.62513 0.896552 5.62513H1.7931L3.52253 29.1344C3.55846 29.6228 3.94796 30 4.41644 " +
  "30ZM9.86207 3.75009H16.1379L15.6897 1.87504H10.3103L9.86207 3.75009ZM5.37931 28.1257L3.58621 5.62513H22.4138L20." +
  "6207 28.1257H5.37931Z";
const pathD2 = "M13.8966 11.2503V22.5005C13.8966 23.0183 13.4952 23.4381 13 23.4381C12.5048 23.4381 12.1034 23.0183 " +
  "12.1034 22.5005V11.2503C12.1034 10.7325 12.5048 10.3127 13 10.3127C13.4952 10.3127 13.8966 10.7325 13.8966 11.2503Z";
const pathD3 = "M7.24084 11.3145L8.00964 22.5695C8.04307 23.0589 8.43247 23.4381 8.90164 23.4381C9.42062 23.4381 " +
  "9.83062 22.9776 9.79364 22.4363L9.02484 11.1813C8.99142 10.6919 8.60201 10.3127 8.13284 10.3127C7.61386 10.3127 " +
  "7.20387 10.7732 7.24084 11.3145Z";
const pathD4 = "M18.7592 11.3145L17.9904 22.5695C17.9569 23.0589 17.5675 23.4381 17.0984 23.4381C16.5794 23.4381 " +
  "16.1694 22.9776 16.2064 22.4363L16.9752 11.1813C17.0086 10.6919 17.398 10.3127 17.8672 10.3127C18.3861 10.3127 " +
  "18.7961 10.7732 18.7592 11.3145Z";

interface Props {
  className?: string
}

const DeleteButtonVector = (props: Props) => {
  return (
    <div className={props.className}>
      <svg
        className="icon"
        width="26"
        height="30"
        viewBox="0 0 26 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={pathD1}
          fill={theme.color.deleteButton}
        />
        <path
          d={pathD2}
          fill={theme.color.deleteButton}
        />
        <path
          d={pathD3}
          fill={theme.color.deleteButton}
        />
        <path
          d={pathD4}
          fill={theme.color.deleteButton}
        />
      </svg>
    </div>
  );
};

export const StyledDeleteButtonVector = styled(DeleteButtonVector)`
    svg {
      filter: drop-shadow(0 2px 4px #000000);

      :hover {
        path {
          fill: ${crayonBox.brightRed};
        }
      }
    }
`;


