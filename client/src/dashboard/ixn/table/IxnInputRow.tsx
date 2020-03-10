import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import IxnModel, { IxnStatus } from '../../../store/ixn/IxnModel';
import { Box, ThemeProvider, TextField } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import classNames from 'classnames';
import theme, { rowStyles, rowTheme } from '../../../resources/theme';
import { convertTimeStringToMoment, RowAction } from '../../../utils';
import { IxnDeleteButton } from './IxnDeleteButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import DoesNotMeetEeiButton from '../../components/statusButtons/DoesNotMeetEeiButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';

interface MyProps {
  ixn: IxnModel | null;
  segment: SegmentModel;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  setEditIxn: (ixnId: number) => void;
  className?: string;
}

interface TextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

function IxnTimeTextMask(props: TextMaskCustomProps) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/, 'Z']}
      placeholderChar={'_'}
      showMask
    />
  );
}

export const IxnInputRow: React.FC<MyProps> = props => {
  const classes = rowStyles();

  const [exploitAnalyst, setExploitAnalyst] = React.useState(props.ixn ? props.ixn.exploitAnalyst : props.tgtAnalyst);
  const [time, setTime] = React.useState(props.ixn ? props.ixn.time.format('HH:mm:ss') : '');
  const [activity, setActivity] = React.useState(props.ixn ? props.ixn.activity : '');
  const [trackAnalyst, setTrackAnalyst] = React.useState(props.ixn ? props.ixn.trackAnalyst : '');
  const [leadChecker, setLeadChecker] = React.useState(props.ixn ? props.ixn.leadChecker : '');
  const [finalChecker, setFinalChecker] = React.useState(props.ixn ? props.ixn.finalChecker : '');

  const [timeInvalidError, setTimeInvalidError] = React.useState(false);
  const [timeOutOfBoundsError, setTimeOutOfBoundsError] = React.useState(false);
  const [action, setAction] = useState(RowAction.NONE);

  const resetAction = () => {
    setTimeout(() => {
      setAction(RowAction.NONE);
    }, 500);
  };

  const handleAction = () => {
    switch (action) {
      case RowAction.DELETING:
        if (props.ixn) {
          props.deleteIxn(props.ixn);
          resetAction();
        } else {
          setExploitAnalyst('');
          setTime('');
          setActivity('');
          setTrackAnalyst('');
          setLeadChecker('');
          setFinalChecker('');
          resetAction();
        }
        break;
      case RowAction.SUBMITTING:
        props.setTgtAnalyst(exploitAnalyst.trim());
        validateAndSubmit();
        break;
    }
  };

  useEffect(
    handleAction,
    [action],
  );

  const bringElementIntoView = (elementId: string) => {
    setTimeout(() => {
      let element = document.getElementById(elementId);
      if (element)
        element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }, 450);
  };

  const checkTimeInvalid = (time: string): boolean => {
    time = time.replace(/_/g, '0');
    return time.match(/([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/) === null;
  };

  const checkTimeOutOfBounds = (time: string): boolean => {
    let timeMoment = convertTimeStringToMoment(time);
    return (
      (timeMoment.isBefore(props.segment.startTime) ||
        timeMoment.isAfter(props.segment.endTime))
      && !(checkTimeInvalid(time))
    );
  };

  const inputExploitAnalyst = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExploitAnalyst(event.target.value);
  };

  const inputTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTime = event.target.value;
    setTime(newTime);

    let timeInvalidErrorLocal = checkTimeInvalid(newTime);
    setTimeInvalidError(timeInvalidErrorLocal);

    if (timeInvalidErrorLocal)
      bringElementIntoView('time-invalid-error-' + props.segment.id);
  };

  const inputActivity = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newActivity = event.target.value;
    if (newActivity.charAt(newActivity.length - 1) !== '\n') //Ignore new lines
      setActivity(event.target.value);
  };

  const inputTrackAnalyst = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackAnalyst(event.target.value);
  };

  const inputLeadChecker = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeadChecker(event.target.value);
  };

  const inputFinalChecker = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinalChecker(event.target.value);
  };

  const timeBlur = () => {
    let newTime = time.replace(/_/g, '0');
    setTime(newTime);

    let timeOutOfBoundsErrorLocal = checkTimeOutOfBounds(newTime);
    setTimeOutOfBoundsError(timeOutOfBoundsErrorLocal);

    if (timeOutOfBoundsErrorLocal)
      bringElementIntoView('time-oob-error-' + props.segment.id);
  };

  function formBlur(event: any) {
    let currentTarget: any = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action === RowAction.NONE) {
        setAction(RowAction.SUBMITTING);
      }
    }, 200);
  }

  const validateAndSubmit = () => {
    let timeInvalidErrorLocal = checkTimeInvalid(time);
    let timeOutOfBoundsErrorLocal = checkTimeOutOfBounds(time);
    setTimeInvalidError(timeInvalidErrorLocal);
    setTimeOutOfBoundsError(timeOutOfBoundsErrorLocal);

    if (!timeInvalidErrorLocal && !timeOutOfBoundsErrorLocal) {
      if (props.segment.id) {
        props.postIxn(new IxnModel(props.ixn ? props.ixn.id : null, props.segment.rfiId, props.segment.exploitDateId,
          props.segment.targetId, props.segment.id, exploitAnalyst.trim(), convertTimeStringToMoment(time),
          activity.trim(), '', trackAnalyst.trim(), props.ixn ? props.ixn.status : IxnStatus.NOT_STARTED,
          leadChecker.trim(), finalChecker.trim()));

        if (props.ixn === null)
          bringElementIntoView(('ixn-row-' + props.segment.id + '-input'));
      }
    }

    resetAction();
  };

  const handleDeleteClick = () => {
    setAction(RowAction.DELETING);
  };

  const inputProps = {
    id: 'ixn-time-' + (props.segment.id) + '-' + (props.ixn !== null ? props.ixn.id!.toString() : 'new'),
  };

  let isBlank = exploitAnalyst === '' &&
    time === '' &&
    activity === '' &&
    trackAnalyst === '' &&
    leadChecker === '' &&
    finalChecker === '';

  return (
    <div className={props.className} id={'ixn-row-input'}>
      <ThemeProvider theme={rowTheme}>
        <form className={classNames('ixn-form', 'edit-ixn-form')}
              onKeyPress={(e) => {
                if (e.which === 13) {
                  setAction(RowAction.SUBMITTING);
                }
              }}
              onBlur={formBlur}
        >
          <Box
            borderRadius={8}
            className={'ixn-row-box'}
          >
            <div className={classes.margin}>
              <TextField
                className={classNames('exploit-analyst', 'name')}
                value={exploitAnalyst}
                placeholder="Name"
                onChange={inputExploitAnalyst}
                autoFocus={props.tgtAnalyst === ''}
              />
            </div>
            <div className={classes.margin}>
              <Input
                className={classNames('time')}
                value={time}
                onChange={inputTime}
                inputComponent={IxnTimeTextMask as any}
                error={(timeInvalidError && time !== '') || timeOutOfBoundsError}
                onBlur={timeBlur}
                required
                inputProps={inputProps}
                autoFocus={props.tgtAnalyst !== ''}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                multiline
                className={classNames('activity')}
                value={activity}
                onChange={inputActivity}
                placeholder={'Activity'}
              />
            </div>
            <div className={classNames(classes.margin, 'track')}>
              {props.ixn ? props.ixn.track : '\xa0'}
            </div>
            <div className={classes.margin}>
              <TextField
                className={classNames('track-analyst', 'name')}
                value={trackAnalyst}
                placeholder="Name"
                onChange={inputTrackAnalyst}
              />
            </div>
            <div className={classNames('status', classes.margin)}>
              {props.ixn === null || props.ixn.status === IxnStatus.NOT_STARTED ?
                <NotStartedButton buttonClass={classes.statusUnclickable}/>
                : props.ixn.status === IxnStatus.IN_PROGRESS ?
                  <InProgressButton buttonClass={classes.statusUnclickable}/>
                  : props.ixn.status === IxnStatus.DOES_NOT_MEET_EEI ?
                    <DoesNotMeetEeiButton buttonClass={classes.statusUnclickable}/>
                    : <CompletedButton buttonClass={classes.statusUnclickable}/>}
            </div>
            <div className={classes.margin}>
              <TextField
                className={classNames('lead-checker', 'name')}
                value={leadChecker}
                placeholder="Name"
                onChange={inputLeadChecker}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                className={classNames('final-checker', 'name')}
                value={finalChecker}
                placeholder="Name"
                onChange={inputFinalChecker}
                onKeyDown={(e) => {
                  if (e.which === 9 && !e.shiftKey) {
                    setAction(RowAction.SUBMITTING);
                  }
                }}
              />
            </div>
            <IxnDeleteButton
              handleClick={handleDeleteClick}
              className={classNames(
                'delete-ixn-button-container',
                (props.ixn === null && isBlank) || props.ixn ? 'delete-disabled' : null,
              )}
            />
          </Box>
        </form>
      </ThemeProvider>
      {timeOutOfBoundsError ?
        <div className={'input-error-msg'}
             id={('time-oob-error-' + props.segment.id)}
        >
          The time you entered does not fall within the segment timeline
        </div>
        : null
      }
      {timeInvalidError && time !== '' ?
        <div className={'input-error-msg'}
             id={('time-invalid-error-' + props.segment.id)}
        >
          Invalid time.
        </div>
        : null
      }
    </div>
  );
};

export const StyledIxnInputRow = styled(IxnInputRow)`
  .input-error-msg {
    color: ${theme.color.fontError};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightRow};
    line-height: 19px;
  }
  
  .delete-disabled {
    pointer-events: none;
  
    svg {
      filter: none;
      
      path {
        fill: ${theme.color.buttonRowDisabled};
      }
    }
  }
`;
