import { Modal, TextField } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import theme, { longInputStyles, rowStyles } from '../../../resources/theme';
import IxnModel from '../../../store/ixn/IxnModel';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { DismissSnackbarAction } from '../../components/InformationalSnackbar';
import styled from 'styled-components';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import { ConfirmationModal } from '../../components/ConfirmationModal';

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

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const [navigating, setNavigating] = useState(false);
  const inputTrackNarrative = (event: any) => {
    setTrackNarrative(event.target.value);
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

              :
              <div className={'narrative-text'}>
                {trackNarrative}
              </div>
            }
          </div>
        </form>
        <div className={classes.modalConfirmation}>
          <CopyToClipboard onCopy={() => displaySnackbar('Copied to Clipboard')} text={trackNarrative}>
            <div
              className={classNames('copy-to-clipboard', classes.copyToClipboard)}
            >
              Copy to Clipboard
            </div>
          </CopyToClipboard>
          <div
            onClick={handleSave}
            className={classNames('save', classes.saveSubmitButton, classes.modalButton,
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
  )
    ;
};

export const StyledTrackNarrativeModal = styled(TrackNarrativeModal)`
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
    padding: 4px !important;
    overflow-y: auto !important;
  }
  
  .narrative-input {
    padding: 0 2px;
  }
  
  .cancel {
    padding-top: 3px;
    padding-right: 3px;
  }
`;
