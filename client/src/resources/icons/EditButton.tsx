import * as React from 'react';
import styled from 'styled-components';

const pathD = 'M8.3875 1.94804L10.2667 4.06251C10.3458 4.15159 10.3458 4.29693 10.2667 4.38601L5.71666 9.50576L3.7833' +
  '3 9.74722C3.525 9.78004 3.30625 9.53389 3.33542 9.24321L3.55 7.06779L8.1 1.94804C8.17916 1.85896 8.30833 1.85896 8' +
  '.3875 1.94804ZM11.7625 1.41121L10.7458 0.26724C10.4292 -0.0890799 9.91458 -0.0890799 9.59583 0.26724L8.85833 1.097' +
  '09C8.77916 1.18617 8.77916 1.33151 8.85833 1.42059L10.7375 3.53507C10.8167 3.62415 10.9458 3.62415 11.025 3.53507L' +
  '11.7625 2.70522C12.0792 2.34655 12.0792 1.76753 11.7625 1.41121ZM8 8.62669V10.4997H1.33333V8.62669H0.00251547L0 10' +
  '.8748C0 11.496 0.447917 12 1 12H8.33333C8.88541 12 9.33333 11.496 9.33333 10.8748V8.62669H8C7.95416 8.6806 8 8.551' +
  '67 8 8.62669Z';

interface MyProps {
  className?: string
}

const EditButton: React.FC<MyProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={pathD}
          fill="white"
        />
      </svg>
    </Wrapper>
  );
};

export default EditButton;

const Wrapper = styled('div')`
  margin: 2px 2px 2px 2px;
  
  svg {
    cursor: pointer;
    
    :hover {
      filter: drop-shadow(0 0px 4px #FFFFFF);
   }
 }
`;
