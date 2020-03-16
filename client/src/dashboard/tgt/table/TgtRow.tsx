import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Box, Theme, Tooltip, withStyles } from '@material-ui/core';
import { StyledDeleteButtonTrashcan } from '../../../resources/icons/DeleteButtonTrashcan';
import { StyledExploitationLogButtonVector } from '../../../resources/icons/ExploitationLogButtonVector';
import { connect } from 'react-redux';
import theme, { rowStyles } from '../../../resources/theme';
import { deleteTgt } from '../../../store/tgt/Thunks';
import { TargetModel, TargetStatus } from '../../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { navigateToIxnPage } from '../../../store/ixn';
import { TargetPostModel } from '../../../store/tgt/TargetPostModel';
import RfiModel from '../../../store/rfi/RfiModel';
import { StyledTgtStatusPickerOutline } from '../../../resources/icons/TgtStatusPickerOutline';
import { Status } from '../TgtDashboard';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { IxnDeserializer } from '../../../store/ixn/IxnDeserializer';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import { useSnackbar } from 'notistack';
import { UndoSnackbarAction } from '../../components/UndoSnackbarAction';
import { DeleteCancelButton } from '../../ixn/table/DeleteCancelButton';

interface Props {
  target: TargetModel;
  exploitDate: ExploitDateModel;
  rfi: RfiModel;
  setAddEditTarget: (status: Status, id?: number) => void;
  postTarget: (target: TargetPostModel) => void;
  navigateToIxnPage: (target: TargetModel, dateString: string) => void;
  deleteTgt: (tgtId: number) => void;
  key: number;
  addingOrEditing: boolean;
  className?: string;
}

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
  const classes = rowStyles();

  const [displayModal, setDisplayModal] = useState(false);

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const submitStatusChange = (status: TargetStatus) => {
    let newTarget: TargetPostModel = new TargetPostModel(props.target.id, props.rfi.id, props.exploitDate.id,
      props.target.name, props.target.mgrs, props.target.notes, props.target.description, status);
    props.postTarget(
      newTarget,
    );
  };

  const handleDeleteClick = () => {
    fetch('/api/ixn/' + props.target.id)
      .then(response => response.json())
      .then(ixns => checkIxns(IxnDeserializer.deserialize(ixns).length > 0));
  };

  const performDelete = () => {
    enqueueSnackbar('You deleted ' + props.target.name, {
      action: (key) => UndoSnackbarAction(key, {...props.target, targetId: props.target.id},
        props.postTarget, closeSnackbar, classes.snackbarButton),
      variant: 'info',
    });
    props.deleteTgt(props.target.id);
  };

  const checkIxns = (hasIxns: boolean) => {
    if (hasIxns)
      setDisplayModal(true);
    else {
      performDelete();
    }
  };

  const handleIxnClick = () => {
    if (props.target !== null) {
      props.navigateToIxnPage(props.target, props.exploitDate.exploitDate.format('MM/DD/YYYY'));
    }
  };

  const handleDoubleClick = () => {
    props.setAddEditTarget(Status.EDIT, props.target.id);
    setTimeout(() => {
      if (props.target)
        document.getElementById('tgt-name-input-' + props.target.id)!.focus();
    }, 50);
  };

  return (
    <div className={props.className}>
      <Box
        borderRadius={8}
        className={'tgt-form-box'}
      >
        <div className={'tgt-form'}
             onDoubleClick={handleDoubleClick}
        >
          <div className={'data-cell-container'}>
            <div className={classNames('data-cell', 'tgt-name')}>
              {props.target.name}
            </div>
            <div className={'data-bottom'}>&nbsp;</div>
          </div>
          <div className={'data-cell-container'}>
            <div className={classNames('data-cell', 'mgrs')}>
              {props.target.mgrs}
            </div>
            <div className={'data-bottom'}>&nbsp;</div>
          </div>
          <div className={'data-cell-container'}>
            <div className={classNames('data-cell', 'notes')}>
              <div className={'data-overflow'}>
                {props.target.notes === '' ? '\xa0' : props.target.notes}
              </div>
            </div>
            <div className={'data-bottom'}>&nbsp;</div>
          </div>
          <div className={'data-cell-container'}>
            <div className={classNames('data-cell', 'description')}>
              <div className={'data-overflow'}>
                {props.target.description === '' ? '\xa0' : props.target.description}
              </div>
            </div>
            <div className={'data-bottom'}>&nbsp;</div>
          </div>
        </div>
        <HtmlTooltip
          title={
            <div className={'status-menu'}>
              <StyledTgtStatusPickerOutline/>
              <InProgressButton buttonClass={classNames(classes.inProgress, classes.clickable, classes.tgtClickable)}
                                onClick={() => submitStatusChange(TargetStatus.IN_PROGRESS)}/>
              <CompletedButton buttonClass={classNames(classes.completed, classes.clickable, classes.tgtClickable)}
                               onClick={() => submitStatusChange(TargetStatus.COMPLETED)}/>
            </div>
          }
          interactive
          disableHoverListener={props.addingOrEditing}
        >
          <div
            className={'status-wrapper'}>
            {props.target.status === TargetStatus.NOT_STARTED ?
              <NotStartedButton buttonClass={classes.statusUnclickable}/>
              : (props.target.status === TargetStatus.IN_PROGRESS ?
                <InProgressButton buttonClass={classes.statusUnclickable}/>
                :
                <CompletedButton buttonClass={classes.statusUnclickable}/>)
            }</div>
        </HtmlTooltip>
        <DeleteCancelButton
          handleClick={handleDeleteClick}
          title={'Delete Target'}
          buttonClassName={'delete-tgt-button'}
          className={'delete-edit-button-container'}
        >
          <StyledDeleteButtonTrashcan/>
        </DeleteCancelButton>
        <div className={classNames('exploitation', props.target ? '' : 'input-disabled')} onClick={handleIxnClick}>
          <StyledExploitationLogButtonVector/>
        </div>
      </Box>
      <DeleteConfirmationModal
        deletingItem={props.target.name}
        display={displayModal}
        setDisplay={setDisplayModal}
        handleYes={() => performDelete()}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
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
`;
