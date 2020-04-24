import { Modal } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import { longInputStyles } from '../../resources/theme';

interface MyProps {
  display: boolean;
  setDisplay: (display: boolean) => void;
  handleYes: () => void;
}

export const NavigateAwayConfirmationModal: React.FC<MyProps> = (props) => {
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
        <div className={'modal-text'}>You haven't saved the target you were editing.</div>
        <div className={'modal-text'}>Do you want to leave without saving?</div>
        <div className={classes.modalConfirmation}>
          <span className={classNames('modal-yes', classes.modalButton)} onClick={() => {
            props.handleYes();
            props.setDisplay(false);
          }}>
            Leave Page
          </span>
          <span className={classNames('modal-no', classes.modalButton)} onClick={() => props.setDisplay(false)}>
            Stay on Page
          </span>
        </div>
      </div>
    </Modal>
  );
};
