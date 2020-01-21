import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import ExternalLinkVector from '../../../resources/icons/ExternalLinkVector';
import { connect } from 'react-redux';
import GetsClickRequestModel from '../../../metrics/models/GetsClickRequestModel';
import { RfiStatus } from '../models/RfiModel';
import { postGetsClick } from '../../../state/actions';

interface Props {
  status: RfiStatus;
  url: string;
  postGetsClick: (getsClickRequestModel: GetsClickRequestModel) => void;
  className?: string;
}

//TODO: tests
// test that RfiRowButtonSection renders is in RfiRow.test.tsx

export const RfiRowButtonSection: React.FC<Props> = props => {

  function buttonText() {
    return (
      <span className={classNames('cell', 'cell--view-in-gets')}>
        View in GETS
      </span>
    );
  }

  function handleClick(postGetsClick: (getsClickRequestModel: GetsClickRequestModel) => void) {
    postGetsClick(new GetsClickRequestModel(props.status, props.url));
    window.open(props.url, '_blank');
  }

  return (
    <div
      className={classNames('row-section', 'section--button', props.className)}
      onClick={() => handleClick(props.postGetsClick)}
    >
      {buttonText()}
      <ExternalLinkVector/>
    </div>
  )
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  postGetsClick: postGetsClick,
};


export const StyledRfiRowButtonSection = styled(connect(mapStateToProps, mapDispatchToProps)(RfiRowButtonSection))`
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
    color: ${(props) => props.theme.color.buttonActive};
    path {
      fill: ${(props) => props.theme.color.buttonActive};
    }
  }
  
  .cell--view-in-gets {
    padding-top: 3px;
  }
`;
