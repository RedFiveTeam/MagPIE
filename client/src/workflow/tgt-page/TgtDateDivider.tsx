import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

interface Props {
  exploitDate: string
  index?: number
  className?: string;
}

export const TgtDateDivider: React.FC<Props> = props => {
  return (
    <div className={classNames('region-divider', props.className)}>
      <span className={classNames('separator-line', 'left')}/>
      <span className={classNames('separator-title')}>{props.exploitDate.toUpperCase()}</span>
      <span className={classNames('separator-line', 'right')}/>
    </div>
  )
};

export const StyledTgtDateDivider = styled(TgtDateDivider)`
  height: 32px;
  font-family: ${(props) => props.theme.font.familyRegion};
  font-weight: ${(props) => props.theme.font.weightBold};
  font-size: ${(props) => props.theme.font.sizeRegion};
  color: ${(props) => props.theme.color.fontPrimary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4px;
  
  .separator-line {
    flex-grow: 1;
    height: 2px;
    border-radius: 4px;
    background: ${(props) => props.theme.color.fontPrimary};
    margin-top: 22px;
    margin-bottom: 8px;
  }
  
  .separator-title {
    width: 108px;
    text-align: center;
  }
`;
