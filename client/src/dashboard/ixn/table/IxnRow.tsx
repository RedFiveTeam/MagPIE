import * as React from 'react';
import { useState } from 'react';
import IxnModel, { IxnStatus } from '../../../store/ixn/IxnModel';
import { Box, Theme, Tooltip, withStyles } from '@material-ui/core';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import classNames from 'classnames';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import { StyledIxnStatusPickerOutline } from '../../../resources/icons/IxnStatusPickerOutline';
import DoesNotMeetEeiButton from '../../components/statusButtons/DoesNotMeetEeiButton';
import { DeleteCancelButton } from './DeleteCancelButton';
import styled from 'styled-components';
import theme, { rowStyles } from '../../../resources/theme';
import TrackNarrativeButton from '../../../resources/icons/TrackNarrativeButton';
import { StyledTrackNarrativeModal } from './TrackNarrativeModal';
import { postTrackNarrativeClick } from '../../../store/metrics';
import { TrackNarrativeClickModel } from '../../../store/metrics/TrackNarrativeClickModel';
import TextTooltip from '../../components/TextTooltip';
import { MiniTrashcanButton } from '../../../resources/icons/MiniTrashcanButton';
import { NoteButton } from '../../../resources/icons/NoteButton';
import CancelButtonSmall from '../../../resources/icons/CancelButtonSmall';

interface MyProps {
  ixn: IxnModel;
  segment: SegmentModel;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  setEditIxn: (ixnId: number) => void;
  addingOrEditing: boolean;
  userName: string;
  dateString: string;
  setAddNote: (ixnId: number) => void;
  disabled: boolean;
  readOnly: boolean
  className?: string;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    marginTop: '-15px',
  },
}))(Tooltip);

export const IxnRow: React.FC<MyProps> = props => {
  const classes = rowStyles();
  const [displayTrackNarrative, setDisplayTrackNarrative] = useState(false);
  const [displayNote, setDisplayNote] = useState(false);

  const handleDeleteClick = () => {
    props.deleteIxn(props.ixn);
  };

  const handleDoubleClick = () => {
    props.setEditIxn(props.ixn.id!);
  };

  const submitStatusChange = (status: IxnStatus) => {
    let ixn: IxnModel = {...props.ixn, status: status};
    props.postIxn(ixn);
  };

  const handleSubmitTrackNarrative = (trackNarrative: string) => {
    let ixn: IxnModel = {...props.ixn, trackNarrative: trackNarrative};
    props.postIxn(ixn);
  };

  const handleTrackNarrativeClick = () => {
    postTrackNarrativeClick(new TrackNarrativeClickModel(props.ixn.id!, props.userName));
    setDisplayTrackNarrative(true);

    setTimeout(() => {
      if (props.ixn.trackNarrative === '') {
        let element = document.getElementById('track-narrative-' + props.ixn.id);
        if (element instanceof HTMLTextAreaElement) {
          element.setSelectionRange(16, 16);
        }
      }
    }, 100);
  };

  const handleNoteClick = () => {
    if (props.readOnly) {
      setDisplayNote(!displayNote);
    } else {
      props.setAddNote(props.ixn.id!);
    }
  };

  return (
    <div className={props.className} id={'ixn-row-' + props.segment.id + '-' + props.ixn.id}>
      <HtmlTooltip
        title={
          <div className={'delete-container'}>
            <MiniTrashcanButton onClick={handleDeleteClick} className={'delete-ixn-button'} tooltip={'Delete Callout'}/>
          </div>}
        placement={'bottom-end'}
        PopperProps={{
          popperOptions: {
            modifiers: {
              offset: {
                enabled: true,
                offset: '45px, -35px',
              },
            },
          },
        }}
        interactive
        disableHoverListener={props.addingOrEditing}
        leaveDelay={100}
      >
        <Box
          borderRadius={8}
          className={classNames('ixn-row-box', props.disabled ? 'disabled' : null)}
          onDoubleClick={handleDoubleClick}
        >
          <div className={classNames('ixn-data-cell', 'exploit-analyst', 'name')}>
            {props.ixn.exploitAnalyst ? props.ixn.exploitAnalyst : '\xa0'}
          </div>
          <div className={classNames('ixn-data-cell', 'time')}>
            {props.ixn.time.utc().format('HH:mm:ss') + 'Z'}
          </div>
          <div className={classNames('ixn-data-cell', 'activity')}>
            {props.ixn.activity ? props.ixn.activity : '\xa0'}
          </div>
          <div className={classNames('ixn-data-cell', 'track', 'no-underline')}>
            {props.ixn.track ?
              <>
                <TextTooltip title={'Track Narrative'}>
                  <div className={'track-narrative-button'} onClick={handleTrackNarrativeClick}>
                    <TrackNarrativeButton hasNarrative={false}/>
                  </div>
                </TextTooltip>
                <span>{props.ixn.track}</span>
              </>
              :
              '\xa0'
            }
          </div>
          <div className={classNames('ixn-data-cell', 'track-analyst', 'name')}>
            {props.ixn.trackAnalyst ? props.ixn.trackAnalyst : '\xa0'}
          </div>
          <div className={classNames('ixn-data-cell', 'status', 'no-underline')}>
            <HtmlTooltip
              title={
                <div className={'status-menu'}>
                  <StyledIxnStatusPickerOutline/>
                  <InProgressButton
                    buttonClass={classNames(classes.inProgress, classes.clickable, 'in-progress-button')}
                    onClick={() => submitStatusChange(IxnStatus.IN_PROGRESS)}/>
                  <CompletedButton buttonClass={classNames(classes.completed, classes.clickable, 'completed-button')}
                                   onClick={() => submitStatusChange(IxnStatus.COMPLETED)}/>
                  <DoesNotMeetEeiButton
                    buttonClass={classNames(classes.doesNotMeetEei, classes.clickable, 'does-not-meet-eei-button')}
                    onClick={() => submitStatusChange(IxnStatus.DOES_NOT_MEET_EEI)}/>
                </div>
              }
              interactive
              disableHoverListener={props.addingOrEditing}
            >
              <div className={'status-wrapper'}>
                {props.ixn.status === IxnStatus.NOT_STARTED ?
                  <NotStartedButton buttonClass={classes.statusUnclickable}/>
                  : props.ixn.status === IxnStatus.IN_PROGRESS ?
                    <InProgressButton buttonClass={classes.statusUnclickable}/>
                    : props.ixn.status === IxnStatus.DOES_NOT_MEET_EEI ?
                      <DoesNotMeetEeiButton buttonClass={classes.statusUnclickable}/>
                      : <CompletedButton buttonClass={classes.statusUnclickable}/>}
              </div>
            </HtmlTooltip>
          </div>
          <div className={classNames('ixn-data-cell', 'lead-checker', 'name')}>
            {props.ixn.leadChecker ? props.ixn.leadChecker : '\xa0'}
          </div>
          <div className={classNames('ixn-data-cell', 'final-checker', 'name')}>
            {props.ixn.finalChecker ? props.ixn.finalChecker : '\xa0'}
          </div>
          <DeleteCancelButton
            handleClick={handleNoteClick}
            className={classNames('note-edit-button-container', displayNote ? 'note-button-extended' : null)}
            buttonClassName={'note-button'}
            title={!displayNote ? 'Analyst Notes' : 'Hide Notes'}
          >
            {!displayNote ?
              <NoteButton hasNote={props.ixn.note !== ''}/>
              :
              <CancelButtonSmall/>
            }
          </DeleteCancelButton>
        </Box>
      </HtmlTooltip>
      {displayNote ?
        <div className={'note-container'}>
          <div className={'ixn-data-cell note'}>
            {props.ixn.note}
          </div>
        </div>
        :
        null
      }
      {displayTrackNarrative ?
        <StyledTrackNarrativeModal
          setDisplay={setDisplayTrackNarrative}
          ixn={props.ixn}
          submitTrackNarrative={handleSubmitTrackNarrative}
          dateString={props.dateString}
          readOnly={props.readOnly}
        />
        :
        null
      }
    </div>
  );
};

export const StyledIxnRow = styled(IxnRow)`
  display: flex;
  overflow: hidden;
  flex-direction: column;

  .ixn-data-cell {
    margin: 14px 8px 8px 8px;
    padding-bottom: 6px;
    overflow-wrap: break-word;
    border-bottom: 1px solid #FFFFFF;
  }
  
  .track {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0 8px 0 8px;
  }
  
  .no-underline {
    border:none;
  }
  
  .track-narrative-input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 917px;
    height: 534px;
    border: 2px aliceblue;
    border-radius: 5px;
  }
  
  .note-edit-button-container {
    padding-bottom: 4px;
  }
  
  .note-button-extended {
    border-top-right-radius: 8px;
    width: 75px !important;
    margin-right: -8px;
    background-color: ${theme.color.backgroundInformation};
    margin-bottom: -8px;
    padding-right: 7px;
    padding-bottom: 8px;
    z-index: 1;
    flex-grow: 0 !important;
    align-self: stretch !important;
  }
  
  .note-container {
    width: 1476px;
    min-height: 62px;
    border-radius: 8px 0 8px 8px;
    background-color: ${theme.color.backgroundInformation};
    margin: -4px 0 8px 0;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    z-index: 50 !important;
    position: relative;
    word-wrap: break-word;
  }
  
  .note {
    margin: 0 !important;
    width: 100%;
  }
`;
