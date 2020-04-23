import styled from 'styled-components';
import * as React from 'react';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledTgtTable } from './table/TgtTable';
import { StyledExploitDateDivider } from './table/ExploitDateDivider';
import { Box } from '@material-ui/core';
import theme, { rowStyles } from '../../resources/theme';
import { crayonBox } from '../../resources/crayonBox';
import { ApplicationState } from '../../store';
import { StyledTgtDateSection } from './table/TgtDateRegion';
import { StyledTgtDashboardHeader } from './TgtDashboardHeader';
import { ExploitDateModel } from '../../store/tgt/ExploitDateModel';
import { TargetModel } from '../../store/tgt/TargetModel';
import RfiModel, { RfiStatus } from '../../store/rfi/RfiModel';
import { deleteExploitDate, deleteTgt, loadTgtPage, postExploitDate, submitPostTarget } from '../../store/tgt/Thunks';
import {
  addTgt,
  editTgt,
  exitTgtPage,
  resetAddEditTgt,
  setDatePlaceholder,
  truncateAndConvertDateToUtc,
  updateTgtsLocal,
} from '../../store/tgt';
import { TargetPostModel } from '../../store/tgt/TargetPostModel';
import { ExploitDatePostModel } from '../../store/tgt/ExploitDatePostModel';
import { useCookies } from 'react-cookie';
import { Cookie } from '../../utils';
import { UndoSnackbarAction } from '../components/UndoSnackbarAction';
import { navigateToIxnPage } from '../../store/ixn';
import { useSnackbar } from 'notistack';
import { StyledRfiSidebar } from './sidebar/RfiSidebar';

interface MyProps {
  rfi: RfiModel;
  exploitDates: ExploitDateModel[];
  showDatePlaceholder: boolean;
  exitTgtPage: () => void;
  setDatePlaceholder: (show: boolean) => void;
  targets: TargetModel[];
  addTgt: number;
  editTgt: number;
  className?: string;
}

export enum Status {
  VIEW,
  ADD,
  EDIT
}

export const TgtDashboard: React.FC<MyProps> = props => {
  const moment = require('moment');
  const classes = rowStyles();
  const [cookies, setCookies] = useCookies(['magpie']);
  let cookie: Cookie = cookies.magpie;
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const [addDate, setAddDate] = useState(false);

  const isDisabled = props.addTgt > 0 || addDate || props.editTgt > 0 || props.rfi.status === RfiStatus.CLOSED;

  const dispatch = useDispatch();

  const handlePostTarget = (target: TargetPostModel) => {
    let tgt = new TargetModel(target.targetId ? target.targetId : -1, target.rfiId, target.exploitDateId, target.name,
                              target.mgrs, target.notes, target.description, target.status, '', '');
    if (props.rfi.status !== RfiStatus.CLOSED) {
      dispatch(updateTgtsLocal(tgt));
      dispatch(submitPostTarget(target, props.rfi, cookie.userName));
    }
  };

  const handlePostExploitDate = (date: ExploitDatePostModel) => {
    if (props.rfi.status !== RfiStatus.CLOSED) {
      dispatch(postExploitDate(props.rfi, date));
    }
  };

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
        action: (key) => UndoSnackbarAction(key, {...target, targetId: target.id},
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
        action: (key) => UndoSnackbarAction(
          key, exploitDatePost, handlePostExploitDate,
          closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });
      dispatch(deleteExploitDate(exploitDate.id));
    }
  };

  const handleNavigateToIxnPage = (target: TargetModel, dateString: string) => {
    setCookies('magpie', {...cookie, viewState: {rfiId: target.rfiId, tgtId: target.id}});
    dispatch(navigateToIxnPage(target, dateString));
  };

  const handleSelectRfi = (rfi: RfiModel) => {
    setCookies('magpie', {...cookie, viewState: {rfiId: rfi.id}});
    dispatch(loadTgtPage(rfi, true));
  }

  const handleAddDate = () => {
    setAddDate(true);
  }

  function printDates(dates: ExploitDateModel[]) {
    return dates.map((exploitDateModel: ExploitDateModel, index: number) =>
                       <StyledTgtDateSection
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
                       />,
    );
  }

  return (
    <div className={classNames(props.className)}>
      <StyledTgtDashboardHeader
        exitTgtPage={props.exitTgtPage}
        rfi={props.rfi}
        editing={props.addTgt > 0 || props.editTgt > 0 || addDate}
        addDate={handleAddDate}
        disabled={isDisabled || props.exploitDates.length === 0}
        displayHelperText={props.exploitDates.length < 2 && props.rfi.status === RfiStatus.OPEN}
      />
      <div className={'tgt-dash-container'}>
        <div className={'rfi-sidebar'}>
          <StyledRfiSidebar
            rfi={props.rfi}
            selectRfi={handleSelectRfi}
          />
        </div>
        <div className={'tgt-dash'}>
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
              {addDate || (props.exploitDates.length === 0 && props.rfi.status === RfiStatus.OPEN) ?
                <StyledExploitDateDivider
                  rfiId={props.rfi.id}
                  setAddDate={setAddDate}
                  className={'date-divider--placeholder'}
                  uKey={props.rfi.id}
                  hasTgts={false}
                  postExploitDate={handlePostExploitDate}
                  deleteExploitDate={() => {
                  }}
                  disabled={false}
                />
                :
                null
              }
            </StyledTgtTable>
          </div>
          <div className={'tgt-dash--rfi-description-container'}>
            <Box
              borderColor={crayonBox.eggWhite}
              className={'tgt-dash--rfi-description'}
            >
              <span>RFI DESCRIPTION: {props.rfi.description}</span>
            </Box>
              <input className={'hidden-input'}/>
          </div>
        </div>
      </div>
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
    height: calc(100vh - 199px);
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    width: 1222px;
  }
  
  .tgt-dash--rfi-description-container {
    width: 100%;
    padding-left: 113px;
    padding-right: 113px;
    padding-bottom: 21px;
    height: 136px;
  }

  .tgt-dash--rfi-description {
    height: 115px;
    min-width: 500px;
    padding: 4px 16px 4px 4px;
    overflow-y: auto;
    background: ${theme.color.backgroundInformation};
    border-radius: 8px;
    border: 2px solid ${theme.color.modalInputBorder};
  }
  
  .date-divider--placeholder {
    width: 100%;
    color: ${theme.color.fontBackgroundInactive};
    margin-bottom: -32px;
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
`;
