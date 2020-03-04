import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Box, createStyles, Theme, Tooltip, withStyles } from '@material-ui/core';
import { crayonBox } from '../../../resources/crayonBox';
import { makeStyles } from '@material-ui/core/styles';
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
import { RowAction } from '../../../utils';

interface Props {
  target: TargetModel;
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
    }
  };

  useEffect(
    handleAction,
    [action],
  );

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

  const handleDeleteClick = () => {
    setAction(RowAction.DELETING);
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
          bgcolor={theme.color.backgroundStatus}
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
          bgcolor={theme.color.backgroundStatus}
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
                borderColor={theme.color.backgroundAssigned}
                bgcolor={theme.color.backgroundStatus}
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
      </Box>
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
`;
