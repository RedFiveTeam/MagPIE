import RFIModel from '../../RFIModel';
import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledRFIRowInformationSection } from '../../row--section/RFIRowInformationSection';
import { StyledRFIRowButtonSection } from '../../row--section/RFIRowButtonSection';

interface Props {
  rfi: RFIModel;
  index: number;
  className?: string;
}

export const RFIRowOpen: React.FC<Props> = props => {
  return (
    <div
      className={classNames('row', 'row--rfi', 'row--open', props.className)}
      id={`${props.index}`}
    >
      <StyledRFIRowInformationSection rfi={props.rfi}/>
      <StyledRFIRowButtonSection status={props.rfi.status} url={props.rfi.getsUrl}/>
    </div>
  )
};

export const StyledRFIRowOpen = styled(RFIRowOpen)`
  display: flex;
  flex-direction: row;
  height: ${(props) => props.theme.table.rowHeight};  
  color: ${(props) => props.theme.color.fontPrimary}; 
  margin-bottom: 16px;
  
  .cells-left {
    font-weight: ${(props) => props.theme.font.weightRow};
  }
 
  .cells {
    background: ${(props) => props.theme.color.backgroundInformation};
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
    background: ${(props) => props.theme.color.backgroundAssigned};
  }
`;
