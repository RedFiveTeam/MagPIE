import 'date-fns';
import * as React from 'react';
import classNames from 'classnames';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Box, createMuiTheme, createStyles, InputAdornment, MuiThemeProvider, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { deleteExploitDate, updateRfiDate } from '../../../store/tgt/Thunks';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import theme from '../../../resources/theme';
import createPalette from '@material-ui/core/styles/createPalette';

interface Props {
  rfiId: number;
  updateRfiDate: (rfiId: number, date: Date, oldDate?: ExploitDateModel) => void;
  setAddDate: (addDate: boolean) => void;
  uKey: number
  deleteExploitDate: (exploitDateId: number) => void;
  hasTgts: boolean;
  exploitDateDisplay?: string;
  exploitDate?: ExploitDateModel;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global': {
    '.MuiPickersToolbar-toolbar': {
      backgroundColor: '#000000',
    },
  },
  root: {
    height: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 1306,
    maxWidth: 1306,
  },
  dateInput: {
    width: '200px',
    textAlign: 'center',
  },
  separator: {
    position: 'relative',
    zIndex: 2,
    marginTop: 0,
    bottom: 10,
    width: 1306,
    height: '2px',
    borderRadius: '4px',
    backgroundColor: 'white',
  },
  dateInputField: {
    position: 'relative',
    bottom: 0,
  },
}));

export const TgtDateDivider: React.FC<Props> = props => {
  const classes = useStyles();

  const muiPalette = createPalette({
    type: 'dark',
    primary: {
      main: theme.color.buttonAddDate,
    },
  });

  const localTheme = createMuiTheme({
    palette: muiPalette
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [displayModal, setDisplayModal] = React.useState(false);

  function isValidDate(date: Date): boolean {
    return Object.prototype.toString.call(date) !== '[object Date]' ? false
      : !(isNaN(date.getTime()) || date > new Date());
  }

  function handleChange(date: Date | null) {
    setSelectedDate(date);
    if (date !== null && isValidDate(date)) {
      props.updateRfiDate(props.rfiId, date, (props.exploitDate ? props.exploitDate : undefined));
      props.setAddDate(false);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  }

  function handleDeleteClick() {
    if (props.hasTgts) {
      setDisplayModal(true);
    } else {
      checkForExploitDate();
    }
  }

  function deleteExploitDateById(exploitDateId: number) {
    props.deleteExploitDate(exploitDateId);
    setDisplayModal(false);
  }

  function checkForExploitDate() {
    if (props.exploitDate) {
      deleteExploitDateById(props.exploitDate.id);
    } else {
      props.setAddDate(false);
    }
  }

  return (
    <div className={classNames('segment-divider', props.className, classes.root)} key={props.uKey}>
      <MuiThemeProvider theme={localTheme}>
        <Box className={classes.dateInputField}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classNames(classes.dateInput, 'newExploitDate-input')}
              InputProps={{
                startAdornment: (
                  <InputAdornment onClick={handleDeleteClick} position="start">
                    <DeleteButtonX
                      className={'delete-date'}
                      aria-label="delete date"
                    />
                  </InputAdornment>
                ),
              }}
              margin="normal"
              id={'date-picker-dialog' + (props.exploitDate ? props.exploitDate.exploitDate : '')}
              label=""
              format="MM/dd/yyyy"
              placeholder={'MM/DD/YYYY'}
              value={(props.exploitDate ? props.exploitDateDisplay : selectedDate)}
              onChange={date => handleChange(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              maxDate={new Date()}
              error={false}
              helperText={''}
              autoFocus={props.exploitDate === undefined}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Box className={classNames(classes.separator, 'separator-line')}>
          &nbsp;
        </Box>
        <DeleteConfirmationModal
          deletingItem={props.exploitDate ? props.exploitDate.exploitDate.format('MM/DD/YYYY') : ''}
          display={displayModal}
          setDisplay={setDisplayModal}
          handleYes={checkForExploitDate}
        />
      </MuiThemeProvider>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateRfiDate: updateRfiDate,
  deleteExploitDate: deleteExploitDate,
};

export const StyledTgtDateDivider = styled(connect(mapStateToProps, mapDispatchToProps)(TgtDateDivider))`
  font-family: ${theme.font.familyRegion};
  font-weight: ${theme.font.weightBold};
  font-size: ${theme.font.sizeRegion};
  color: ${theme.color.fontPrimary};
  width: 100%;
  height: 100%;
 
  .separator-line {
    background: ${theme.color.fontPrimary};
  }

  .separator-title {
    text-align: center;
  }
`;
