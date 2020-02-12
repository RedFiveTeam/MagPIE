import 'date-fns';
import * as React from 'react';
import classNames from 'classnames';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Box, createStyles, InputAdornment, Modal, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteExploitDate, updateRfiDate } from '../../state/actions';
import { ExploitDateModel } from './models/ExploitDateModel';
import DeleteIcon from '../../resources/icons/DeleteIcon';
import globalTheme from '../../resources/theme';

interface Props {
  rfiId: number;
  addDate: boolean;
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
    maxWidth: 1306
  },
  dateInput: {
    width: "200px",
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
  modal: {
    marginLeft: -271,
    marginTop: -94,
    width: 542,
    height: 188,
  },
  modalBody: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontFamily: globalTheme.font.familyHeader,
    fontWeight: globalTheme.font.weightBold,
    fontSize: globalTheme.font.sizeHeader,
    color: globalTheme.color.deleteButton,
    textAlign: 'center',
    outline: 'none',
    backgroundColor: globalTheme.color.backgroundModal,
    borderRadius: 8,
    borderColor: globalTheme.color.borderModal,
    borderWidth: 2,
    borderStyle: 'solid'
  },
  modalConfirmation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 162
  },
  modalYes: {
    cursor: 'pointer',
    color: globalTheme.color.fontBackgroundInactive,
    '&:hover': {
      color: globalTheme.color.deleteButton,
      textShadow: '0px 0px 4px #FFFFFF'
    }
  },
  modalNo: {
    cursor: 'pointer',
    '&:hover': {
      textShadow: '0px 0px 4px #FFFFFF'
    }
  }
}));

export const TgtDateDivider: React.FC<Props> = props => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [displayModal, setDisplayModal] = React.useState(false);

  function isValidDate(date: Date): boolean {
    return Object.prototype.toString.call(date) !== "[object Date]" ? false
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
      // document.getElementById("date-picker-dialog" + (props.exploitDate ? props.exploitDate.exploitDate : ""))!.blur();
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
      deleteExploitDateById(props.exploitDate.id)
    } else {
      props.setAddDate(false);
    }
  }


  return (
    <div className={classNames('segment-divider', props.className, classes.root)} key={props.uKey}>
      <Box className={classes.dateInputField}>
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classNames(classes.dateInput, 'exploitDate-input')}
            InputProps={{
              startAdornment: (
                <InputAdornment onClick={handleDeleteClick} position="start">
                  <DeleteIcon
                    aria-label="delete date"
                  />
                </InputAdornment>
              )
            }}
            margin="normal"
            id={"date-picker-dialog" + (props.exploitDate ? props.exploitDate.exploitDate : "")}
            label=""
            format="MM/dd/yyyy"
            placeholder={"MM/DD/YYYY"}
            value={(props.exploitDate ? props.exploitDateDisplay : selectedDate)}
            onChange={date => handleChange(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            maxDate={new Date()}
            error={false}
            helperText={''}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Box className={classNames(classes.separator, "separator-line")}>
        &nbsp;
      </Box>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={displayModal}
        onClose={() => setDisplayModal(false)}
        style={{
          top: '50%',
          left: '50%'
        }}
        className={classNames('delete-modal', classes.modal)}
      >
        <div className={classes.modalBody}>
          <div className={'modal-text'}>Are you sure?</div>
          <div className={'modal-text'} style={{width: 339}}>This will delete all TGTs and interactions associated with
            it.
          </div>
          <div className={classes.modalConfirmation}>
            <span className={classNames('modal-yes', classes.modalYes)} onClick={() => checkForExploitDate()}>
              YES
            </span>
            <span className={classNames('modal-no', classes.modalNo)} onClick={() => setDisplayModal(false)}>
              NO
            </span>
          </div>
        </div>
      </Modal>
    </div>
  )
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updateRfiDate: updateRfiDate,
  deleteExploitDate: deleteExploitDate
};


export const StyledTgtDateDivider = styled(connect(mapStateToProps, mapDispatchToProps)(TgtDateDivider))`
  font-family: ${(props) => props.theme.font.familyRegion};
  font-weight: ${(props) => props.theme.font.weightBold};
  font-size: ${(props) => props.theme.font.sizeRegion};
  color: ${(props) => props.theme.color.fontPrimary};
  width: 100%
 
  .separator-line {
    background: ${(props) => props.theme.color.fontPrimary};
  }

  .separator-title {
    text-align: center;
  }
  
  .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
    
`;
