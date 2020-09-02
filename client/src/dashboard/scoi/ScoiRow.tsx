import * as React from 'react';
import { ScoiModel } from '../../store/scoi/ScoiModel';
import styled from 'styled-components';
import theme from '../../resources/theme';
import classNames from 'classnames';
import { IxnInfoButton, RfiInfoButton, TgtInfoButton, TrackInfoButton } from '../../resources/icons/RfiInfoButton';
import CollapseNotesButton from '../../resources/icons/CollapseNoteButton';
import { NoteButton } from '../../resources/icons/NoteButton';

interface MyProps {
  scoi: ScoiModel;
  selected: boolean;
  select: () => void;
  showRfiInfo: boolean;
  toggleRfiInfo: () => void;
  showTgtInfo: boolean;
  toggleTgtInfo: () => void;
  showCalloutInfo: boolean;
  toggleCalloutInfo: () => void;
  showTrackInfo: boolean;
  toggleTrackInfo: () => void;
  handleEdit: (scoiId: number) => void;
  editing: boolean;
  className?: string;
}

const ScoiRow: React.FC<MyProps> = (props) => {
  return (
    <div className={classNames('scoi-row', props.selected ? 'no-glow' : null, props.className)}
         onClick={props.select}
         id={'scoi-row-' + props.scoi.id}
    >
      <div className={classNames('scoi-row-half', 'scoi-row-left', props.selected ? 'highlighted' : null)}>
        <div className={'scoi-row-cell scoi-name'}>
          {props.scoi.name}
        </div>
        <div className={'scoi-row-cell scoi-mgrs'}>
          {props.scoi.mgrs}
        </div>
        <div className={'scoi-row-cell scoi-associations'}>
          <div className={'rfi-associations-button'}
               onClick={() => {
                 if (props.selected) {
                   props.toggleRfiInfo();
                 }
               }}
          >
            <RfiInfoButton active={props.selected && props.showRfiInfo}/>
          </div>
          <div className={'tgt-associations-button'}
               onClick={() => {
                 if (props.selected) {
                   props.toggleTgtInfo();
                 }
               }}
          >
            <TgtInfoButton active={props.selected && props.showTgtInfo}/>
          </div>
          <div className={'callout-associations-button'}
               onClick={() => {
                 if (props.selected) {
                   props.toggleCalloutInfo();
                 }
               }}
          >
            <IxnInfoButton active={props.selected && props.showCalloutInfo}/>
          </div>
          <div className={'track-associations-button'}
               onClick={() => {
                 if (props.selected) {
                   props.toggleTrackInfo();
                 }
               }}
          >
            <TrackInfoButton active={props.selected && props.showTrackInfo}/>
          </div>
        </div>
      </div>
      <div className={classNames('scoi-row-half', 'scoi-row-right', props.selected ? 'highlighted' : 'no-pointer', props.editing ? 'extended' : null)}
           onClick={() => props.handleEdit(props.scoi.id!)}>
        {props.editing ?
        <CollapseNotesButton/>
        :
          <NoteButton
            hasNote={props.scoi.note.length > 0}
          />

        }
      </div>
    </div>
  );
};

export const StyledScoiRow = styled(ScoiRow)`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${theme.color.fontPrimary};
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  cursor: pointer;
  
  :hover {
    box-shadow: 0 0 6px #FFFFFF;
    .scoi-row-half {
      box-shadow: none !important;
    }
  }
  
  .scoi-row-half {
    background: ${theme.color.backgroundInformation};
    flex-shrink: 0;
    flex-grow: 0;
    height: 58px;
    box-shadow: 0 2px 4px #000000;
  }

  .scoi-row-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 480px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding-left: 16px;
  }
  
  .scoi-row-right {
    margin-left: 8px;
    width: 60px;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer !important;
  }
  
  .extended {
    height: 66px !important;
    border-bottom-right-radius: 0 !important;
    margin-bottom: -8px !important;
    padding-bottom: 8px;
    
    svg {
      path {
        fill: ${theme.color.toggleActive}
      }
    }
  }
  
  .no-pointer {
    pointer-events: none;
  }
  
  .scoi-row-cell {
    margin-right: 8px;
  }
  
  .scoi-name {
    width: 106px;
  }
  
  .scoi-mgrs {
    width: 154px;
  }
  
  .scoi-associations {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 162px;
    height: 30px;
    
    div {
      cursor: pointer;
    }
  }
  
`;
