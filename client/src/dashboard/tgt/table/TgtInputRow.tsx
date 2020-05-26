import * as React from 'react';
import { useEffect, useState } from 'react';
import { TargetModel, TargetStatus } from '../../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { TargetPostModel } from '../../../store/tgt/TargetPostModel';
import { Box, MuiThemeProvider, TextField } from '@material-ui/core';
import theme, { rowStyles, rowTheme } from '../../../resources/theme';
import styled from 'styled-components';
import RfiModel from '../../../store/rfi/RfiModel';
import { RowAction } from '../../../utils';
import { Status } from '../TgtDashboard';
import classNames from 'classnames';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import CancelButton from '../../../resources/icons/CancelButton';
import { DeleteCancelButton } from '../../ixn/table/DeleteCancelButton';


interface MyProps {
  target: TargetModel|null;
  exploitDate: ExploitDateModel|null;
  rfi: RfiModel;
  setAddEditTarget: (status: Status, id?: number) => void;
  postTarget: (target: TargetPostModel) => void;
  key: number;
  addingOrEditing: boolean;
  setEditingElement: (e: Element|null) => void;
  className?: string;
}

export const TgtInputRow: React.FC<MyProps> = props => {
  const classes = rowStyles();

  const [nameError, setNameError] = useState(false);
  const [mgrsError, setMgrsError] = useState(false);
  const [nameConflictError, setNameConflictError] = useState(false);
  //If the user enters a name or MGRS incorrectly once, always check for exact match
  const [strongValidateName, setStrongValidateName] = useState(false);
  const [strongValidateMgrs, setStrongValidateMgrs] = useState(false);
  const [name, setName] = useState(props.target ? props.target.name : '');
  const [mgrs, setMgrs] = useState(props.target ? props.target.mgrs : '');
  const [notes, setNotes] = useState(props.target ? props.target.notes : '');
  const [description, setDescription] = useState(props.target ? props.target.description : '');
  const [action, setAction] = useState(RowAction.NONE);

  const handleAction = () => {
    switch (action) {
      case RowAction.DELETING:
        props.setAddEditTarget(Status.VIEW);
        break;
      case RowAction.SUBMITTING:
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
    setNameConflictError(false);
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
    if (newNotes.charAt(newNotes.length - 1) !== '\n') {
      setNotes(newNotes);
    }
  };

  const inputDescription = (event: any) => {
    let newDescription = event.target.value;
    if (newDescription.charAt(newDescription.length - 1) !== '\n') {
      setDescription(newDescription);
    }
  };

  const checkTgts = (tgts: TargetModel[]) => {
    if (props.exploitDate !== null) {
      if (tgts.filter((tgt) => tgt.exploitDateId === props.exploitDate!.id && tgt.name === name).length > 0
        && !(props.target && props.target.name === name)) {
        setNameConflictError(true);
      } else {
        props.postTarget(
          new TargetPostModel((props.target ? props.target.id : null), props.rfi.id, props.exploitDate.id, name, mgrs,
                              notes, description, props.target ? props.target.status : TargetStatus.NOT_STARTED, '',
                              ''),
        );
      }
    } else {
      props.postTarget(
        new TargetPostModel((props.target ? props.target.id : null), props.rfi.id, -1, name, mgrs,
                            notes, description, props.target ? props.target.status : TargetStatus.NOT_STARTED, '',
                            ''),
      );
    }
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
      fetch('/api/targets?rfiId=' + props.rfi.id)
        .then(response => response.json())
        .then(tgts => checkTgts(tgts))
        .catch((reason) => {
          console.log('Failed to delete: ' + reason);
        });
    }

    setAction(RowAction.NONE);
  };

  function onBlur(event: any) {
    let currentTarget: any = event.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action !== RowAction.DELETING) {
        setAction(RowAction.SUBMITTING);
      } else {
        props.setEditingElement(document.activeElement);
      }
    }, 300);
  }

  const tgtNameInputProps = {
    id: 'tgt-name-input',
  };

  const mgrsInputProps = {
    id: 'mgrs-input',
  };

  const notesInputProps = {
    id: 'notes-input',
  };

  const descriptionInputProps = {
    id: 'description-input',
  };

  const enterKey = 13;
  const tabKey = 9;

  return (
    <div className={props.className}>
      <Box
        borderRadius={8}
        className={'tgt-form-box'}
      >
        <MuiThemeProvider theme={rowTheme}>
          <form className={classNames('tgt-form', props.target ? 'edit-tgt-form' : 'add-tgt-form')}
                onBlur={onBlur}
                onKeyPress={(key) => {
                  if (key.which === enterKey) {
                    validateAllAndSubmit();
                  }
                }}
          >
            <div className={classes.margin}>
              <TextField
                autoFocus={true}
                className={classNames(
                  'tgt-name',
                  'tgt-name-input-' + (props.target ? props.target.id : 'new'),
                )}
                value={name}
                required
                placeholder="OPRYY-###"
                label={props.target ? '' : (nameError ? 'Error' : 'Required')}
                error={nameError}
                onChange={inputName}
                inputProps={tgtNameInputProps}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                className={'mgrs'}
                value={mgrs}
                required
                placeholder="##XXX##########"
                label={props.target ? '' : (mgrsError ? 'Error' : 'Required')}
                error={mgrsError}
                onChange={inputMgrs}
                inputProps={mgrsInputProps}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                multiline
                className={'notes'}
                value={notes}
                label={props.target || notes !== '' ? '' : 'EEI Notes'}
                onChange={inputNotes}
                inputProps={notesInputProps}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                multiline
                className={'description'}
                value={description}
                label={props.target || description !== '' ? '' : 'TGT Description'}
                onChange={inputDescription}
                onKeyDown={(key: any) => {
                  if (key.keyCode === tabKey && !key.shiftKey) {
                    validateAllAndSubmit();
                  }
                }}
                inputProps={descriptionInputProps}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
          </form>
        </MuiThemeProvider>
        <div
          className={'status-wrapper'}>
          {props.target === null || props.target.status === TargetStatus.NOT_STARTED ?
            <NotStartedButton buttonClass={classes.statusUnclickable}/>
            : (props.target.status === TargetStatus.IN_PROGRESS ?
              <InProgressButton buttonClass={classes.statusUnclickable}/>
              :
              <CompletedButton buttonClass={classes.statusUnclickable}/>)
          }
        </div>
        <DeleteCancelButton
          handleClick={() => setAction(RowAction.DELETING)}
          title={'Cancel Edit'}
          buttonClassName={'cancel-edit-tgt-button'}
          className={'delete-edit-button-container'}
        >
          <CancelButton/>
        </DeleteCancelButton>
      </Box>
      {nameError ?
        <div className={'input-error-msg'}>Please use the format "OPNYY-###" for TGT name</div>
        : null
      }
      {nameConflictError ?
        <div className={'input-error-msg'}>Duplicate TGTs under the same date are not allowed.</div>
        : null
      }
      {mgrsError ?
        <div className={'input-error-msg'}>Please use the format "##XXX##########" for MGRS</div>
        : null
      }
    </div>
  );
};

export const StyledTgtInputRow = styled(TgtInputRow)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: -4px;
  width: 1212px;
  
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
    margin: 10px 8px 0 8px;
    overflow-wrap: break-word;
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightRow};
    font-family: ${theme.font.familyRow};
    position: relative;
    
  }
  
  .data-cell-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .data-overflow {
    overflow-wrap: break-word;
  }
  
  .data-bottom {
    height: 7px;
    margin-bottom: 4px;
    width: calc(100% - 16px);
    border-bottom: 1px solid #FFFFFF;
  }
  
  .tgt-form-box {
    min-height: 62px;
    width: 100%;
    margin-top: 8px;
    background-color: ${theme.color.backgroundInformation};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
    flex-grow: 1;
    box-shadow: -2px 2px 4px #000000;
  }
  
  .tgt-form {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .status-wrapper {
    align-self: center;
    margin-right: 25px;
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
