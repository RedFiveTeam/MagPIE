import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import moment from 'moment';
import RFIModel from '../RFIModel';

interface Props {
  rfi: RFIModel;
  className?: string;
}

const formatID = (id: string): string => {
  let year: string = id.substr(id.length - 8, 2);
  let number: string = id.substr(id.length - 3, 3);
  return `${year}-${number}`;
};

export const RFIRowInformationSection: React.FC<Props> = props => {

  return (
    <div className={classNames('row-section', 'section--information', props.className)}>
      <div className={classNames('cells', 'cells-left')}>
          <span className={classNames('cell', 'cell--id')}>
            {formatID(props.rfi.id)}
          </span>
        <span className={classNames('cell', 'cell--country')}>
          {props.rfi.country}
        </span>
          <span className={classNames('cell', 'cell--unit')}>
            <div>{props.rfi.unit}</div>
          </span>
          <span className={classNames('cell', 'cell--ltiov')}>
            {props.rfi.ltiov !== 0 ? moment.unix(props.rfi.ltiov).format("D MMM YY").toUpperCase() : '-'}
          </span>
      </div>
      <div className={classNames('border', 'border-left')}/>
    </div>
  );
};

export const StyledRFIRowInformationSection = styled(RFIRowInformationSection)`
  margin-right: 4px;
  
  .cells-left {
    width: ${(props) => props.theme.table.leftWidth};
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-top-left-radius: 8px;
    padding: 2px 0px 2px 0px;
    font-size: ${(props) => props.theme.font.sizeRow};
    text-align: center;
  }
  
  .cell--id {
    width: 72px;
    justify-content: center;
  }
  
  .cell--unit {
    white-space: nowrap;
    width: 136px;
  }  
  
  .cell--unit div {
    width: 136px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .cell--ltiov {
    width: 80px;
    justify-content: center;
  }
    
  .cell--country {
    width: 40px;
    justify-content: center;
  }
  
  .border-left {
    border-bottom-left-radius: 8px;
  } 
`;
