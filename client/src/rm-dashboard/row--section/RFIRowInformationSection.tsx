import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import moment from 'moment';

interface Props {
  id: string;
  unit: string;
  ltiov: number;
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
            {formatID(props.id)}
          </span>
          <span className={classNames('cell', 'cell--unit')}>
            <div>{props.unit}</div>
          </span>
          <span className={classNames('cell', 'cell--ltiov')}>
            {props.ltiov !== 0 ? moment.unix(props.ltiov).format("D MMM YY") : '-'}
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
    border-top-left-radius: 8px;
    padding: 2px 16px 2px 16px;
    justify-content: flex-start;
    font-size: ${(props) => props.theme.font.sizeRow};
  }
  
  .cell--id {
    margin-left: 20px;
    width: 72px;
  }
  
  .cell--unit {
    white-space: nowrap;
    width: 136px;
  }  
  
  .cell--unit div {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .cell--ltiov {
    margin-left: 32px;
    width: 80px;
    justify-content: center;
  }
  
  .border-left {
    border-bottom-left-radius: 8px;
  } 
`;
