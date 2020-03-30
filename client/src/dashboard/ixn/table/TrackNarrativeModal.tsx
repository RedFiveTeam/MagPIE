import { Modal, TextField } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import { longInputStyles, rowStyles } from '../../../resources/theme';
import IxnModel from '../../../store/ixn/IxnModel';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { DismissSnackbarAction } from '../../components/InformationalSnackbar';

interface MyProps {
  setDisplay: (display: boolean) => void;
  ixn: IxnModel;
  submitTrackNarrative: (trackNarrative: string) => void;
  dateString: string;
}

export const TrackNarrativeModal: React.FC<MyProps> = props => {
  const classes = longInputStyles();
  const rowClasses = rowStyles();

  const [trackNarrative, setTrackNarrative] = useState(
    props.ixn.trackNarrative === '' ?
      props.dateString + '\n\nSTART\n\n\n\nSTOP'
      :
      props.ixn.trackNarrative,
  );

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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
    props.submitTrackNarrative(trackNarrative);
    props.setDisplay(false);
    displaySnackbar('Track Narrative Saved');
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
      className={classNames('delete-modal', classes.modal)}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <div className={classes.modalBody}>
        <form className={classNames('track-narrative-form')}
        >
          <div className={classes.modalInputContainer}>
            <span><b>{props.ixn.track}</b></span>
            <TextField
              className={classNames('track-narrative', classes.modalTextfield)}
              value={trackNarrative}
              onChange={inputTrackNarrative}
              autoFocus
              multiline
              rows={25}
              InputProps={{
                disableUnderline: true,
              }}
              inputProps={{
                id: 'track-narrative-' + props.ixn.id,
                className: 'track-narrative-input'
              }}
            />
          </div>
        </form>
        <div className={classes.buttonSection}>
          <div className={classes.spacer}>&nbsp;</div>
          <div
            className={classNames('cancel', classes.modalYes)}
            onClick={() => props.setDisplay(false)}
          >
            Cancel
          </div>
          <div
            onClick={handleSave}
            className={classNames('save', classes.modalNo)}
          >
            SAVE
          </div>
          <CopyToClipboard onCopy={() => displaySnackbar('Copied to Clipboard')} text={trackNarrative}>
            <div
              className={classNames('copy-to-clipboard', classes.copyToClipboard)}
            >
              Copy to Clipboard
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </Modal>
  );
};
