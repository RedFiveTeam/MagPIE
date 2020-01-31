import * as React from 'react';
import styled from 'styled-components';

const pathD = "M12.0001 10.9998C12.0001 10.7347 11.8947 10.4804 11.7072 10.2928L9.4142 7.99985L11.7072" +
  " 5.70685C11.8947 5.51934 12.0001 5.26503 12.0001 4.99985C12.0001 4.73467 11.8947 4.48036 11.7072" +
  " 4.29285C11.5197 4.10534 11.2654 4 11.0002 4C10.735 4 10.4807 4.10534 10.2932 4.29285L8.0002 6.58585L5.7072" +
  " 4.29285C5.51969 4.10534 5.26538 4 5.0002 4C4.73502 4 4.48071 4.10534 4.2932 4.29285C4.10569 4.48036 4.00035" +
  " 4.73467 4.00035 4.99985C4.00035 5.26503 4.10569 5.51934 4.2932 5.70685L6.5862 7.99985L4.2932 10.2928C4.20026" +
  " 10.3856 4.12652 10.4958 4.07621 10.6172C4.0259 10.7385 4 10.8685 4 10.9998C4 11.1312 4.0259 11.2612 4.07621" +
  " 11.3825C4.12652 11.5039 4.20026 11.6141 4.2932 11.7068C4.38585 11.8 4.49602 11.874 4.61735 11.9244C4.73868" +
  " 11.9749 4.86879 12.0009 5.0002 12.0009C5.13161 12.0009 5.26172 11.9749 5.38305 11.9244C5.50439 11.874 5.61455" +
  " 11.8 5.7072 11.7068L8.0002 9.41385L10.2932 11.7068C10.4807 11.8944 10.735 11.9997 11.0002 11.9997C11.2654" +
  " 11.9997 11.5197 11.8944 11.7072 11.7068C11.8947 11.5193 12.0001 11.265 12.0001 10.9998Z";

const DeleteIcon: React.FC = () => {
  return (
    <Wrapper className={"delete-button"}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill="white"/>
      <path
        d={pathD}
        fill="black"/>
     </svg>
    </Wrapper>
  );
};

export default DeleteIcon;

const Wrapper = styled('div')`
 svg {
 border-radius: 50%;
  cursor: pointer;
   :hover {
     box-shadow: 0 0 6px #fff;
   }
 }
`;
