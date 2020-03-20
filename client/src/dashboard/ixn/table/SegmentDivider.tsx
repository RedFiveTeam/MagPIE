import * as React from 'react';
import { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import classNames from 'classnames';
import globalTheme from '../../../resources/theme';
import theme, { rowStyles } from '../../../resources/theme';
import { TargetModel } from '../../../store/tgt/TargetModel';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import IxnModel from '../../../store/ixn/IxnModel';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import EditButton from '../../../resources/icons/EditButton';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { convertTimeStringToMoment, RowAction } from '../../../utils';
import { useSnackbar } from 'notistack';
import { UndoSnackbarAction } from '../../components/UndoSnackbarAction';
import { postCancelAddSegment } from '../../../store/ixn';

interface Props {
  target: TargetModel;
  segment: SegmentModel | null;
  postSegment: (segment: SegmentModel) => void;
  postIxn: (ixn: IxnModel) => void;
  deleteSegment: (segment: SegmentModel) => void;
  setAddSegment: (addSegment: boolean) => void;
  hasIxns: boolean;
  editing: boolean;
  setEdit: (segmentId: number) => void;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    margin: {
      marginLeft: 0,
    },
  }),
);

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function SegmentTextMask(props: TextMaskCustomProps) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]}
      placeholderChar={'_'}
      showMask
    />
  );
}

export const SegmentDivider: React.FC<Props> = props => {
  const classes = useStyles();
  const rowClasses = rowStyles();

  const [segmentStartString, setSegmentStartString] = React.useState(props.segment ?
    props.segment.startTime.format('HH:mm:ss') : '__:__:__');
  const [segmentEndString, setSegmentEndString] = React.useState(props.segment ?
    props.segment.endTime.format('HH:mm:ss') : '__:__:__');
  const [segmentStartError, setSegmentStartError] = React.useState(false);
  const [segmentEndError, setSegmentEndError] = React.useState(false);
  const [displayModal, setDisplayModal] = React.useState(false);
  const [action, setAction] = useState(RowAction.NONE);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const resetAction = () => {
    setTimeout(() => {
      setAction(RowAction.NONE);
    }, 1000);
  };

  useEffect(() => {
    switch (action) {
      case (RowAction.DELETING):
        if (props.editing)
          handleCancel();
        else
          handleDelete();
        resetAction();
        break;
      case (RowAction.SUBMITTING):
        validateAndSubmit();
        resetAction();
        break;
    }
  }, [action]);

  const segmentError = (segment: string): boolean => {
    segment = segment.replace(/_/g, '0');
    return segment.match(/([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/) === null;
  };

  const changeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTime = event.target.value;

    setSegmentStartString(newTime);
    setSegmentStartError(segmentError(newTime));
  };

  const changeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTime = event.target.value;
    setSegmentEndString(newTime);
    setSegmentEndError(segmentError(newTime));
  };

  const validateAndSubmit = () => {
    setSegmentStartString(segmentStartString.replace(/_/g, '0'));
    setSegmentEndString(segmentEndString.replace(/_/g, '0'));
    let segmentStartErrorLocal = segmentError(segmentStartString.replace(/_/g, '0'));
    let segmentEndErrorLocal = segmentError(segmentEndString.replace(/_/g, '0'));

    setSegmentStartError(segmentStartErrorLocal);
    setSegmentEndError(segmentEndErrorLocal);

    if (!segmentStartErrorLocal && !segmentEndErrorLocal) {
      let segmentStart = convertTimeStringToMoment(segmentStartString);
      let segmentEnd = convertTimeStringToMoment(segmentEndString);
      if (segmentStart.isBefore(segmentEnd)) {
        let segment = new SegmentModel(
          props.segment ? props.segment.id : null,
          props.target.rfiId,
          props.target.exploitDateId,
          props.target.id,
          segmentStart,
          segmentEnd,
        );
        props.postSegment(segment);
      } else {
        setSegmentStartError(true);
      }
    }
  };

  const handleDeleteClick = () => {
    if (props.hasIxns)
      setDisplayModal(true);
    else
      setAction(RowAction.DELETING);
  };

  const handleCancel = () => {
    if (props.segment) {
      props.setEdit(-1);
    } else {
      props.setAddSegment(false);
      postCancelAddSegment(props.target.id)
        .catch(reason => console.log(reason));
    }
  };

  const handleDelete = () => {
    if (props.segment !== null) {
      enqueueSnackbar('You deleted ' + props.segment!.startTime.format('HH:mm:ss') + 'Z-' +
        props.segment!.endTime.format('HH:mm:ss') + 'Z', {
        action: (key) => UndoSnackbarAction(key, props.segment!, props.postSegment, closeSnackbar,
          rowClasses.snackbarButton),
        variant: 'info',
      });
      props.deleteSegment(props.segment);
    } else {
      props.setAddSegment(false);
      setDisplayModal(false);
    }
  };

  const handleEditClick = () => {
    if (props.segment && props.segment.id)
      props.setEdit(props.segment.id);
  };

  const handleBlur = (event: any) => {
    let currentTarget: any = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action === RowAction.NONE) {
        setAction(RowAction.SUBMITTING);
      }
    }, 500);
  };

  return (
    <div className={classNames(props.className)}>
      <div className={'segment-divider-placeholder'}>
        <div className={'segment-divider--bar'}/>
        <div className={'segment-divider--box'}>
          {!props.editing ?
            <div className={'add-segment-form'}>
              <div
                className={classNames('delete-segment', 'delete-cancel-segment-wrapper')}
                onClick={handleDeleteClick}>
                <DeleteButtonX className={'delete-cancel-segment'}/>
              </div>
              <div className={classNames('segment-value', 'segment-start')}>
                {props.segment!.startTime.format('HH:mm:ss') + 'Z'}
              </div>
              <div className={'segment-spacer'}>
                <span>-</span>
              </div>
              <div className={classNames('segment-value', 'segment-end')}>
                {props.segment!.endTime.format('HH:mm:ss') + 'Z'}
              </div>
              <div
                className={'edit-segment'}
                onClick={handleEditClick}
              >
                <EditButton/>
              </div>
            </div>
            :
            <div className={'add-segment-form'}
                 onBlur={handleBlur}
            >
              <div
                className={classNames('cancel-add-segment', 'delete-cancel-segment-wrapper')}
                onClick={() => setAction(RowAction.DELETING)}>
                <DeleteButtonX className={'delete-cancel-segment'}/>
              </div>
              <div className={'segment-value'}>
                <FormControl>
                  <div className={'segment-input-container'}>
                    <Input
                      className={classNames('segment-start')}
                      value={segmentStartString}
                      onChange={changeStart}
                      inputComponent={SegmentTextMask as any}
                      disableUnderline
                      endAdornment={
                        <InputAdornment
                          color={globalTheme.color.fontBackgroundInactive}
                          className={classes.margin}
                          position="end">
                          <div className={'zulu'}>Z</div>
                        </InputAdornment>
                      }
                      autoFocus={true}
                      error={segmentStartError}
                      onKeyPress={(e) => {
                        if (e.which === 13) {
                          setAction(RowAction.SUBMITTING);
                        }
                      }}
                      onBlur={() => setSegmentStartString(segmentStartString.replace(/_/g, '0'))}
                    />
                  </div>
                </FormControl>
              </div>
              <div className={'segment-spacer'}>
                <span>-</span>
              </div>
              <div className={'segment-value'}>
                <FormControl>
                  <div className={'segment-input-container'}>
                    <Input
                      className={classNames('segment-end')}
                      value={segmentEndString}
                      onChange={changeEnd}
                      inputComponent={SegmentTextMask as any}
                      disableUnderline
                      endAdornment={
                        <InputAdornment
                          className={classes.margin}
                          position="end">
                          <div className={'zulu'}>Z</div>
                        </InputAdornment>
                      }
                      error={segmentEndError}
                      onKeyPress={(e) => {
                        if (e.which === 13) {
                          setAction(RowAction.SUBMITTING);
                        }
                      }}
                      onBlur={() => setSegmentEndString(segmentEndString.replace(/_/g, '0'))}
                    />
                  </div>
                </FormControl>
              </div>
              <div
                className={'edit-segment'}
              >
                &nbsp;
              </div>
            </div>
          }
        </div>
      </div>
      {segmentStartError || segmentEndError ?
        <div className={'segment-error'}>Error: invalid time.</div> :
        null}
      <DeleteConfirmationModal
        deletingItem={props.segment ?
          props.segment.startTime.format('HH:mm:ss') + 'Z - ' + props.segment.endTime.format('HH:mm:ss') + 'Z' : ''}
        display={displayModal}
        setDisplay={setDisplayModal}
        handleYes={handleDelete}
      />
    </div>
  );
};

export const StyledSegmentDivider = styled(SegmentDivider)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .segment-divider-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 27px;
  }
  
  .segment-divider--bar {
    margin-bottom: -4px;
    width: 1500px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: ${theme.color.segmentDivider};
    border: 2px solid;
  }
  
  .segment-value {
    width: 72px;
  }
  
  .segment-input-empty {
    color: ${theme.color.fontBackgroundInactive}
  }
  
  .segment-spacer {
    width: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  .segment-divider--box {
    width: 306px;
    height: 30px;
    background: ${theme.color.backgroundHeader};
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: ${theme.color.segmentDivider};
    border: 4px solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-left: 36px;
    padding-right: 36px;
  }
  
  .add-segment-form {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
  
  .segment-error {
    color: ${theme.color.fontError};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightRow};
    line-height: 19px;
    margin-top: -24px;
    margin-bottom: 5px;
  }
  
  .zulu {
    color: ${theme.color.fontBackgroundInactive};
    margin-top: -1px;
  }
  
  .segment-input-container {
    width: 72px;
    padding-top: 1px;
  }
  
  .delete-cancel-segment {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  
  .delete-cancel-segment-wrapper {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 24px;
  }
  
  .edit-segment {
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: 24px;
    width: 12px;
  }
`;
