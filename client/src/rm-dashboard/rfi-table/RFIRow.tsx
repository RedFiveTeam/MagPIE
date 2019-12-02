import React from 'react';
import styled from 'styled-components';
import RFIModel from '../RFIModel';
import classNames from 'classnames';
import { StyledRFIRowInformationSection } from './RFIRowInformationSection';
import { StyledRFIRowButtonSection } from './RFIRowButtonSection';

interface Props {
  rfi: RFIModel;
  className?: string;
}

export const RFIRow: React.FC<Props> = props => {
  return (
    <div
      className={classNames('rfi-row', props.className)}
      key={props.rfi.id}
    >
      <div className={classNames('section', 'section--left')}>
        <StyledRFIRowInformationSection rfi={props.rfi}/>
        <div className={classNames('border', 'border-left')}/>
      </div>
      <div className={classNames('section', 'section--right')}>
        <StyledRFIRowButtonSection url={props.rfi.getsUrl} status={props.rfi.status}/>
        <div className={classNames('border', 'border-right')}/>
      </div>
    </div>
  )
};

export const StyledRFIRow = styled(RFIRow)`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 64px;  
  color: ${(props) => props.theme.color.fontPrimary}; 
  margin-bottom: 16px;
 
  .border {
    height: 4px;
    margin-top: 2px;
  }
  
  .section--left {
    display: flex;
    flex-direction: column;
    flex: 1;
    
    .border-left {
      border-bottom-left-radius: 8px;
    } 
  }
  
  .section--right {
    display: flex;
    flex-direction: column;
    margin-left: 4px;
    
    .border-right {
      border-bottom-right-radius: 8px;
    }
  }
`;

export const PendingRFIRow = styled(StyledRFIRow)` 
  .section--information, .section--button {
    font-weight: ${(props) => props.theme.font.weightBold};
    background: ${(props) => props.theme.color.backgroundInformation};
  }

  .border {
    background: ${(props) => props.theme.color.backgroundAction};
  }
`;

export const OpenRFIRow = styled(StyledRFIRow)` 
  .section--information, .section--button {
    font-weight: ${(props) => props.theme.font.weightRow};
    background: ${(props) => props.theme.color.backgroundInformation};
  }

  .border {
    background: ${(props) => props.theme.color.backgroundAssigned};
  }
`;

export const ClosedRFIRow = styled(StyledRFIRow)` 
  .section--information, .section--button {
    font-weight: ${(props) => props.theme.font.weightRow};
    background: ${(props) => props.theme.color.backgroundInactive};
  }

  .border {
    background: ${(props) => props.theme.color.backgroundInactive};
  }
`;
