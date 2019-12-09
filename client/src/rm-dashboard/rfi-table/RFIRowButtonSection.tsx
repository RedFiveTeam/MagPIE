import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import IconOpenNewPage from '../../styles/IconOpenNewPage';
import { connect } from 'react-redux';
import GETSClickRequestModel from '../../metrics/Model/GETSClickRequestModel';
import { postGETSClick } from '../../users/UserActions';
import { RFIStatus } from '../RFIModel';

interface Props {
  status: RFIStatus;
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
    postGETSClick(new GETSClickRequestModel(props.status, props.url));
    window.open(props.url, '_blank');
  }

  return (
    <div
      className={classNames('row-section', 'section--button', props.className)}
      onClick={() => handleClick()}
    >
      {buttonText()}
      <IconOpenNewPage/>
    </div>
  )
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  postGETSClick: postGETSClick,
};


export const StyledRFIRowButtonSection = styled(connect(mapStateToProps, mapDispatchToProps)(RFIRowButtonSection))`
  width: 164px;
  font-weight: ${(props) => props.theme.font.weightBold};
  padding: 16px;
  border-top-right-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
    
  :hover {
    color: ${(props) => props.theme.color.backgroundBase};
    path {
      fill: ${(props) => props.theme.color.backgroundBase};
    }
  }
  
  .cell--view-in-gets {
    padding-top: 3px;
  }
`;
