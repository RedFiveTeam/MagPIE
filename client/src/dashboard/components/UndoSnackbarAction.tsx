import IxnModel from '../../store/ixn/IxnModel';
import { Button, IconButton } from '@material-ui/core';
import SnackbarDismissIcon from '../../resources/icons/SnackbarDismissIcon';
import * as React from 'react';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';

type UndoTypes = IxnModel | SegmentModel;

export const UndoSnackbarAction = (key: any, data: UndoTypes, postData: (data: any) => void,
                                   closeSnackbar: (key: any) => void, className: string) => {
  return (
  <>
    <Button
      variant={'text'}
      color={'primary'}
      onClick={() => {
        postData(data);
        closeSnackbar(key);
      }}
      className={className}
    >
      UNDO
    </Button>
    <IconButton
      onClick={() => closeSnackbar(key)}
      color={'primary'}
    >
      <SnackbarDismissIcon/>
    </IconButton>
  </>
)};
