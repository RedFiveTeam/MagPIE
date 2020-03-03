import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Box, createMuiTheme, createStyles, TextField, Theme, Tooltip, withStyles } from '@material-ui/core';
import { crayonBox } from '../../../resources/crayonBox';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { StyledDeleteButtonTrashcan } from '../../../resources/icons/DeleteButtonTrashcan';
import { StyledExploitationLogButtonVector } from '../../../resources/icons/ExploitationLogButtonVector';
import { connect } from 'react-redux';
import theme from '../../../resources/theme';
import { deleteTgt, submitPostTarget } from '../../../store/tgt/Thunks';
import { TargetModel, TargetStatus } from '../../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { navigateToIxnPage } from '../../../store/ixn';
import { TargetPostModel } from '../../../store/tgt/TargetPostModel';
import RfiModel from '../../../store/rfi/RfiModel';
import { StyledStatusPickerOutline } from '../../../resources/icons/StatusPickerOutline';
import AddTgtDateButtonVector from '../../../resources/icons/AddTgtDateButtonVector';
import { Status } from '../TgtDashboard';
import InProgressIcon from '../../../resources/icons/InProgressIcon';
import CompletedIcon from '../../../resources/icons/CompletedIcon';

interface Props {
  target: TargetModel | null;
  exploitDate: ExploitDateModel;
  rfi: RfiModel;
  editable: boolean;
  setAddEditTarget: (status: Status, id?: number) => void;
  submitPostTarget: (target: TargetPostModel, rfi: RfiModel) => void;
  navigateToIxnPage: (target: TargetModel, dateString: string) => void;
  deleteTgt: (tgtId: number) => void;
  key: number;
  addingOrEditing: boolean;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    inProgressClickable: {
      cursor: 'pointer',
      userSelect: 'none',
      position: 'absolute',
      marginLeft: '19px',
      marginTop: '2px',
      '&:hover': {
        boxShadow: '0px 0px 6px #FFFFFF',
      },
    },
    completedClickable: {
      cursor: 'pointer',
      userSelect: 'none',
      position: 'absolute',
      marginLeft: '19px',
      marginTop: '46px',
      '&:hover': {
        boxShadow: '0px 0px 6px #FFFFFF',
      },
    },
    statusUnclickable: {
      alignSelf: 'center',
      boxShadow: '0px 2px 4px #000000',
      fontWeight: 'bold',
      userSelect: 'none',
    },
  }),
);

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    marginTop: '-15px',
  },
}))(Tooltip);

export const TgtRow: React.FC<Props> = props => {
  const classes = useStyles();

  const localTheme = createMuiTheme({
    palette: {
      primary: {
        main: crayonBox.skyBlue,
      },
      secondary: {
        main: '#323232',
      },
    },
    overrides: {
      MuiInput: {
        input: {
          '&::placeholder': {
            color: '#838383',
          },
          color: 'white', // if you also want to change the color of the input, this is the prop you'd use
        },
      },
    },
  });

  enum Action {
    NONE,
    DELETING,
    SUBMITTING
  }

  const [nameError, setNameError] = useState(false);
  const [mgrsError, setMgrsError] = useState(false);
  //If the user enters a name or MGRS incorrectly once, always check for exact match
  const [strongValidateName, setStrongValidateName] = useState(false);
  const [strongValidateMgrs, setStrongValidateMgrs] = useState(false);
  const [name, setName] = useState('');
  const [mgrs, setMgrs] = useState('');
  const [notes, setNotes] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState(Action.NONE);

  const handleAction = () => {
    switch (action) {
      case Action.DELETING:
        if (props.target) {
          props.deleteTgt(props.target.id);
        } else {
          props.setAddEditTarget(Status.VIEW);
        }
        break;
      case Action.SUBMITTING:
        validateAllAndSubmit();
        break;
    }
  };

  useEffect(
    handleAction,
    [action],
  );

  function weakMatchNameError(name: string): boolean {
    return name.length > 9 || (name.length === 9 && name.match(/[A-Z]{3}[0-9]{2}-[0-9]{3}/) === null);
  }

  function strongMatchNameError(name: string): boolean {
    return name.length !== 9 || name.match(/[A-Z]{3}[0-9]{2}-[0-9]{3}/) === null;
  }

  function weakMatchMgrsError(mgrs: string): boolean {
    return mgrs.length > 15 || (mgrs.length === 15 && mgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null);
  }

  function strongMatchMgrsError(mgrs: string): boolean {
    return mgrs.length !== 15 || mgrs.match(/[0-9]{2}[A-Z]{3}[0-9]{10}/) === null;
  }

  const inputName = (event: any) => {
    let newName = event.target.value;
    setName(newName);
    if (strongValidateName) {
      setNameError(strongMatchNameError(newName));
    } else {
      setNameError(weakMatchNameError(newName));
      setStrongValidateName(weakMatchNameError(newName));
    }
  };

  const inputMgrs = (event: any) => {
    let newMgrs = event.target.value;
    setMgrs(newMgrs);
    if (strongValidateMgrs) {
      setMgrsError(strongMatchMgrsError(newMgrs));
    } else {
      setMgrsError(weakMatchMgrsError(newMgrs));
      setStrongValidateMgrs(weakMatchMgrsError(newMgrs));
    }
  };

  const inputNotes = (event: any) => {
    let newNotes = event.target.value;
    if (newNotes.charAt(newNotes.length - 1) !== '\n')
      setNotes(newNotes);
  };

  const inputDescription = (event: any) => {
    let newDescription = event.target.value;
    if (newDescription.charAt(newDescription.length - 1) !== '\n')
      setDescription(newDescription);
  };

  const validateAllAndSubmit = () => {
    let nameErrorLocal = strongMatchNameError(name);
    let mgrsErrorLocal = strongMatchMgrsError(mgrs);

    setNameError(nameErrorLocal);
    setMgrsError(mgrsErrorLocal);
    if (!strongValidateName) {
      setStrongValidateName(nameErrorLocal);
    }
    if (!strongValidateMgrs) {
      setStrongValidateMgrs(mgrsErrorLocal);
    }
    if (!(nameErrorLocal || mgrsErrorLocal)) {
      props.setAddEditTarget(Status.VIEW);
      props.submitPostTarget(
        new TargetPostModel((props.target ? props.target.id : null), props.rfi.id, props.exploitDate.id, name, mgrs,
          notes, description, props.target ? props.target.status : TargetStatus.NOT_STARTED),
        props.rfi,
      );
      setTimeout(() => {
        setName('');
        setMgrs('');
        setNotes('');
        setDescription('');
      }, 500);
    }

    setAction(Action.NONE);
  };

  const submitStatusChange = (status: TargetStatus) => {
    if (props.target !== null) {
      let newTarget: TargetPostModel = new TargetPostModel(props.target.id, props.rfi.id, props.exploitDate.id,
        props.target.name, props.target.mgrs, props.target.notes, props.target.description, status);
      props.submitPostTarget(
        newTarget,
        props.rfi,
      );
    }
  };

  function onBlur(event: any) {
    let currentTarget: any = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action !== Action.DELETING) {
        setAction(Action.SUBMITTING);
      }
    }, 50);
  }

  const handleDeleteClick = () => {
    setAction(Action.DELETING);
  };

  const handleIxnClick = () => {
    if (props.target !== null) {
      props.navigateToIxnPage(props.target, props.exploitDate.exploitDate.format('MM/DD/YYYY'));
    }
  };

  const handleDoubleClick = () => {
    if (props.target && !props.editable) {
      props.setAddEditTarget(Status.EDIT, props.target.id);
      setName(props.target.name);
      setMgrs(props.target.mgrs);
      setNotes(props.target.notes ? props.target.notes : '');
      setDescription(props.target.description ? props.target.description : '');
      setTimeout(() => {
        if (props.target)
          document.getElementById('tgt-name-input-' + props.target.id)!.focus();
      }, 50);
    }
  };

  const inputProps = {
    id: 'tgt-name-input-' + (props.target ? props.target.id.toString() : 'new'),
  };

  interface LocalProps {
    buttonClass: string
    className?: string
  }

  const InProgressButton: React.FC<LocalProps> = props => {
    return (
      <div className={props.className}>
        <Box
          height={32}
          width={110}
          border={2}
          borderRadius={16}
          borderColor={theme.color.inProgress}
          bgcolor={localTheme.palette.secondary.main}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingRight={0.25}
          paddingLeft={1.25}
          className={props.buttonClass}
          zIndex={1000}
          color={theme.color.fontPrimary}
          fontSize={12}
          fontWeight={'bold'}
          onClick={() => submitStatusChange(TargetStatus.IN_PROGRESS)}
        >
          In Progress
          <InProgressIcon/>
        </Box>
      </div>
    );
  };

  const CompletedButton: React.FC<LocalProps> = props => {
    return (
      <div className={props.className}>
        <Box
          height={32}
          width={110}
          border={2}
          borderRadius={16}
          borderColor={theme.color.complete}
          bgcolor={localTheme.palette.secondary.main}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingRight={0.25}
          paddingLeft={1.25}
          className={props.buttonClass}
          zIndex={1000}
          color={theme.color.fontPrimary}
          fontSize={12}
          fontWeight={'bold'}
          onClick={() => submitStatusChange(TargetStatus.COMPLETED)}
        >
          Complete
          <CompletedIcon/>
        </Box>
      </div>
    );
  };

  return (
    <div className={props.className}>
      <Box
        borderRadius={8}
        className={'tgt-form-box'}
      >
        <ThemeProvider theme={localTheme}>
          {props.editable ?
            <form className={classNames('tgt-form', props.target ? 'edit-tgt-form' : 'add-tgt-form')}
                  onBlur={onBlur}
                  onKeyPress={(e) => {
                    if (e.which === 13) {
                      validateAllAndSubmit();
                    }
                  }}
            >
              <TextField
                autoFocus={true}
                className={classNames(
                  classes.margin,
                  'tgt-name',
                  'tgt-name-input-' + (props.target ? props.target.id : 'new'),
                  props.editable ? null : 'input-disabled',
                )}
                // Display local hook if editing, if local hook is not empty display it, otherwise display props.
                // Local hook is on a setTimeout to be cleared  in order to update the display if the user submits a
                // conflicting target name without there being a cut back to the old data for a split second on update
                value={name !== '' ? name : (props.target && !props.editable ? props.target.name : name)}
                required
                placeholder="OPRYY-###"
                label={props.target ? '' : (nameError ? 'Error' : 'Required')}
                error={nameError}
                onChange={inputName}
                inputProps={inputProps}
              />
              <TextField
                className={classNames('mgrs', props.editable ? null : 'input-disabled', classes.margin)}
                value={mgrs !== '' ? mgrs : (props.target && !props.editable ? props.target.mgrs : mgrs)}
                required
                placeholder="##XXX##########"
                label={props.target ? '' : (mgrsError ? 'Error' : 'Required')}
                error={mgrsError}
                onChange={inputMgrs}
              />
              <TextField
                multiline
                rowsMax="2"
                className={classNames('notes', props.editable ? null : 'input-disabled', classes.margin)}
                value={notes}
                label={props.target || notes !== '' ? '' : 'EEI Notes'}
                onChange={inputNotes}
              />
              <TextField
                multiline
                rowsMax="2"
                className={classNames('description', props.editable ? null : 'input-disabled', classes.margin)}
                value={description !== ''
                  ?
                  description
                  :
                  (props.target && !props.editable
                    ?
                    props.target.description
                    :
                    description)
                }
                label={props.target || description !== '' ? '' : 'TGT Description'}
                onChange={inputDescription}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 9) {
                    validateAllAndSubmit();
                  }
                }}
              />
            </form>
            :
            <div className={'tgt-form'}
                 onDoubleClick={handleDoubleClick}
            >
              <div className={classNames('data-cell', 'tgt-name')}>
                {props.target!.name}
              </div>
              <div className={classNames('data-cell', 'mgrs')}>
                {props.target!.mgrs}
              </div>
              <div className={classNames('data-cell', 'notes')}>
                <div className={'data-overflow'}>
                  {props.target!.notes}
                </div>
              </div>
              <div className={classNames('data-cell', 'description')}>
                <div className={'data-overflow'}>
                  {props.target!.description}
                </div>
              </div>
            </div>
          }
          <HtmlTooltip
            title={
              <div className={'status-menu'}>
                <StyledStatusPickerOutline/>
                <InProgressButton buttonClass={classes.inProgressClickable}/>
                <CompletedButton buttonClass={classes.completedClickable}/>
              </div>
            }
            interactive
            disableHoverListener={props.addingOrEditing}
          >
            <div
              className={'status-wrapper'}>{props.target === null || props.target.status === TargetStatus.NOT_STARTED ?
              <Box
                height={32}
                width={110}
                border={2}
                borderRadius={16}
                borderColor={crayonBox.eggWhite}
                bgcolor={localTheme.palette.secondary.main}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingRight={0.25}
                paddingLeft={2.8}
                fontSize={12}
                className={classes.statusUnclickable}
              >
                Status
                <AddTgtDateButtonVector/>
              </Box>
              : (props.target.status === TargetStatus.IN_PROGRESS ?
                <InProgressButton buttonClass={classes.statusUnclickable}/>
                :
                <CompletedButton buttonClass={classes.statusUnclickable}/>)
            }</div>
          </HtmlTooltip>
          <div className={'delete-tgt-button'}
               id={'delete' + (props.target !== null ? ('' + props.target.id) : '-add-tgt-row')}
               onClick={handleDeleteClick}>
            <StyledDeleteButtonTrashcan/>
          </div>
          <div className={classNames('exploitation', props.target ? '' : 'input-disabled')} onClick={handleIxnClick}>
            <StyledExploitationLogButtonVector/>
          </div>
        </ThemeProvider>
      </Box>
      {nameError ?
        <div className={'input-error-msg'}>Please use the format "OPNYY-###" for TGT name</div>
        : null
      }
      {mgrsError ?
        <div className={'input-error-msg'}>Please use the format "##XXX##########" for MGRS</div>
        : null
      }
    </div>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  submitPostTarget: submitPostTarget,
  navigateToIxnPage: navigateToIxnPage,
  deleteTgt: deleteTgt,
};

export const StyledTgtRow = styled(connect(mapStateToProps, mapDispatchToProps)(TgtRow))`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
  width: 100%;
  
  .tgt-form {
    width: 100%;
  }
  
  .tgt-name {
    width: 115px;
  }
  
  .mgrs {
    width: 155px;
  }
  
  .notes {
    width: 389px;
  }
  
  .description {
    width: 262px;
  }
  
  .status {
    width: 120px;
  }
  
  .data-cell {
    margin: 8px 8px 15px 8px;
    max-height: 38px;
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightRow};
    font-family: ${theme.font.familyRow};
    overflow-y: auto;
  }
  
  .data-overflow {
    overflow-wrap: break-word;
  }
  
  .delete-tgt-button {
    border-left: 4px solid ${crayonBox.softMetal};
    border-right: 4px solid ${crayonBox.softMetal};
    width: 90px;
    height: 62px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  
  .exploitation {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 108px;
    height: 62px;
    cursor: pointer;
  }
  
  .tgt-form-box {
    height: 62px;
    width: 100%;
    margin-top: 8px;
    background-color: #464646;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
  }
  
  .tgt-form {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    max-height: 62px;
  }

  .status-wrapper {
    align-self: center;
    margin-right: 25px;
  }
  
  .no-select {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
  }
  
  .input-error-msg {
    color: ${theme.color.fontError};
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightRow};
    line-height: 19px;
  }
  
  .status-menu {
    cursor: pointer;
  }
`;
