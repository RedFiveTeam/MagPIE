import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
  id: string;
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
      </div>
      <div className={classNames('border', 'border-left')}/>
    </div>
  );
};

export const StyledRFIRowInformationSection = styled(RFIRowInformationSection)`
  width: 104px;
  margin-right: 4px;
  font-weight: bold;
  
  .cells-left {
    display: flex;
    flex-direction: row;
    border-top-left-radius: 8px;
    padding: 2px 16px 2px 16px;
    justify-content: flex-end;
  }
    
  .border-left {
    border-bottom-left-radius: 8px;
  } 
`;
