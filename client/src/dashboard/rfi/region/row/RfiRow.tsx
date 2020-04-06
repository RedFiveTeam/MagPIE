import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledRfiRowInformationSection } from './RfiRowInformationSection';
import RfiModel, { RfiStatus } from '../../../../store/rfi/RfiModel';
import GetsClickRequestModel from '../../../../store/metrics/GetsClickRequestModel';
import { connect } from 'react-redux';
import { loadTgtPage } from '../../../../store/tgt/Thunks';
import { postGetsClick } from '../../../../store/metrics';
import theme from '../../../../resources/theme';
import { StyledTgtPageButtonVector } from '../../../../resources/icons/TgtPageButtonVector';
import { StyledExternalLinkVector } from '../../../../resources/icons/ExternalLinkVector';
import { useCookies } from 'react-cookie';

interface Props {
  rfi: RfiModel;
  scrollRegionRef: any;
  index?: number;
  loadTgtPage: (rfi: RfiModel, firstLoad: boolean) => void;
  postGetsClick: (getsClickRequestModel: GetsClickRequestModel) => void;
  className?: string;
}

export const RfiRow: React.FC<Props> = props => {
  const [cookie, setCookie] = useCookies(['magpie']);

  function handleTgtClick() {
    if (props.rfi.status === RfiStatus.OPEN)
      setCookie('magpie', {...cookie.magpie, viewState: {rfiId: props.rfi.id, tgtId: undefined}});
      props.loadTgtPage(props.rfi, true);
  }

  function handleGetsClick(postGetsClick: (getsClickRequestModel: GetsClickRequestModel) => void) {
    postGetsClick(new GetsClickRequestModel(props.rfi.status, props.rfi.getsUrl));
    window.open(props.rfi.getsUrl, '_blank');
  }

  return (
    <div
      className={classNames('rfi-row', props.className)}
      key={props.rfi.rfiNum}
    >
      <div className={classNames('section', 'section--left')}>
        <StyledRfiRowInformationSection rfi={props.rfi} scrollRegionRef={props.scrollRegionRef}/>
        <div className={classNames('border', 'border-left')}/>
      </div>
      {props.rfi.status === RfiStatus.OPEN ?
        <div className={classNames('section--middle', 'cell--navigate-to-tgt-button',
          props.rfi.status !== RfiStatus.OPEN ? 'disabled' : null)}
             onClick={handleTgtClick}>
          <div className={'section-button'}>
            <span>TGTs&nbsp;&nbsp;</span>
            <StyledTgtPageButtonVector/>
          </div>
          <div className={classNames('border', 'border-middle')}/>
        </div>
        :
        null
      }
      <div className={classNames('section--right')}
           onClick={() => handleGetsClick(props.postGetsClick)}
      >
        <div className={classNames('section-button', 'section-button-right')}>
          <span>GETS&nbsp;&nbsp;</span>
          <StyledExternalLinkVector/>
        </div>
        <div className={classNames('border', 'border-right')}/>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  loadTgtPage: loadTgtPage,
  postGetsClick: postGetsClick,
};

export const StyledRfiRow = styled(
  connect(mapStateToProps, mapDispatchToProps)(RfiRow))`
  display: flex;
  flex-direction: row;
  flex: 1 1;

  color: ${theme.color.fontPrimary}; 
  margin-bottom: 16px;
 
  .border {
    height: 4px;
    margin-top: 2px;
  }
  
  .section-button {
    width: 100px;
    flex: 1 1 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: ${theme.color.backgroundInformation};
    align-self: stretch;
  }
  
  .section-button-right {
    border-top-right-radius: 8px;
  }
  
  .section--left {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    align-self: stretch;
    
    .border-left {
      border-bottom-left-radius: 8px;
    } 
  }
  
  .section--middle {
    width: 100px;
    display: flex;
    flex-direction: column;
    margin-left: 4px;
    cursor: pointer;
    
    :hover {
      text-shadow: 0 0 4px #FFFFFF;
      svg {
        filter: drop-shadow(0 0 4px #FFFFFF);
      }
    }
    
    .border-middle {
      width: 100px;
    }
  }
  
  .section--right {
    display: flex;
    flex-direction: column;
    margin-left: 4px;
    width: 100px;
    margin-bottom: 0;
    cursor: pointer;
    
    :hover {
      text-shadow: 0 0 4px #FFFFFF;
      svg {
        filter: drop-shadow(0 0 4px #FFFFFF);
      }
    }
  
    .border-right {
      border-bottom-right-radius: 8px;
      width: 100px;
    }
  }
  
  .disabled {
    pointer-events: none;
    color: ${theme.color.buttonRowDisabled};
  
    svg {
      filter: none;
      
      path {
        fill: ${theme.color.buttonRowDisabled};
      }
    }
  }
 
`;

export const PendingRfiRow = styled(StyledRfiRow)` 
  .section--information, .section--button {
    font-weight: ${theme.font.weightBold};
    background: ${theme.color.backgroundInformation};
  }
  
  .section--information {
    max-width: 1440px;
  }

  .border {
    background: ${theme.color.backgroundAction};
  }
`;

export const OpenRfiRow = styled(StyledRfiRow)` 
  .section--information, .section--button {
    font-weight: ${theme.font.weightRow};
    background: ${theme.color.backgroundInformation};
  }

  .border {
    background: ${theme.color.backgroundAssigned};
  }
`;

export const ClosedRfiRow = styled(StyledRfiRow)` 
  .section--information, .section-button {
    font-weight: ${theme.font.weightRow};
    background: ${theme.color.backgroundInactive};
  }
    
  .section--information {
    max-width: 1440px;
  }

  .border {
    background: ${theme.color.backgroundInactive};
  }
`;
