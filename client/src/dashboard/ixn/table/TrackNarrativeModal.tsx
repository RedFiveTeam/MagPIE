import { createStyles, Modal, TextField, Theme } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme, { rowStyles } from '../../../resources/theme';
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

const useStyles = makeStyles((localTheme: Theme) => createStyles(
  {
    modal: {
      marginLeft: -471,
      marginTop: -301,
      width: 942,
      height: 602,
    },
    modalBody: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontFamily: theme.font.familyHeader,
      fontWeight: theme.font.weightMedium,
      fontSize: theme.font.sizeRegion,
      lineHeight: '21px',
      color: theme.color.deleteButton,
      textAlign: 'center',
      outline: 'none',
      backgroundColor: theme.color.backgroundModal,
      borderRadius: 8,
      borderColor: theme.color.buttonOnBlack,
      borderWidth: 2,
      borderStyle: 'solid',
      padding: '8px',
    },
    modalConfirmation: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 162,
    },
    modalYes: {
      cursor: 'pointer',
      fontSize: theme.font.sizeHeader,
      color: theme.color.fontBackgroundInactive,
      '&:hover': {
        color: theme.color.deleteButton,
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    modalNo: {
      cursor: 'pointer',
      fontSize: theme.font.sizeHeader,
      '&:hover': {
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    modalTextfield: {
      width: 900,
    },
    modalTextfieldReadonlyContainer: {
      overflowWrap: 'break-word',
      overflowY: 'auto',
    },
    modalTextfieldReadonly: {
      width: 900,
      height: 525,
      textAlign: 'left',
      whiteSpace: 'pre-wrap',
    },
    modalInputContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: 917,
      height: 534,
      border: '1px solid ' + theme.color.modalInputBorder,
      borderRadius: 8,
    },
    buttonSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: 'available',
    },
    copyToClipboard: {
      fontSize: theme.font.sizeRow,
      cursor: 'pointer',
      width: 128,
      '&:hover': {
        textShadow: '0px 0px 4px #FFFFFF',
      },
    },
    spacer: {
      width: 128,
    },
  }));


export const TrackNarrativeModal: React.FC<MyProps> = props => {
  const classes = useStyles();
  const [trackNarrative, setTrackNarrative] = useState(
    props.ixn.trackNarrative === '' ?
      props.dateString + '\n\nSTART\n\n\n\nSTOP'
      :
      props.ixn.trackNarrative,
  );

  const rowClasses = rowStyles();

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
