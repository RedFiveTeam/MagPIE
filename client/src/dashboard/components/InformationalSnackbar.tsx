import { IconButton } from '@material-ui/core';
import SnackbarDismissIcon from '../../resources/icons/SnackbarDismissIcon';
import * as React from 'react';

export const DismissSnackbarAction = (key: any, closeSnackbar: (key: any) => void, className: string) => {
  return (
    <>
      <IconButton
        onClick={() => closeSnackbar(key)}
        color={'primary'}
        className={className}
      >
        <SnackbarDismissIcon/>
      </IconButton>
    </>
  );
};
