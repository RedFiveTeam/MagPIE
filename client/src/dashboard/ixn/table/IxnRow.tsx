import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import IxnModel from '../../../store/ixn/IxnModel';
import { Box, createMuiTheme, createStyles, TextField, Theme, Tooltip, withStyles } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import { crayonBox } from '../../../resources/crayonBox';
import { Moment } from 'moment';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import classNames from 'classnames';
import theme from '../../../resources/theme';
import { StyledDeleteButtonVector } from '../../../resources/icons/DeleteButtonVector';

const moment = require('moment');

interface MyProps {
  ixn: IxnModel | null;
  segment: SegmentModel;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

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

export const IxnRow: React.FC<MyProps> = props => {
  const classes = useStyles();

  const localTheme = createMuiTheme({
    palette: {
      primary: {
        main: crayonBox.skyBlue,
      },
      secondary: {
        main: "#323232"
      }
    },
    overrides: {
      MuiInput: {
        input: {
          "&::placeholder": {
            color: "#838383"
          },
          color: "white", // if you also want to change the color of the input, this is the prop you'd use
        }
      }
    }
  });

  enum Action {
    NONE,
    DELETING,
    SUBMITTING
  }

  let disabled = props.ixn !== null;
  const [exploitAnalyst, setExploitAnalyst] = React.useState('');
  const [time, setTime] = React.useState('');
  const [activity, setActivity] = React.useState('');
  const [track, setTrack] = React.useState('');
  const [timeInvalidError, setTimeInvalidError] = React.useState(false);
  const [timeOutOfBoundsError, setTimeOutOfBoundsError] = React.useState(false);
  const [action, setAction] = useState(Action.NONE);

  const resetAction = () => {
    setTimeout(() => {
      setAction(Action.NONE);
    }, 500);
  };

  const handleAction = () => {
    switch (action) {
      case Action.DELETING:
        if (props.ixn) {
          props.deleteIxn(props.ixn);
          resetAction();
        } else {
          setExploitAnalyst('');
          setTime('');
          setActivity('');
          setTrack('');
          resetAction();
        }
        break;
      case Action.SUBMITTING:
        validateAndSubmit();
        break;
    }
  };

  useEffect(
    handleAction,
    [action]
  );

  const bringElementIntoView = (elementId: string) => {
    setTimeout(() => {
      let element = document.getElementById(elementId);
      if (element)
        element.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }, 200);
  };

  const convertTimeStringToMoment = (time: string): Moment => {
    time = time.replace(/_/g, '0');

    let hours: number = +time.substr(0, 2);
    let minutes: number = +time.substr(3, 2);
    let seconds: number = +time.substr(6, 2);

    let timeDate: Date = new Date(
      (hours * 3600 +
        minutes * 60 +
        seconds)
      * 1000
    );
    return moment(timeDate).utc();
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

  const inputTrack = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrack(event.target.value);
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
      if (!currentTarget.contains(document.activeElement) && action === Action.NONE) {
        setAction(Action.SUBMITTING);
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
        props.postIxn(new IxnModel(null, props.segment.rfiId, props.segment.exploitDateId, props.segment.targetId, props.segment.id,
          exploitAnalyst, convertTimeStringToMoment(time), activity, track));
        setTime('');
        setActivity('');
        setTrack('');
        bringElementIntoView(('ixn-row-' + props.segment.id + '-input'));
        setTimeout(() => {
          //Focus on time input field
          document.getElementById('ixn-time-' + (props.segment.id) + '-new')!.focus();
          let element: any = document.getElementById('ixn-time-' + (props.segment.id) + '-new')!;
          //Put cursor at beginning of time input field
          if (element instanceof HTMLInputElement)
            element.setSelectionRange(0, 0);
        }, 150);
      }
    }

    resetAction();
  };

  const handleDeleteClick = () => {
    setAction(Action.DELETING);
  };

  const inputProps = {
    id: 'ixn-time-' + (props.segment.id) + '-' + (props.ixn !== null ? props.ixn.id!.toString() : 'new'),
  };

  interface DeleteButtonProps {
    className?: string;
  }

  const DeleteButton: React.FC<DeleteButtonProps> = props => {
    //@ts-ignore
    const DeleteTooltip = withStyles((localTheme: Theme) => ({
      tooltip: {
        backgroundColor: theme.color.backgroundToolTip,
        color: theme.color.fontToolTip,
        width: 120,
        height: 22,
        borderRadius: 11,
        fontSize: '12px',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    }))(Tooltip);

    return (
      <div className={props.className}>
        <DeleteTooltip title={'Delete Interaction'}>
          <div className={"delete-ixn-button"}
            // id={"delete" + (props.target !== null ? ("" + props.target.id) : "-add-tgt-row")}
               onClick={handleDeleteClick}
          >
            <StyledDeleteButtonVector/>
          </div>
        </DeleteTooltip>
      </div>
    )
  };

  return (
    <div className={props.className} id={('ixn-row-' + props.segment.id + '-' + (props.ixn ? props.ixn!.id : 'input'))}>
      {disabled ?
        <Box
          borderRadius={8}
          className={"ixn-row-box"}
        >
          <div className={classNames('ixn-data-cell', 'exploit-analyst')}>
            {props.ixn!.exploitAnalyst}
          </div>
          <div className={classNames('ixn-data-cell', 'time')}>
            {props.ixn!.time.utc().format("HH:mm:ss") + "Z"}
          </div>
          <div className={classNames('ixn-data-cell', 'activity')}>
            {props.ixn!.activity}
          </div>
          <div className={classNames('ixn-data-cell', 'track')}>
            {props.ixn!.track}
          </div>
          <DeleteButton className={'delete-ixn-button-container'} />
        </Box>
        :
        <>
          <form className={classNames("ixn-form", disabled ? "add-ixn-form" : "edit-ixn-form")}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    setAction(Action.SUBMITTING);
                  }
                }}
                onBlur={formBlur}
          >
            <Box
              borderRadius={8}
              className={"ixn-row-box"}
            >
              <ThemeProvider theme={localTheme}>
                <TextField
                  className={classNames("exploit-analyst", disabled ? null : 'input-disabled', classes.margin)}
                  value={exploitAnalyst}
                  disabled={disabled}
                  required
                  placeholder="Name"
                  onChange={inputExploitAnalyst}
                />
                <Input
                  className={classNames('time', disabled ? null : 'input-disabled', classes.margin)}
                  value={time}
                  onChange={inputTime}
                  inputComponent={IxnTimeTextMask as any}
                  error={(timeInvalidError && time !== "") || timeOutOfBoundsError}
                  disabled={disabled}
                  onBlur={timeBlur}
                  required
                  inputProps={inputProps}
                />
                <TextField
                  multiline
                  className={classNames("activity", disabled ? null : 'input-disabled', classes.margin)}
                  value={activity}
                  disabled={disabled}
                  onChange={inputActivity}
                  placeholder={"Activity"}
                />
                <TextField
                  className={classNames("track", disabled ? null : 'input-disabled', classes.margin)}
                  value={track}
                  disabled={disabled}
                  onChange={inputTrack}
                  placeholder={"###-###"}
                  onKeyDown={(e) => {
                    if (e.which === 9 && !e.shiftKey) {
                      setAction(Action.SUBMITTING);
                    }
                  }}
                />
                <DeleteButton className={'delete-ixn-button-container'}/>
              </ThemeProvider>
            </Box>
          </form>
          {timeOutOfBoundsError ?
            <div className={"input-error-msg"}
                 id={('time-oob-error-' + props.segment.id)}
            >
              The time you entered does not fall within the segment timeline
            </div>
            : null
          }
          {timeInvalidError && time !== "" ?
            <div className={"input-error-msg"}
                 id={('time-invalid-error-' + props.segment.id)}
            >
              Invalid time.
            </div>
            : null
          }
        </>
      }
    </div>
  );
};

export const StyledIxnRow = styled(IxnRow)`
  .exploit-analyst {
    width: 146px;
  }
  
  .time {
    width: 98px;
  }

  .activity {
    width: 406px;
  }
  
  .track {
    width: 75px;
  }
  .ixn-data-cell {
    margin: 8px 8px 8px 8px;
    overflow-wrap: break-word;
  }

  .ixn-row-box {
    min-height: 62px;
    //width: 100%;
    margin-top: 8px;
    background-color: #464646;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
  }

  .input-error-msg {
    color: ${theme.color.fontError};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightRow};
    line-height: 19px;
  }
  
  .delete-ixn-button-container {
    display: flex;
    align-self: stretch;
  }
  
  .delete-ixn-button {
    border-left: 4px solid ${crayonBox.softMetal};
    width: 90px;
    height: inherit;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex: 1 1 auto;
  }
`;