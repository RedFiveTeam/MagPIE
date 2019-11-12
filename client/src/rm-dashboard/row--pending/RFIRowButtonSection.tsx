import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import IconOpenNewPage from '../../styles/IconOpenNewPage';
import { connect } from 'react-redux';
import GETSClickRequestModel from '../../metrics/Model/GETSClickRequestModel';
import { postGETSClick } from '../../users/UserActions';

interface Props {
  url: string;
  postGETSClick: (getsClickRequestModel: GETSClickRequestModel) => void;
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

  function handleClick() {
    postGETSClick(new GETSClickRequestModel(props.url));
    window.open(props.url, '_blank');
  }


  function viewInGETSButton() {
    return (
      <div
        className={classNames('cells', 'cells-right')}
        onClick={() => handleClick()}
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

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
  postGETSClick: postGETSClick,
};



export const StyledRFIRowButtonSection = styled(connect(mapStateToProps, mapDispatchToProps)(RFIRowButtonSection))`
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
