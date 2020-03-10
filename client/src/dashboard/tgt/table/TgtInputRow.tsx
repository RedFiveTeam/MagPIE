import * as React from 'react';
import { useEffect, useState } from 'react';
import { TargetModel, TargetStatus } from '../../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { TargetPostModel } from '../../../store/tgt/TargetPostModel';
import { navigateToIxnPage } from '../../../store/ixn';
import { Box, MuiThemeProvider, TextField } from '@material-ui/core';
import theme, { rowStyles, rowTheme } from '../../../resources/theme';
import styled from 'styled-components';
import { StyledDeleteButtonTrashcan } from '../../../resources/icons/DeleteButtonTrashcan';
import { crayonBox } from '../../../resources/crayonBox';
import { deleteTgt, submitPostTarget } from '../../../store/tgt/Thunks';
import RfiModel from '../../../store/rfi/RfiModel';
import { RowAction } from '../../../utils';
import { StyledExploitationLogButtonVector } from '../../../resources/icons/ExploitationLogButtonVector';
import { Status } from '../TgtDashboard';
import { connect } from 'react-redux';
import classNames from 'classnames';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';


interface MyProps {
  target: TargetModel | null;
  exploitDate: ExploitDateModel;
  rfi: RfiModel;
  setAddEditTarget: (status: Status, id?: number) => void;
  submitPostTarget: (target: TargetPostModel, rfi: RfiModel) => void;
  navigateToIxnPage: (target: TargetModel, dateString: string) => void;
  deleteTgt: (tgtId: number) => void;
  key: number;
  addingOrEditing: boolean;
  className?: string;
}

export const TgtInputRow: React.FC<MyProps> = props => {
  const classes = rowStyles();

  const [nameError, setNameError] = useState(false);
  const [mgrsError, setMgrsError] = useState(false);
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
        if (props.target) {
          props.deleteTgt(props.target.id);
        } else {
          props.setAddEditTarget(Status.VIEW);
        }
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

    setAction(RowAction.NONE);
  };

  function onBlur(event: any) {
    let currentTarget: any = event.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) && action !== RowAction.DELETING) {
        setAction(RowAction.SUBMITTING);
      }
    }, 300);
  }

  const handleDeleteClick = () => {
    setAction(RowAction.DELETING);
  };

  const handleIxnClick = () => {
    if (props.target !== null) {
      props.navigateToIxnPage(props.target, props.exploitDate.exploitDate.format('MM/DD/YYYY'));
    }
  };

  const inputProps = {
    id: 'tgt-name-input-' + (props.target ? props.target.id.toString() : 'new'),
  };

  return (
    <div className={props.className}>
      <Box
        borderRadius={8}
        className={'tgt-form-box'}
      >
        <MuiThemeProvider theme={rowTheme}>
          <form className={classNames('tgt-form', props.target ? 'edit-tgt-form' : 'add-tgt-form')}
                onBlur={onBlur}
                onKeyPress={(e) => {
                  if (e.which === 13) {
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
                inputProps={inputProps}
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
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                multiline
                rowsMax="2"
                className={'notes'}
                value={notes}
                label={props.target || notes !== '' ? '' : 'EEI Notes'}
                onChange={inputNotes}
                InputLabelProps={{
                  className: classes.inputLabel,
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                multiline
                rowsMax="2"
                className={'description'}
                value={description}
                label={props.target || description !== '' ? '' : 'TGT Description'}
                onChange={inputDescription}
                onKeyDown={(e: any) => {
                  if (e.keyCode === 9 && !e.shiftKey) {
                    validateAllAndSubmit();
                  }
                }}
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
        <div className={classNames('delete-tgt-button', props.target ? 'delete-disabled' : null)}
             id={'delete' + (props.target !== null ? ('' + props.target.id) : '-add-tgt-row')}
             onClick={handleDeleteClick}>
          <StyledDeleteButtonTrashcan/>
        </div>
        <div className={classNames('exploitation', props.target ? '' : 'input-disabled')} onClick={handleIxnClick}>
          <StyledExploitationLogButtonVector/>
        </div>
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

export const StyledTgtInputRow = styled(connect(mapStateToProps, mapDispatchToProps)(TgtInputRow))`
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
    margin: 10px 8px 0 8px;
    //padding-bottom: 6px;
    overflow-wrap: break-word;
    //border-bottom: 1px solid #FFFFFF;
    max-height: 42px;
    font-size: ${theme.font.sizeRow};
    font-weight: ${theme.font.weightRow};
    font-family: ${theme.font.familyRow};
    overflow-y: auto;
    position: relative;
    
  }
  
  .data-cell-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 62px;
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
    background-color: ${theme.color.backgroundInformation};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
  }
  
  .tgt-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-height: 62px;
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
