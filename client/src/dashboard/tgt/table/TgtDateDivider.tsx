import 'date-fns';
import * as React from 'react';
import classNames from 'classnames';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, createStyles, InputAdornment, MuiThemeProvider, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { connect } from 'react-redux';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { deleteExploitDate } from '../../../store/tgt/Thunks';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import theme, { rowStyles } from '../../../resources/theme';
import createPalette from '@material-ui/core/styles/createPalette';
import { useSnackbar } from 'notistack';
import { UndoSnackbarAction } from '../../components/UndoSnackbarAction';
import { ExploitDatePostModel } from '../../../store/tgt/ExploitDatePostModel';
import { truncateAndConvertDateToUtc } from '../../../store/tgt';

interface Props {
  rfiId: number;
  postExploitDate: (date: ExploitDatePostModel) => void;
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
    height: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 1306,
    maxWidth: 1306,
    marginBottom: '-18px',
  },
  dateInput: {
    width: '280px',
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
  const rowClasses = rowStyles();

  const muiPalette = createPalette({
    type: 'dark',
    primary: {
      main: theme.color.buttonAddDate,
    },
  });

  const localTheme = createMuiTheme({
    palette: muiPalette,
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [displayModal, setDisplayModal] = React.useState(false);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  function isValidDate(date: Date): boolean {
    return Object.prototype.toString.call(date) !== '[object Date]' ? false
      : !(isNaN(date.getTime()) || date > new Date());
  }

  function handleChange(date: Date | null) {
    setSelectedDate(date);
    if (date !== null && isValidDate(date)) {
      props.postExploitDate(createExploitDatePostModel(date));
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

  const createExploitDatePostModel = (date: Date): ExploitDatePostModel => {
    return new ExploitDatePostModel(
      props.exploitDate ? props.exploitDate.id : null,
      props.rfiId,
      truncateAndConvertDateToUtc(date),
    );
  };

  function checkForExploitDate() {
    if (props.exploitDate) {
      enqueueSnackbar('You deleted ' + props.exploitDate!.exploitDate.format('MM/DD/YYYY'), {
        action: (key) => UndoSnackbarAction(key, createExploitDatePostModel(new Date(props.exploitDate!.exploitDate
          .unix() * 1000)), props.postExploitDate, closeSnackbar, rowClasses.snackbarButton),
        variant: 'info',
      });
      deleteExploitDateById(props.exploitDate.id);
    } else {
      props.setAddDate(false);
    }
  }

  return (
    <div className={classNames('exploit-date-divider', props.className, classes.root)} key={props.uKey}>
      <MuiThemeProvider theme={localTheme}>
        <div className={'exploit-date-divider--bar'}/>
        <div className={'exploit-date-divider--box'}>
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}>
            <div className={'date-container'}>
              <KeyboardDatePicker
                className={classNames(classes.dateInput, 'newExploitDate-input')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment onClick={handleDeleteClick} position={'start'}>
                      <DeleteButtonX
                        className={'delete-date'}
                        aria-label={'delete date'}
                      />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                }}
                margin={'normal'}
                id={'date-picker-dialog' + (props.exploitDate ? props.exploitDate.exploitDate : '')}
                label={''}
                format={'MM/dd/yyyy'}
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
            </div>
          </MuiPickersUtilsProvider>
        </div>
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
  deleteExploitDate: deleteExploitDate,
};

export const StyledTgtDateDivider = styled(connect(mapStateToProps, mapDispatchToProps)(TgtDateDivider))`
  font-family: ${theme.font.familyRegion};
  font-weight: ${theme.font.weightBold};
  font-size: ${theme.font.sizeRegion};
  color: ${theme.color.fontPrimary};
  
  input {
    text-align: center;
  }
  
  .delete-date {
    width: 48px;
  }
  
  .exploit-date-divider--box {
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
    margin-bottom: -50px;
  }
  
  .exploit-date-divider--bar {
    margin-bottom: -4px;
    width: 1306px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: ${theme.color.segmentDivider};
    border: 2px solid;
  }
  
  .date-container {
    margin-top: -6px;
  }
`;
