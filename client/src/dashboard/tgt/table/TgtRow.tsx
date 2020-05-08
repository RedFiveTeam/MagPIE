import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Box } from '@material-ui/core';
import { StyledExploitationLogButtonVector } from '../../../resources/icons/ExploitationLogButtonVector';
import theme, { rowStyles } from '../../../resources/theme';
import { TargetModel, TargetStatus } from '../../../store/tgt/TargetModel';
import { ExploitDateModel } from '../../../store/tgt/ExploitDateModel';
import { TargetPostModel } from '../../../store/tgt/TargetPostModel';
import RfiModel, { RfiStatus } from '../../../store/rfi/RfiModel';
import { StyledTgtStatusPickerOutline } from '../../../resources/icons/TgtStatusPickerOutline';
import { Status } from '../TgtDashboard';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import { IxnDeserializer } from '../../../store/ixn/IxnDeserializer';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import { MiniTrashcanButton } from '../../../resources/icons/MiniTrashcanButton';
import HtmlTooltip from '../../components/HtmlToolTip';

interface Props {
  target: TargetModel;
  exploitDate: ExploitDateModel;
  rfi: RfiModel;
  setAddEditTarget: (status: Status, id?: number) => void;
  postTarget: (target: TargetPostModel) => void;
  navigateToIxnPage: (target: TargetModel, dateString: string) => void;
  deleteTgt: (tgt: TargetModel) => void;
  key: number;
  addingOrEditing: boolean;
  highlight: boolean;
  className?: string;
}

export const TgtRow: React.FC<Props> = props => {
  const classes = rowStyles();

  const [displayModal, setDisplayModal] = useState(false);
  const [highlighted, setHighlighted] = useState(true);

  useEffect(() => {
    if (!props.highlight) {
      setHighlighted(false);
    } else {
      setTimeout(() => {
        setHighlighted(false);
      }, 5000);
    }
  }, []);

  const submitStatusChange = (status: TargetStatus) => {
    let newTarget: TargetPostModel = new TargetPostModel(props.target.id, props.rfi.id, props.exploitDate.id,
                                                         props.target.name, props.target.mgrs, props.target.notes,
                                                         props.target.description, status, '', '');
    props.postTarget(
      newTarget,
    );
  };

  const handleDeleteClick = () => {
    fetch('/api/ixn/' + props.target.id)
      .then(response => response.json())
      .then(ixns => checkIxns(IxnDeserializer.deserialize(ixns).length > 0))
      .catch((reason) => {
        console.log('Failed to delete: ' + reason);
      });
  };

  const performDelete = () => {
    props.deleteTgt(props.target);
  };

  const checkIxns = (hasIxns: boolean) => {
    if (hasIxns) {
      setDisplayModal(true);
    } else {
      performDelete();
    }
  };

  const handleIxnClick = () => {
    if (props.target !== null) {
      props.navigateToIxnPage(props.target, props.exploitDate.exploitDate.format('MM/DD/YYYY'));
    }
  };

  const handleDoubleClick = (event: any) => {
    let className: String = event.target.className;
    props.setAddEditTarget(Status.EDIT, props.target.id);
    setTimeout(() => {
      if (className.includes('name') && document.getElementById('tgt-name-input')) {
        document.getElementById('tgt-name-input')!.focus();
      }
      if (className.includes('mgrs') && document.getElementById('mgrs-input')) {
        document.getElementById('mgrs-input')!.focus();
      }
      if (className.includes('notes') && document.getElementById('notes-input')) {
        document.getElementById('notes-input')!.focus();
      }
      if (className.includes('description') && document.getElementById('description-input')) {
        document.getElementById('description-input')!.focus();
      }
    }, 50);
  };

  return (
    <div className={props.className}>
      <HtmlTooltip
        title={
          <div className={'delete-container'}>
            <MiniTrashcanButton onClick={handleDeleteClick} className={'delete-tgt-button'} tooltip={'Delete Target'}/>
          </div>}
        placement={'bottom-end'}
        PopperProps={{
          popperOptions: {
            modifiers: {
              offset: {
                enabled: true,
                offset: '45px, -35px',
              },
            },
          },
        }}
        interactive
        disableHoverListener={props.addingOrEditing}
        leaveDelay={100}
      >
        <Box
          borderRadius={8}
          className={classNames('tgt-form-box', highlighted && props.highlight ? 'highlighted' : null)}
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
                <div className={'data-notes'}>
                  {props.target.notes === '' ? '\xa0' : props.target.notes}
                </div>
              </div>
              <div className={'data-bottom'}>&nbsp;</div>
            </div>
            <div className={'data-cell-container'}>
              <div className={classNames('data-cell', 'description')}>
                <div className={'data-description'}>
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
          <div className={classNames('exploitation', props.addingOrEditing && !(props.rfi.status === RfiStatus.CLOSED)
            ? 'delete-disabled' : null)} onClick={handleIxnClick}>
            <StyledExploitationLogButtonVector/>
          </div>
        </Box>
      </HtmlTooltip>
      <DeleteConfirmationModal
        deletingItem={props.target.name}
        display={displayModal}
        setDisplay={setDisplayModal}
        handleYes={() => performDelete()}
      />
    </div>
  );
};

export const StyledTgtRow = styled(TgtRow)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
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
    cursor: pointer;
    border-left: 9px solid ${theme.color.backgroundBase};
    align-self: stretch;
  }
  
  .tgt-form-box {
    min-height: 62px;
    width: 100%;
    margin: 4px 0;
    background-color: ${theme.color.backgroundInformation};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    padding-right: 7px;
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
    svg {
      opacity: 0.5;
    }
    
    pointer-events: none;
  }
  
  .highlighted {
    background: ${theme.color.backgroundHighlighted} !important;
  }
`;
