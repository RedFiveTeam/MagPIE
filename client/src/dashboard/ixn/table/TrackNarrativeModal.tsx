import { Modal, TextField } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { useEffect, useState } from 'react';
import theme, { longInputStyles, rowStyles } from '../../../resources/theme';
import IxnModel from '../../../store/ixn/IxnModel';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { DismissSnackbarAction } from '../../components/InformationalSnackbar';
import styled from 'styled-components';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { StyledScoiChip } from './ScoiChip';
import { StyledExpandCollapseArrow } from '../../../resources/icons/ExpandCollapse';

interface MyProps {
  setDisplay: (display: boolean) => void;
  ixn: IxnModel;
  submitTrackNarrative: (trackNarrative: string) => void;
  dateString: string;
  readOnly: boolean;
  className?: string;
}

export const TrackNarrativeModal: React.FC<MyProps> = props => {
  const classes = longInputStyles();
  const rowClasses = rowStyles();
  const initNarrative = props.dateString + '\n\nSTART\n\n\n\nSTOP';

  const [trackNarrative, setTrackNarrative] = useState(
    props.ixn.trackNarrative === '' ?
      initNarrative
      :
      props.ixn.trackNarrative,
  );
  const [scoiList, setScoiList] = useState([] as string[]);
  const [collapseScoiChips, setCollapseScoiChips] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  useEffect(() => {
    checkForScois(trackNarrative);
  }, []);

  //Overlay spans with backgrounds on the MGRSes for highlight
  let trackNarrativeDisplay = () => {
    const parts = trackNarrative.split(/([A-Z]{3}S[0-9]{2}-[0-9]{0,4})/g);
    return <span>{parts.map((part, i) =>
                              <span key={i} style={part.match(/[A-Z]{3}S[0-9]{2}-[0-9]{0,4}/g) !== null ?
                                {backgroundColor: '#42686A', borderRadius: '4px'} : {}}>
            {part}
        </span>)
    }<br/><br/><br/></span>;
  };

  const inputTrackNarrative = (event: any) => {
    let newTrackNarrative: string = event.target.value;
    //look for SCOIs to save
    checkForScois(newTrackNarrative);
    setTrackNarrative(newTrackNarrative);
  };

  const checkForScois = (trackNarrative: string) => {
    let matches: RegExpMatchArray|null = trackNarrative.match(/[A-Z]{3}S[0-9]{2}-[0-9]{4}/g);
    let newScoiList: string[] = [];
    if (matches) {
      matches.forEach((match: string) => {
        if (!newScoiList.includes(match)) {
          newScoiList.push(match);
        }
      });
    }
    setScoiList(newScoiList);
  };

  const displaySnackbar = (message: string) => {
    enqueueSnackbar(message, {
      action: (key) => DismissSnackbarAction(key, closeSnackbar, rowClasses.snackbarButton),
      variant: 'info',
    });
  };

  const handleSave = () => {
    if (!props.readOnly) {
      props.submitTrackNarrative(trackNarrative);
      props.setDisplay(false);
      displaySnackbar('Track Narrative Saved');
    }
  };

  const mapScoisToChips = () => {
    return scoiList.map((mgrs: string, index: number) =>
                          <StyledScoiChip mgrs={mgrs} key={index}/>,
    );
  };

  //Scrolls highlights with the input text
  setTimeout(() => {
    let trackNarrativeInput = document.getElementById('track-narrative-' + props.ixn.id)!;
    let trackNarrativeDisplayDiv = document.getElementById(`track-narrative-display-${props.ixn.id}`)!;

    if (trackNarrativeInput && trackNarrativeDisplayDiv) {
      trackNarrativeInput.onscroll = function () {
        trackNarrativeDisplayDiv.scrollTop = trackNarrativeInput.scrollTop;
      };
    }
  }, 500);

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      onClose={() => props.setDisplay(false)}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('narrative-modal', classes.modal, props.className)}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <div className={classes.narrativeModalBody}>
        <form className={classNames('track-narrative-form')}
        >
          <div className={'track-narrative-header'}>
            <div>&nbsp;</div>
            <span><b>{props.ixn.track}</b></span>
            <div
              className={classNames('cancel', classes.modalButton)}
              onClick={
                () =>
                  (props.ixn.trackNarrative === '' && trackNarrative === initNarrative) ||
                  props.ixn.trackNarrative === trackNarrative
                    ?
                    props.setDisplay(false)
                    :
                    setNavigating(true)
              }
            >
              <DeleteButtonX/>
            </div>
          </div>
          <div className={classNames('narrative-input', props.readOnly ? 'narrative-text-wrapper' : null)}>
            {!props.readOnly ?
              <>
                <div id={`track-narrative-display-${props.ixn.id}`} className={classNames('track-narrative-display',
                                                                                          classes.modalTextfield)}>{trackNarrativeDisplay()}</div>
                <TextField
                  className={classNames('track-narrative', classes.modalTextfield)}
                  value={trackNarrative}
                  onChange={inputTrackNarrative}
                  autoFocus
                  multiline
                  rows={27}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  inputProps={{
                    id: 'track-narrative-' + props.ixn.id,
                    className: 'track-narrative-input',
                  }}
                />
              </>
              :
              <TextField
                className={classNames('track-narrative uneditable', classes.modalTextfield)}
                value={trackNarrative}
                multiline
                rows={27}
                InputProps={{
                  disableUnderline: true,
                }}
                inputProps={{
                  id: 'track-narrative-' + props.ixn.id,
                  className: 'track-narrative-input',
                }}
              />
            }
            {scoiList.length > 0 ?
              <div className={'scoi-container'}>
                <div className={'scoi-queue-header'}>
                  <span>
                    SCOI Queue:
                  </span>
                  <div className='expand-collapse-scois' onClick={() => setCollapseScoiChips(!collapseScoiChips)}>
                    <StyledExpandCollapseArrow collapsed={collapseScoiChips}/>
                  </div>
                </div>
                {collapseScoiChips ?
                  null
                  :
                  <div className={'scoi-queue'}>
                    {mapScoisToChips()}
                  </div>
                }
              </div>
              :
              null
            }
          </div>
        </form>
        <div className={classNames('button-section', classes.modalConfirmation)}>
          <CopyToClipboard onCopy={() => displaySnackbar('Copied to Clipboard')} text={trackNarrative}>
            <div
              className={classNames('copy-to-clipboard', 'no-select', classes.copyToClipboard)}
            >
              Copy to Clipboard
            </div>
          </CopyToClipboard>
          <div
            onClick={handleSave}
            className={classNames('save', 'no-select', classes.saveSubmitButton, classes.modalButton,
                                  props.readOnly ? 'disabled' : null)}
          >
            SAVE
          </div>
        </div>
        {navigating ?
          <ConfirmationModal
            message={`You haven't saved the track narrative you were editing.`}
            display={true}
            setDisplay={setNavigating}
            handleYes={() => props.setDisplay(false)}
            focusedElement={null}
          />
          :
          null}
      </div>
    </Modal>
  );
};

export const StyledTrackNarrativeModal = styled(TrackNarrativeModal)`
  margin-top: -350px !important;

  .track-narrative-header {
    display: flex;
    height: 30px;
    align-self: stretch;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 942px;
    padding: 2px;
    margin-top: -2px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    background: ${theme.color.backgroundHighlighted};
  }

  .narrative-text {
    margin-top: 8px;
    width: 100%;
    align-self: flex-start;
    justify-self: flex-start;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-align: left;
  }
  
  .narrative-text-wrapper {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    overflow-y: auto !important;
  }
  
  .narrative-input {
    padding: 0 2px;
  }
  
  .cancel {
    padding-top: 3px;
    padding-right: 3px;
  }
  
  .button-section {
    height: 64px;
  }
  
  .uneditable {
    pointer-events: none;
  }
  
  .scoi-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 9px;
    width: 942px;
    background: ${theme.color.backgroundScoiContainer};
    border-left: 2px solid ${theme.color.backgroundFocus};
    border-right: 2px solid ${theme.color.backgroundFocus};
    margin: 0 -2px;
  }
  
  .scoi-queue-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .scoi-queue {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    max-height: 56px;
    overflow-y: auto; 
  }
  
  .track-narrative {
    background: none; //no background in order to let highligts show
  }
  
  .track-narrative-display {
    color: rgba(0, 0, 0, 0); //hide text
    overflow-y: hidden;
    white-space: pre-wrap;
    text-align: left;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    padding-top: 6px !important;
    height: 526px;
    margin-bottom: -526px;
  }
`;
