import { Modal } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { longInputStyles } from '../../resources/theme';

interface MyProps {
  deletingItem: string;
  display: boolean;
  setDisplay: (display: boolean) => void;
  handleYes: () => void;
}

export const DeleteConfirmationModal: React.FC<MyProps> = props => {
  const classes = longInputStyles();

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
      className={classNames('delete-modal', classes.deleteModal)}
    >
      <div className={classes.modalBody}>
        <div className={'modal-text'}>Are you sure you want to delete <br/>{props.deletingItem}?</div>
        <div className={'modal-text'}>All associated data will be erased.</div>
        <div className={classes.modalConfirmation}>
          <span className={classNames('modal-yes', classes.modalButton)} onClick={() => {
            props.handleYes();
            props.setDisplay(false);
          }}>
            YES
          </span>
          <span className={classNames('modal-no', classes.modalButton)} onClick={() => props.setDisplay(false)}>
            NO
          </span>
        </div>
      </div>
    </Modal>
  );
};
