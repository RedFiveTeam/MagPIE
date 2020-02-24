import * as React from 'react';
import MaskedInput from 'react-text-mask';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { InputAdornment } from '@material-ui/core';
import styled from 'styled-components';
import classNames from 'classnames';
import globalTheme from '../../resources/theme';
import theme from '../../resources/theme';
import { TargetModel } from '../../store/tgt/TargetModel';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { Moment } from 'moment';

const moment = require('moment');

interface Props {
  target: TargetModel;
  segment: SegmentModel | null;
  postSegment: (segment: SegmentModel) => void;
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
      // The placeholder character is a Mongolian zero so that you can overwrite them with '0'.
      placeholderChar={'0'}
      showMask
    />
  );
}

const initZero = '00:00:00';

export const SegmentDivider: React.FC<Props> = props => {
  const classes = useStyles();

  const [segmentStartString, setSegmentStartString] = React.useState(initZero);
  const [segmentEndString, setSegmentEndString] = React.useState(initZero);
  const [segmentStartError, setSegmentStartError] = React.useState(false);
  const [segmentEndError, setSegmentEndError] = React.useState(false);

  const segmentError = (segment: string): boolean => {
    // segment = segment.replace(/\u1810/g, '0');
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

  const convertSegmentStringToMoment = (segment: string): Moment => {
    // segment = segment.replace(/\u1810/g, '0');

    let hours: number = +segment.substr(0, 2);
    let minutes: number = +segment.substr(3, 2);
    let seconds: number = +segment.substr(6, 2);

    let segmentDate: Date = new Date(
      (hours * 3600 +
        minutes * 60 +
        seconds)
      * 1000
    );
    return moment(segmentDate).utc();
  };

  const validateAndSubmit = () => {
    if (segmentError(segmentEndString)) {
      setSegmentEndError(true);
    } else if (!segmentStartError) {
      let segmentStart = convertSegmentStringToMoment(segmentStartString);
      let segmentEnd = convertSegmentStringToMoment(segmentEndString);
      if (segmentStart.isBefore(segmentEnd)) {
        let segment = new SegmentModel(
          props.segment ? props.segment.id : null,
          props.target.rfiId,
          props.target.exploitDateId,
          props.target.id,
          segmentStart,
          segmentEnd
        );
        props.postSegment(segment);
      } else {
        setSegmentEndError(true);
      }
    }
  };

  return (
    <div className={classNames(props.className)}>
      <div className={'segment-divider-placeholder'}>
        <div className={'segment-divider--bar'}/>
        <div className={'segment-divider--box'}>
          {props.segment !== null ?
            <div className={'add-segment-form'}>
              <div className={classNames('segment-value', 'segment-start')}>
                {props.segment.startTime.format("HH:mm:ss") + "Z"}
              </div>
              <div className={'segment-spacer'}>
                <span>-</span>
              </div>
              <div className={classNames('segment-value', 'segment-end')}>
                {props.segment.endTime.format("HH:mm:ss") + "Z"}
              </div>
            </div>
            :
            <div className={'add-segment-form'}>
              <div className={'segment-value'}>
                <FormControl>
                  <div className={'segment-input-container'}>
                    <Input
                      className={classNames('segment-start',
                        segmentStartString === initZero && props.segment === null ? 'segment-input-empty' : '')}
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
                      disabled={props.segment !== null}
                      onKeyPress={(e) => {
                        if (e.which === 13) {
                          validateAndSubmit();
                        }
                      }}
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
                      className={classNames('segment-end',
                        segmentEndString === initZero && props.segment === null ? 'segment-input-empty' : '')}
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
                      disabled={props.segment !== null}
                      onBlur={validateAndSubmit}
                      onKeyPress={(e) => {
                        if (e.which === 13) {
                          validateAndSubmit();
                        }
                      }}
                    />
                  </div>
                </FormControl>
              </div>
            </div>
          }
        </div>
      </div>
      {segmentStartError || segmentEndError ?
        <div className={'segment-error'}>Error: invalid time.</div> :
        null}
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
    width: 1430px;
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
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: ${theme.color.segmentDivider};
    border: 4px solid;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
    margin-top: -2px;
  }
  
  .segment-input-container {
    width: 72px;
  }
`
