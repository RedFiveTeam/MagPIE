import React from 'react';
import styled from 'styled-components';
import RfiModel from '../models/RfiModel';
import classNames from 'classnames';
import { StyledRfiRowInformationSection } from './RfiRowInformationSection';
import { StyledRfiRowButtonSection } from './RfiRowButtonSection';

interface Props {
  rfi: RfiModel;
  scrollRegionRef: any;
  index: number;
  className?: string;
}

export const RfiRow: React.FC<Props> = props => {
  return (
    <div
      className={classNames('rfi-row', props.className)}
      key={props.rfi.id}
    >
      <div className={classNames('section', 'section--left')}>
        <StyledRfiRowInformationSection rfi={props.rfi} scrollRegionRef={props.scrollRegionRef}/>
        <div className={classNames('border', 'border-left')}/>
      </div>
      <div className={classNames('section', 'section--right')}>
        <StyledRfiRowButtonSection url={props.rfi.getsUrl} status={props.rfi.status}/>
        <div className={classNames('border', 'border-right')}/>
      </div>
    </div>
  )
};

export const StyledRfiRow = styled(RfiRow)`
  display: flex;
  flex-direction: row;
  flex: 1 1;

  color: ${(props) => props.theme.color.fontPrimary}; 
  margin-bottom: 16px;
 
  .border {
    height: 4px;
    margin-top: 2px;
  }
  
  .section--left {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    
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

export const PendingRfiRow = styled(StyledRfiRow)` 
  .section--information, .section--button {
    font-weight: ${(props) => props.theme.font.weightBold};
    background: ${(props) => props.theme.color.backgroundInformation};
  }

  .border {
    background: ${(props) => props.theme.color.backgroundAction};
  }
`;

export const OpenRfiRow = styled(StyledRfiRow)` 
  .section--information, .section--button {
    font-weight: ${(props) => props.theme.font.weightRow};
    background: ${(props) => props.theme.color.backgroundInformation};
  }

  .border {
    background: ${(props) => props.theme.color.backgroundAssigned};
  }
`;

export const ClosedRfiRow = styled(StyledRfiRow)` 
  .section--information, .section--button {
    font-weight: ${(props) => props.theme.font.weightRow};
    background: ${(props) => props.theme.color.backgroundInactive};
  }

  .border {
    background: ${(props) => props.theme.color.backgroundInactive};
  }
`;
