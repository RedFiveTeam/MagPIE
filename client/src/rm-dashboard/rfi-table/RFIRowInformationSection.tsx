import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
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
    <div
      className={classNames('row-section', 'section--information', props.className)}
    >
      <span className={classNames('cell', 'cell--id')}>
        {formatID(props.rfi.id)}
      </span>
      <span className={classNames('cell', 'cell--country')}>
          {props.rfi.country}
        </span>
      <span className={classNames('cell', 'cell--customer')}>
          <div>{props.rfi.customer}</div>
      </span>
      <span className={classNames('cell', 'cell--ltiov')}>
            {props.rfi.ltiov !== undefined ? props.rfi.ltiov.utc().format("D MMM YY").toUpperCase() : '-'}
          </span>
      <div className={classNames('cell', 'cell--description')}>
          {props.rfi.description}
      </div>
    </div>
  );
};

export const StyledRFIRowInformationSection = styled(RFIRowInformationSection)`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-width: 715px;
  justify-content: space-around;
  border-top-left-radius: 8px;
  padding: 2px 0 2px 0;
  font-size: ${(props) => props.theme.font.sizeRow};
  text-align: left;
  align-items: center;
  
  .cell {
    margin: 0 16px;
  }
  
  .cell--id {
    flex: 0 0 72px;
    justify-content: center;
    text-align: right;
  }
  
  .cell--customer {
    white-space: nowrap;
    flex: 0 0 136px;
  }  
  
  .cell--customer div {
    width: 136px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .cell--ltiov {
    flex: 0 0 80px;
  }
    
  .cell--country {
    flex: 0 0 40px;
  }
  
  .cell--description {
   display: flex;
   flex: 1;
   flex-direction: column;
   max-height: 2.3em;
   overflow: hidden;
   max-width: 928px;
   min-width: 224px;
  }
`;
