import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import IconOpenNewPage from '../../styles/IconOpenNewPage';

interface Props {
  url: string;
  className?: string;
}

export const RFIRowButtonSection: React.FC<Props> = props => {
  function buttonText() {
    return (
      <span className={classNames('cell', 'cell--view-in-gets')}>
        View in GETS
      </span>
    );
  }

  function viewInGETSButton() {
    return (
      <div
        className={classNames('cells', 'cells-right')}
        onClick={() => window.open(props.url, '_blank')}
      >
        {buttonText()}
        <IconOpenNewPage/>
      </div>
    );
  }

  return (
    <div className={classNames('row-section', 'section--button', props.className)}>
      {viewInGETSButton()}
      <div className={classNames('border', 'border-right')}/>
    </div>
  )
};

export const StyledRFIRowButtonSection = styled(RFIRowButtonSection)`
  width: 164px;
  font-weight: bold;
  
  .cells-right {
    padding: 16px;
    border-top-right-radius: 8px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
    
  .border-right {
    border-bottom-right-radius: 8px;
  }
  
  :hover {
    color: ${(props) => props.theme.color.backgroundBase};
    path {
      fill: ${(props) => props.theme.color.backgroundBase};
    }
  }
  
  .icon {
    margin-top: 1px;
    :hover {
      color: pink;
    }
  }
`;
