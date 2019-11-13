import RFIModel from '../RFIModel';
import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledRFIRowInformationSection } from '../row--pending/RFIRowInformationSection';
import { StyledRFIRowButtonSection } from '../row--pending/RFIRowButtonSection';

interface Props {
  rfi: RFIModel;
  index: number;
  className?: string;
}

export const RFIRowClosed: React.FC<Props> = props => {
  return (
    <div
      className={classNames('row', 'row--rfi', 'row--pending', props.className)}
      id={`${props.index}`}
    >
      <StyledRFIRowInformationSection id={props.rfi.id}/>
      <StyledRFIRowButtonSection status={props.rfi.status} url={props.rfi.urlToGETS}/>
    </div>
  )
};

export const StyledRFIRowClosed = styled(RFIRowClosed)`
  display: flex;
  flex-direction: row;
  height: 64px;  
  color: ${(props) => props.theme.color.fontPrimary}; 
  margin-bottom: 16px;
 
  .cells {
    background: ${(props) => props.theme.color.backgroundInactive};
    height: 58px;
  }
  
  .cell {
    display: flex;
    height: 100%;
    align-items: center;
  }
  
  .border {
    height: 4px;
    margin-top: 2px;
    background: ${(props) => props.theme.color.backgroundInactive};
};
  }
`;
