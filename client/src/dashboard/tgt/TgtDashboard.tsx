import styled from 'styled-components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledTgtTable } from './table/TgtTable';
import { StyledExploitDateDivider } from './table/ExploitDateDivider';
import theme, { longInputStyles, rowStyles } from '../../resources/theme';
import { ApplicationState } from '../../store';
import { StyledTgtDateRegion } from './table/TgtDateRegion';
import { StyledTgtDashboardHeader } from './TgtDashboardHeader';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../store/tgt/TargetModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import {
  deleteExploitDate,
  deleteTargets,
  deleteTgt,
  loadTgtPage,
  postExploitDate,
  submitPostTargets,
} from '../../store/tgt/Thunks';
import {
  addTgt,
  editTgt,
  exitTgtPage,
  resetAddEditTgt,
  setDatePlaceholder,
  truncateAndConvertDateToUtc,
  updateTgtsLocal,
} from '../../store/tgt';
import { convertToPostModel, TargetPostModel } from '../../store/tgt/TargetPostModel';
import { ExploitDatePostModel } from '../../store/tgt/ExploitDatePostModel';
import { useCookies } from 'react-cookie';
import { Cookie } from '../../utils';
import { UndoSnackbarAction } from '../components/UndoSnackbarAction';
import { navigateToIxnPage } from '../../store/ixn';
import { useSnackbar } from 'notistack';
import { StyledRfiSidebar } from './sidebar/RfiSidebar';
import { NavigateAwayConfirmationModal } from '../components/NavigateAwayConfirmationModal';
import { StyledTgtCopyModal } from './TgtCopyModal';
import { StyledTgtInputRow } from './table/TgtInputRow';
import { StyledTgtRow } from './table/TgtRow';
import { Modal } from '@material-ui/core';

interface MyProps {
  rfi: RfiModel;
  exploitDates: ExploitDateModel[];
  showDatePlaceholder: boolean;
  setDatePlaceholder: (show: boolean) => void;
  targets: TargetModel[];
  addTgt: number;
  editTgt: number;
  highlight: boolean;
  className?: string;
}

export enum Status {
  VIEW,
  ADD,
  EDIT
}

export const TgtDashboard: React.FC<MyProps> = (props) => {
  const moment = require('moment');
  const classes = rowStyles();
  const [cookies, setCookies] = useCookies(['magpie']);
  let cookie: Cookie = cookies.magpie;
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const [addDate, setAddDate] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [navigate, setNavigate] = useState(null as RfiModel|null);
  const [displayCopyTargets, setDisplayCopyTargets] = useState(false);
  const [displayCopyAllTargets, setDisplayCopyAllTargets] = useState(false);
  const [editingElement, setEditingElement] = useState(null as Element|null);
  const [copyTgts, setCopyTgts] = useState([] as TargetPostModel[]);

  const isDisabled = props.addTgt > 0 || addDate || props.editTgt > 0 || props.rfi.status === RfiStatus.CLOSED
    || displayCopyAllTargets || displayCopyTargets;

  let newExploitDate = useSelector(({tgtState}: ApplicationState) => tgtState.newExploitDate);

  useEffect(() => {
    if (newExploitDate) {
      enqueueSnackbar(newExploitDate.exploitDate.format('MM/DD/YYYY') + ' Created', {
        action: (key) => UndoSnackbarAction(key, newExploitDate!.id, handleUndoPostExploitDate,
                                            closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });
      let newTgts: TargetPostModel[] = [];
      if (props.targets.length > 0 && props.targets[0].exploitDateId === -1) {
        for (let tgt of props.targets) {
          let newTgt = {...convertToPostModel(tgt), exploitDateId: newExploitDate!.id};
          if (newTgts.find(tgt => tgt.name === newTgt.name) === undefined) {
            newTgts.push(newTgt);
          }
        }
        handlePostTargets(newTgts, false);
      } else if (props.targets.length > 0 && props.targets[0].exploitDateId > 0) {
        for (let tgt of props.targets) {
          let newTgt = {...convertToPostModel(tgt), targetId: null, exploitDateId: newExploitDate!.id};
          if (newTgts.find(tgt => tgt.name === newTgt.name) === undefined) {
            newTgts.push(newTgt);
          }
        }
        setCopyTgts(newTgts);
        setDisplayCopyAllTargets(true);
      }
    }
  }, [newExploitDate]);

  const handleUndoPostExploitDate = (exploitDateId: number) => {
    dispatch(deleteExploitDate(exploitDateId));
  };

  const handleUndoPostTargets = (targets: TargetPostModel[]) => {
    dispatch(deleteTargets(targets, cookie.userName));
  };

  const dispatch = useDispatch();

  const handleExitTgtPage = () => {
    if (props.addTgt > 0 || props.editTgt > 0) {
      setNavigating(true);
      setNavigate(null);
    } else {
      setCookies('magpie', {...cookie, viewState: {rfiId: undefined, tgtId: undefined}});
      dispatch(exitTgtPage());
    }
  };

  const handlePostTargets = (targets: TargetPostModel[], isCopy: boolean) => {
    if (!navigating) {
      if (props.rfi.status !== RfiStatus.CLOSED) {
        let tgts: TargetModel[] = [];
        for (let target of targets) {
          let tgt = new TargetModel(target.targetId ? target.targetId : -1, target.rfiId, target.exploitDateId,
                                    target.name, target.mgrs, target.notes, target.description, target.status, '', '');
          tgts.push(tgt);
        }
        if (isCopy) {
          enqueueSnackbar('Targets Copied', {
            action: (key) => UndoSnackbarAction(key, targets, handleUndoPostTargets, closeSnackbar,
                                                classes.snackbarButton),
            variant: 'info',
          });
        } else if (targets[0].targetId === null) {
          enqueueSnackbar(targets[0].name + ' Created', {
            action: (key) => UndoSnackbarAction(key, targets, handleUndoPostTargets, closeSnackbar,
                                                classes.snackbarButton),
            variant: 'info',
          });
        }
        dispatch(updateTgtsLocal(tgts, isCopy));
        dispatch(submitPostTargets(targets, props.rfi, cookie.userName, isCopy));
      }
    }
  };

  const handlePostTarget = (target: TargetPostModel) => {
    handlePostTargets([target], false);
  };

  async function handlePostExploitDate(date: ExploitDatePostModel) {
    if (props.rfi.status !== RfiStatus.CLOSED) {
      dispatch(postExploitDate(props.rfi, date));
    }
  }

  const handleAddEdit = (status: Status, id?: number) => {
    if (props.rfi.status !== RfiStatus.CLOSED) {
      switch (status) {
        case Status.ADD:
          if (id && props.addTgt === -1 && props.editTgt === -1) {
            dispatch(addTgt(id));
          }
          break;
        case Status.EDIT:
          if (id && props.addTgt === -1 && props.editTgt === -1) {
            dispatch(editTgt(id));
          }
          break;
        case Status.VIEW:
          dispatch(resetAddEditTgt());
      }
    }
  };

  const handleDeleteTarget = (target: TargetModel) => {
    if (props.rfi.status !== RfiStatus.CLOSED) {
      enqueueSnackbar('You deleted ' + target.name, {
        action: (key) => UndoSnackbarAction(key, {...target, targetId: target.id} as TargetPostModel,
                                            handlePostTarget, closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });
      dispatch(deleteTgt(target.id));
    }
  };

  const handleDeleteExploitDate = (exploitDate: ExploitDateModel) => {
    if (props.rfi.status !== RfiStatus.CLOSED) {
      let exploitDatePost: ExploitDatePostModel = new ExploitDatePostModel(
        exploitDate.id,
        exploitDate.rfiId,
        truncateAndConvertDateToUtc(new Date(exploitDate.exploitDate.unix() * 1000)),
      );
      enqueueSnackbar('You deleted ' + exploitDate.exploitDate.format('MM/DD/YYYY'), {
        action: (key) => UndoSnackbarAction(key, exploitDatePost, handlePostExploitDate, closeSnackbar,
                                            classes.snackbarButton),
        variant: 'info',
      });
      dispatch(deleteExploitDate(exploitDate.id));
    }
  };

  const handleNavigateToIxnPage = (target: TargetModel, dateString: string) => {
    if (!isDisabled || props.rfi.status === RfiStatus.CLOSED) {
      setCookies('magpie', {...cookie, viewState: {rfiId: target.rfiId, tgtId: target.id}});
      dispatch(navigateToIxnPage(target, dateString));
    }
  };

  const handleSelectRfi = (rfi: RfiModel) => {
    if (props.addTgt > 0 || props.editTgt > 0) {
      setNavigating(true);
      setNavigate(rfi);
    } else {
      setCookies('magpie', {...cookie, viewState: {rfiId: rfi.id}});
      dispatch(loadTgtPage(rfi, true));
    }
  };

  const handleNavigate = () => {
    if (navigate === null) {
      setCookies('magpie', {...cookie, viewState: {rfiId: undefined, tgtId: undefined}});
      dispatch(exitTgtPage());
    } else {
      setCookies('magpie', {...cookie, viewState: {rfiId: navigate.id}});
      dispatch(loadTgtPage(navigate, true));
    }
  };

  const handleAddDate = () => {
    setAddDate(true);
  };

  function printDates(dates: ExploitDateModel[]) {
    return dates.map(
      (exploitDateModel: ExploitDateModel, index: number) =>
        <StyledTgtDateRegion
          rfi={props.rfi}
          addDate={addDate}
          setAddDate={setAddDate}
          exploitDate={exploitDateModel}
          exploitDateDisplay={exploitDateModel.exploitDate.utc().format('D MMM YY')}
          targets={props.targets.filter(target => target.exploitDateId === exploitDateModel.id)}
          editTarget={props.editTgt}
          addTgt={props.addTgt}
          setAddEditTarget={handleAddEdit}
          index={index}
          className={'date-divider--' + moment(exploitDateModel.exploitDate).format('D-MMM-YY')}
          key={index}
          addingOrEditing={isDisabled}
          postTarget={handlePostTarget}
          postExploitDate={handlePostExploitDate}
          deleteTgt={handleDeleteTarget}
          navigateToIxnPage={handleNavigateToIxnPage}
          deleteExploitDate={handleDeleteExploitDate}
          disabled={isDisabled}
          highlight={props.highlight}
          setEditingElement={setEditingElement}
        />,
    );
  }

  function printGetsTargets() {
    return props.targets.map(
      (target: TargetModel, index: number) =>
        props.editTgt === target.id ?
          <StyledTgtInputRow
            target={target}
            key={index}
            rfi={props.rfi}
            exploitDate={null}
            setAddEditTarget={handleAddEdit}
            addingOrEditing={isDisabled}
            postTarget={handlePostTarget}
            setEditingElement={setEditingElement}
          />
          :
          <StyledTgtRow
            target={target}
            key={index}
            rfi={props.rfi}
            exploitDate={null}
            setAddEditTarget={handleAddEdit}
            addingOrEditing={isDisabled}
            postTarget={handlePostTarget}
            deleteTgt={handleDeleteTarget}
            navigateToIxnPage={handleNavigateToIxnPage}
            highlight={props.highlight}
          />,
    );
  }

  const CopyTargetsModal = () => {
      const classes = longInputStyles();
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={displayCopyAllTargets}
          onClose={() => setDisplayCopyAllTargets(false)}
          style={{
            top: '50%',
            left: '50%',
          }}
          className={classNames('delete-modal', classes.deleteModal)}
        >
          <div className={classes.modalBody}>
            <div className={'modal-text'}>Would you like to import <br/>targets from all previous dates?</div>
            <div className={classes.modalConfirmation}>
          <div className={classNames('modal-no', classes.modalButton)} onClick={() => {
            setDisplayCopyAllTargets(false);
          }}>
            No
          </div>
              <div className={classNames('modal-yes', classes.modalButton)} onClick={() => {
                handlePostTargets(copyTgts, true);
                setDisplayCopyAllTargets(false);
              }}>
            Yes
          </div>
            </div>
          </div>
        </Modal>
      );
    }
  ;

  const checkNames = () => {
    for (let tgt of props.targets) {
      if (tgt.name === '') {
        return false;
      }
    }
    return true;
  };

  let allNamesEntered = checkNames();

  return (
    <div className={classNames(props.className)}>
      <StyledTgtDashboardHeader
        exitTgtPage={handleExitTgtPage}
        rfi={props.rfi}
        editing={props.addTgt > 0 || props.editTgt > 0 || addDate}
        addDate={handleAddDate}
        disabled={isDisabled || !allNamesEntered}
        displayHelperText={props.exploitDates.length < 2 && props.rfi.status === RfiStatus.OPEN && allNamesEntered}
        displayExploitDateHelper={props.targets.length > 0 && props.exploitDates.length === 0 && allNamesEntered}
        displayCopyTargets={() => setDisplayCopyTargets(true)}
      />
      <div className={'tgt-dash-container'}>
        <div className={'rfi-sidebar'}>
          <StyledRfiSidebar
            rfi={props.rfi}
            selectRfi={handleSelectRfi}
          />
        </div>
        <div className={'tgt-dash'}>
          {props.targets.length > 0 && props.targets[0].exploitDateId === -1 ?
            <div className={'tgt-dash-body'}>
              {allNamesEntered ? null :
                <span className={'name-input-helper'}>Input all target names to assign a coverage date</span>}
              <StyledTableHeader
                className={'tgt-table-header'}
                headers={['TGT Name', 'MGRS', 'EEI Notes', 'TGT Description', 'Status']}
              />
              <StyledTgtTable displayHelperText={false}>
                {addDate ?
                  <StyledExploitDateDivider
                    rfiId={props.rfi.id}
                    setAddDate={setAddDate}
                    className={classNames('date-divider--placeholder', 'date-divider--no-top-margin',
                                          props.exploitDates.length === 0 ? 'date-divider--new' : null)}
                    uKey={props.rfi.id}
                    hasTgts={false}
                    postExploitDate={handlePostExploitDate}
                    deleteExploitDate={() => {
                    }}
                    disabled={false}
                    highlight={true}
                  />
                  :
                  null
                }
                {printGetsTargets()}
                {props.addTgt === 1 ?
                  <StyledTgtInputRow
                    target={null}
                    key={99999}
                    rfi={props.rfi}
                    exploitDate={null}
                    setAddEditTarget={handleAddEdit}
                    addingOrEditing={isDisabled}
                    postTarget={handlePostTarget}
                    setEditingElement={setEditingElement}
                  />
                  :
                  <div
                    className={classNames('add-tgt-button', 'no-select')}
                    onClick={() => handleAddEdit(Status.ADD, 1)}
                  >
                    Add Target
                  </div>
                }

              </StyledTgtTable>
            </div>
            :
            <div className={'tgt-dash-body'}>
              {props.exploitDates.length > 0 || props.showDatePlaceholder ?
                <StyledTableHeader
                  className={'tgt-table-header'}
                  headers={['TGT Name', 'MGRS', 'EEI Notes', 'TGT Description', 'Status']}
                />
                :
                null
              }
              <StyledTgtTable displayHelperText={props.exploitDates.length === 0}>
                {printDates(props.exploitDates)}
                {addDate ?
                  <StyledExploitDateDivider
                    rfiId={props.rfi.id}
                    setAddDate={setAddDate}
                    className={classNames('date-divider--placeholder',
                                          props.exploitDates.length === 0 ? 'date-divider--new' : null)}
                    uKey={props.rfi.id}
                    hasTgts={false}
                    postExploitDate={handlePostExploitDate}
                    deleteExploitDate={() => {
                    }}
                    disabled={false}
                    highlight={true}
                  />
                  :
                  null
                }
              </StyledTgtTable>
            </div>
          }
          <div className={'tgt-dash--rfi-description-container'}>
            <div
              className={'tgt-dash--rfi-description-box'}
            >&nbsp;</div>

            <div className={'tgt-dash--rfi-description'}>RFI DESCRIPTION: {props.rfi.description}</div>
            <input className={'hidden-input'}/>
          </div>
          {navigating ?
            <NavigateAwayConfirmationModal
              message={'You haven\'t saved the target you were editing.'}
              display={true}
              setDisplay={setNavigating}
              handleYes={handleNavigate}
              focusedElement={editingElement}
            />
            :
            null}
        </div>
      </div>
      {displayCopyTargets ?
        <StyledTgtCopyModal
          display={true}
          hide={() => setDisplayCopyTargets(false)}
          postTargets={handlePostTargets}
          exploitDates={props.exploitDates}
          targets={props.targets}
        />
        :
        null}
      {displayCopyAllTargets ?
        <CopyTargetsModal/>
        :
        null}
    </div>
  );
};

const mapStateToProps = ({tgtState}: ApplicationState) => ({
  rfi: tgtState.rfi,
  exploitDates: tgtState.exploitDates,
  showDatePlaceholder: tgtState.showDatePlaceholder,
  targets: tgtState.targets,
  addTgt: tgtState.addTgt,
  editTgt: tgtState.editTgt,
  highlight: tgtState.highlight,
});

const mapDispatchToProps = {
  exitTgtPage: exitTgtPage,
  setDatePlaceholder: setDatePlaceholder,
};

export const StyledTgtDashboard = styled(
  connect(mapStateToProps, mapDispatchToProps)(TgtDashboard))`
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .tgt-dash {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }
 
  .tgt-dash-container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-around;
    width: 100%;
  }
 
  .rfi-sidebar {
   justify-self: flex-start;
  }
  
  .tgt-dash-daterange-display-inactive {
    color: ${theme.color.backgroundInformation};
  }
  
  .tgt-dash-body {
    height: calc(100vh - 224px);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    width: 1222px;
  }
  
  .tgt-dash--rfi-description-container {
    height: 108px;
    width: 1232px;
    padding: 8px 44px 8px 8px;
    overflow-y: scroll;
    margin-left: 15px;
    margin-bottom: 16px;
  }
  
  .tgt-dash--rfi-description {
    z-index: 2;
    position: relative;
    width: 1200px;
    
  }

  .tgt-dash--rfi-description-box {
    z-index: 1;
    position: absolute;
    margin-top: -11px;
    margin-left: -6px;
    height: 115px;
    width: 1212px;
    padding: 4px;
    background: ${theme.color.backgroundInformation};
    border-radius: 8px;
    border: 2px solid ${theme.color.modalInputBorder};
  }
  
  .add-tgt-button {
    cursor: pointer;
    box-shadow: -2px 2px 20px #000000;
    width: 1212px;
    height: 62px;
    border-radius: 8px;
    background: ${theme.color.backgroundInformation};
    border: 2px solid ${theme.color.borderAddButton};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.font.sizeMetricsHeader};
    font-weight: ${theme.font.weightBold};
    color: ${theme.color.primaryButton};
    margin-top: 4px; 
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .date-divider--placeholder {
    width: 100%;
    color: ${theme.color.fontBackgroundInactive};
  }
  
  .date-divider--no-top-margin {
    margin-top: 0 !important;
  }
  
  .date-divider--new {
    margin-top: 48px;
  }
  
  .tgt-dash-add-date-button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  
  .add-date-button-disabled {
    pointer-events: none; !important;
    background-color: ${theme.color.primaryButton};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    opacity: 0.5;
    
    :hover {
      box-shadow: 0 0 6px #FFFFFF;
    }
  }
  
  .input-disabled {
    pointer-events: none; !important
    opacity: 0.5; !important
  }

  .add-date-vector {
    pointer-events: none;
  }
  
  AddDateVector {
    pointer-events: none;
  }
  
  .tgt-table-header {
    flex: 0 0 27px;
    padding-right: 15px;
    align-self: flex-start;
  }
  
  .header-cell--name {
    margin-left: 2px;
    width: 123px;
  }
  
  .header-cell--mgrs {
    width: 163px;
  }
  
  .header-cell--notes {
    width: 397px;
  }
  
  .header-cell--description {
    width: 285px;
  }
  
  .header-cell--status {
    width: 110px;
  }
  
  .hidden-input {
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
  
  .delete-edit-button-container {
    border-left: 9px solid ${theme.color.backgroundBase};
    display: flex;
    flex: 0 0 85px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    align-self: stretch;
  }
  
  .name-input-helper {
    font-weight: ${theme.font.weightBolder};
    font-size: ${theme.font.sizeHeader};
    line-height: 28px;
    padding-right: 100px;
    margin-bottom: -43px;
    margin-top: 15px;
  }
  
  .modal-text {
    margin-top: 40px;
  }
`;
