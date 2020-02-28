import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RfiStatus } from '../../../../store/rfi/RfiModel';
import GetsClickRequestModel from '../../../../store/metrics/GetsClickRequestModel';
import { StyledExternalLinkVector } from '../../../../resources/icons/ExternalLinkVector';
import { postGetsClick } from '../../../../store/metrics';

interface Props {
  status: RfiStatus;
  url: string;
  postGetsClick: (getsClickRequestModel: GetsClickRequestModel) => void;
  className?: string;
}

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
      <StyledExternalLinkVector/>
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
    text-shadow: 0 0 4px #FFFFFF;
    svg {
      filter: drop-shadow(0 0 4px #FFFFFF);
    }
  }
  
  .cell--view-in-gets {
    padding-top: 3px;
  }
`;
