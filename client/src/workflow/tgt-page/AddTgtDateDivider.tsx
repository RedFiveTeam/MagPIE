import 'date-fns';
import * as React from 'react';
import classNames from 'classnames';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Box, createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateRfiDate } from '../../state/actions';
import { ExploitDateModel } from './models/ExploitDateModel';

interface Props {
  rfiNum: string;
  addDate: boolean;
  updateRfiDate: (rfiNum: string, date: Date, oldDate?: ExploitDateModel) => void;
  setAddDate: (addDate: boolean) => void;
  key: number
  exploitDateString?: Date;
  exploitDate?: ExploitDateModel;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global': {
    '.MuiPickersToolbar-toolbar': {
      backgroundColor: '#000000'
    }
  },
  root: {
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 1306,
  },
  dateInput: {
    width: "200px",
    textAlign: 'center',
    margin: 'none',
  },
  separator: {
    position: 'relative',
    zIndex: 2,
    bottom: '57px',
    marginTop: 47,
    marginBottom: 12,
    width: 1306,
    height: '2px',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  dateInputField: {
    position: 'relative',
    bottom: 0,
  }
}));


export const AddTgtDateDivider: React.FC<Props> = props => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);


  function isValidDate(date: Date): boolean {
    return Object.prototype.toString.call(date) !== "[object Date]" ? false : !(isNaN(date.getTime()) || date > new Date());
  }

  function handleChange(date: Date | null) {
    setSelectedDate(date);
    if (date !== null && isValidDate(date)) {
      props.updateRfiDate(props.rfiNum, date, (props.exploitDate ? props.exploitDate : undefined));
      props.setAddDate(false);
    }
  }

  return (
    <div className={classNames('segment-divider', props.className, classes.root)} key={props.key}>
      <Box className={classes.dateInputField}>
      <MuiPickersUtilsProvider
        utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classNames(classes.dateInput)}
          margin="normal"
          id={"date-picker-dialog" + (props.exploitDate ? props.exploitDate.exploitDate : "")}
          label=""
          format="MM/dd/yyyy"
          placeholder={"MM/DD/YYYY"}
          value={(props.exploitDate ? props.exploitDate.exploitDate : selectedDate)}
          onChange={date => handleChange(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          maxDate={new Date()}
          // autoFocus={true}
          error={false}
          helperText={''}
        />
      </MuiPickersUtilsProvider>
      </Box>
      <Box className={classes.separator}>
        &nbsp;
      </Box>
    </div>
  )
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateRfiDate: updateRfiDate,
};


export const StyledAddTgtDateDivider = styled(connect(mapStateToProps, mapDispatchToProps)(AddTgtDateDivider))`
 font-family: ${(props) => props.theme.font.familyRegion};
  font-weight: ${(props) => props.theme.font.weightBold};
  font-size: ${(props) => props.theme.font.sizeRegion};
  color: ${(props) => props.theme.color.fontPrimary};
 
  .separator-line {

    background: ${(props) => props.theme.color.fontPrimary};
  }

  .separator-title {
    text-align: center;
  }
`;
