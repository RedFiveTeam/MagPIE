import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const RFITableHeader: React.FC<Props> = props => {
  return (
    <div className={classNames('header', props.className)}>
      <span className={'header--id'}>RFI</span>
      <span className={'header--customer'}>Customer</span>
      <span className={'header--ltiov'}>LTIOV</span>
    </div>
  );
};

export const StyledRFITableHeader = styled(RFITableHeader)`
  font-family: ${(props) => props.theme.font.familyHeader};
  color: ${(props) => props.theme.color.fontPrimary};
  font-weight: ${(props) => props.theme.font.weightHeader};
  font-size: ${(props) => props.theme.font.sizeHeader};
  margin-top: 64px;
  height: 48px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  .header--id {
    width: 72px;
    margin-left: 16px;
    text-align: right; 
  }
  .header--customer {
    width: 136px;
    margin-left: 16px;
    text-align: left; 
  }
  .header--ltiov {
    width: 96px;
    margin-left: 16px;
    text-align: right; 
  }
`;
