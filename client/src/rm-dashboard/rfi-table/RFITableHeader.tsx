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
  width: 104px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
