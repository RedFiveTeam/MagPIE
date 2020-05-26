import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { StyledBackButtonVector } from '../../resources/icons/BackButtonVector';
import { TargetModel } from '../../store/tgt/TargetModel';
import theme from '../../resources/theme';
import EeiNotesIcon from '../../resources/icons/EeiNotesIcon';
import AddSegmentIcon from '../../resources/icons/AddSegmentIcon';
import ExportRollupsIcon from '../../resources/icons/ExportRollupsIcon';
import TextTooltip, { EeiTooltip } from '../components/TextTooltip';

interface Props {
  exitIxnPage: () => void;
  target: TargetModel;
  dateString: string;
  disableButtons: boolean;
  disableAddSegment: boolean;
  disableRollupButton: boolean;
  disableEeiButton: boolean;
  showRollup: () => void;
  displayEeiNotes: boolean;
  toggleDisplayEeiNotes: () => void;
  setAddSegment: () => void;
  displaySegmentHelperText: boolean;
  className?: string;
}

export const IxnDashboardHeader: React.FC<Props> = props => {

  const handleRollupClick = () => {
    if (!props.disableButtons) {
      props.showRollup();
    }
  };

  return (
    <div className={classNames(props.className)}>
      <div className={'ixn-dash--header'}>
        <div className={'ixn-dash--header--left-side'}>
          <div className={'ixn-dash--header--back-button'} onClick={props.exitIxnPage}>
            <StyledBackButtonVector/>
          </div>
          <div className={'ixn-dash--header--mgrs-date-container'}>
            <div className={'ixn-dash--header--mgrs'}>
              <b>MGRS:</b> {props.target.mgrs}
            </div>
            <div className={'ixn-dash--header--date'}>
              <b>Date:</b> {props.dateString}
            </div>
          </div>
        </div>
        <div className={'smallbord-container'}>
          <img src={'smallbord.png'} alt={'logo'} height={'63px'}/>
        </div>
        <div className={'ixn-dash--header--buttons'}>
          {props.displaySegmentHelperText ?
            <span className={'header-helper-text'}>Add an Additional Segment</span>
            :
            null
          }
          <TextTooltip title={'Add Segment'}>
            <div
              className={classNames('ixn-dash--header--button add-segment-button',
                                    props.disableButtons || props.disableAddSegment ? 'disabled' : null)}
              onClick={props.setAddSegment}
            >
              <AddSegmentIcon/>
            </div>
          </TextTooltip>
          <EeiTooltip
            arrow
            title={props.target.notes}
            placement={'bottom-end'}
            interactive
            leaveDelay={100}
            open={props.displayEeiNotes}
          >
            <TextTooltip title={'EEI Notes'}>
            <div
              className={classNames('ixn-dash--header--button eei-notes-button',
                                    props.disableButtons || props.disableEeiButton ? 'disabled' : null)}
              onClick={props.toggleDisplayEeiNotes}
            >
              <EeiNotesIcon/>
            </div>
            </TextTooltip>
          </EeiTooltip>
          <TextTooltip title={'Export Rollups'}>
            <div
              className={classNames('ixn-dash--header--button', 'rollup-button',
                                    props.disableButtons || props.disableRollupButton ? 'disabled' : null)}
              onClick={handleRollupClick}
            >
              <ExportRollupsIcon/>
            </div>
          </TextTooltip>
        </div>
      </div>
    </div>
  );
};

export const StyledIxnDashboardHeader = styled(IxnDashboardHeader)`
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  
  .ixn-dash--header--left-side {
    display: flex;
    flex-direction: row;
  }
  
  .ixn-dash--header { 
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 63px;
    background: ${theme.color.backgroundHeader};
  }
  
  .ixn-dash--header--back-button {
    cursor: pointer;
    padding-left: 18px;
    width: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: ${theme.color.backgroundAction};
  }
  
  .ixn-dash--header--mgrs-date-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    font-size: 20px;
  }
  
  .ixn-dash--header--tgt-name-container {
    text-align: center;
    width: 400px;
    min-width: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-weight: ${theme.font.weightBold};
  }
  
  .ixn-dash--header--tgt-name {
    font-size: 32px;
    font-weight: ${theme.font.weightMedium};
  }
  
  .ixn-dash--header--buttons {
    display: flex;
    flex-direction: row;
    flex: 0 0 148px;
    justify-content: space-between;
    align-items: center;
    overflow-y: auto;
    height: 59px;
    padding: 5px;
    font-size: 18px;
    margin-right: 29px;
    margin-left: 283px;
  }
  
  .ixn-dash--header--button {
    cursor: pointer;
  }
  
  .ixn-dash--header--filler {
    width: 60px;
  }
  
  .rollup-button {
    cursor: pointer;
  }
  
  .rollup-box {
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .header-helper-text {
    position: absolute;
    text-align: end;
    font-size: ${theme.font.sizeRegion};
    line-height: 21px;
    width: 300px;
    margin-left: -300px;
    padding-right: 8px;
    height: 24px;
  }
`;
