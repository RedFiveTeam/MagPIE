import styled from 'styled-components';

export const Title = styled.div`
  background: none;
  font-size: 64px;
`;

export const Input = styled.input`
  background-color: ${(props) => props.theme.color.inputBackground};
  font-weight: 700;
  font-size: 24px;
`;
