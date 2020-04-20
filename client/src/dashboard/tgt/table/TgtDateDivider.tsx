import 'date-fns';
import * as React from 'react';
import classNames from 'classnames';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, createStyles, InputAdornment, MuiThemeProvider, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import DeleteButtonX from '../../../resources/icons/DeleteButtonX';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import theme from '../../../resources/theme';
import createPalette from '@material-ui/core/styles/createPalette';
import { ExploitDatePostModel } from '../../../store/tgt/ExploitDatePostModel';
import { truncateAndConvertDateToUtc } from '../../../store/tgt';

interface Props {
  rfiId: number;
  postExploitDate: (date: ExploitDatePostModel) => void;
  setAddDate: (addDate: boolean) => void;
  uKey: number
  deleteExploitDate: (exploitDate: ExploitDateModel) => void;
  hasTgts: boolean;
  exploitDateDisplay?: string;
  exploitDate?: ExploitDateModel;
  disabled: boolean;
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

  const muiPalette = createPalette({
    type: 'dark',
    primary: {
      main: theme.color.primaryButton,
    },
  });

  const localTheme = createMuiTheme({
    palette: muiPalette,
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [displayModal, setDisplayModal] = React.useState(false);

  function isValidDate(date: Date): boolean {
    return Object.prototype.toString.call(date) !== '[object Date]' ? false
      : !(isNaN(date.getTime()) || date > new Date());
  }

  const createExploitDatePostModel = (date: Date): ExploitDatePostModel => {
    return new ExploitDatePostModel(
      props.exploitDate ? props.exploitDate.id : null,
      props.rfiId,
      truncateAndConvertDateToUtc(date),
    );
  };

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
    if (!props.disabled) {
      if (props.hasTgts) {
        setDisplayModal(true);
      } else {
        deleteExploitDate();
      }
    }
  }

  function deleteExploitDate() {
    if (props.exploitDate) {
      props.deleteExploitDate(props.exploitDate);
      setDisplayModal(false);
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
                        className={classNames('delete-date', props.disabled ? 'disabled' : null)}
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
                disabled={props.disabled}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>
        <DeleteConfirmationModal
          deletingItem={props.exploitDate ? props.exploitDate.exploitDate.format('MM/DD/YYYY') : ''}
          display={displayModal}
          setDisplay={setDisplayModal}
          handleYes={deleteExploitDate}
        />
      </MuiThemeProvider>
    </div>
  );
};

export const StyledTgtDateDivider = styled(TgtDateDivider)`
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
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    border: 4px solid ${theme.color.regionDividerPrimary};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: -50px;
    z-index: 1;
  }
  
  .exploit-date-divider--bar {
    margin-bottom: -4px;
    width: 1306px;
    height: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: radial-gradient(800px, ${theme.color.regionDividerPrimary}, ${theme.color.regionDividerSecondary});
    z-index: 2;
  }
  
  .date-container {
    margin-top: -6px;
  }
`;
