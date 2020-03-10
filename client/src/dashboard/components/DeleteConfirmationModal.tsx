import { createStyles, Modal, Theme } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../resources/theme';

interface MyProps {
  deletingItem: string;
  display: boolean;
  setDisplay: (display: boolean) => void;
  handleYes: () => void;
}

const useStyles = makeStyles((localTheme: Theme) => createStyles({
  modal: {
    marginLeft: -271,
    marginTop: -94,
    width: 542,
    height: 188,
  },
  modalBody: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontFamily: theme.font.familyHeader,
    fontWeight: theme.font.weightBold,
    fontSize: theme.font.sizeHeader,
    color: theme.color.deleteButton,
    textAlign: 'center',
    outline: 'none',
    backgroundColor: theme.color.backgroundModal,
    borderRadius: 8,
    borderColor: theme.color.borderModal,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  modalConfirmation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 162,
  },
  modalYes: {
    cursor: 'pointer',
    color: theme.color.fontBackgroundInactive,
    '&:hover': {
      color: theme.color.deleteButton,
      textShadow: '0px 0px 4px #FFFFFF',
    },
  },
  modalNo: {
    cursor: 'pointer',
    '&:hover': {
      textShadow: '0px 0px 4px #FFFFFF',
    },
  },
}));


export const DeleteConfirmationModal: React.FC<MyProps> = props => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.display}
      onClose={() => props.setDisplay(false)}
      style={{
        top: '50%',
        left: '50%',
      }}
      className={classNames('delete-modal', classes.modal)}
    >
      <div className={classes.modalBody}>
        <div className={'modal-text'}>Are you sure you want to delete <br/>{props.deletingItem}?</div>
        <div className={'modal-text'} style={{width: 339}}>All associated data will be erased.</div>
        <div className={classes.modalConfirmation}>
            <span className={classNames('modal-yes', classes.modalYes)} onClick={() => {props.handleYes(); props.setDisplay(false)}}>
              YES
            </span>
          <span className={classNames('modal-no', classes.modalNo)} onClick={() => props.setDisplay(false)}>
              NO
            </span>
        </div>
      </div>
    </Modal>
  );
};
