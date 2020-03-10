import * as React from 'react';
import IxnModel, { IxnStatus } from '../../../store/ixn/IxnModel';
import { Box, Theme, Tooltip, withStyles } from '@material-ui/core';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import classNames from 'classnames';
import InProgressButton from '../../components/statusButtons/InProgressButton';
import CompletedButton from '../../components/statusButtons/CompletedButton';
import NotStartedButton from '../../components/statusButtons/NotStartedButton';
import { StyledIxnStatusPickerOutline } from '../../../resources/icons/IxnStatusPickerOutline';
import DoesNotMeetEeiButton from '../../components/statusButtons/DoesNotMeetEeiButton';
import { IxnDeleteButton } from './IxnDeleteButton';
import styled from 'styled-components';
import { rowStyles } from '../../../resources/theme';

interface MyProps {
  ixn: IxnModel;
  segment: SegmentModel;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  setEditIxn: (ixnId: number) => void;
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

export const IxnRow: React.FC<MyProps> = props => {
  const classes = rowStyles();

  const handleDeleteClick = () => {
    props.deleteIxn(props.ixn);
  };

  const handleDoubleClick = () => {
    props.setEditIxn(props.ixn.id!);
  };

  const submitStatusChange = (status: IxnStatus) => {
    let ixn: IxnModel = {...props.ixn, status: status};
    props.postIxn(ixn);
  };

  return (
    <div className={props.className} id={'ixn-row-' + props.segment.id + '-' + props.ixn.id}>
      <Box
        borderRadius={8}
        className={'ixn-row-box'}
        onDoubleClick={handleDoubleClick}
      >
        <div className={classNames('ixn-data-cell', 'exploit-analyst', 'name')}>
          {props.ixn.exploitAnalyst ? props.ixn.exploitAnalyst : '\xa0'}
        </div>
        <div className={classNames('ixn-data-cell', 'time')}>
          {props.ixn.time.utc().format('HH:mm:ss') + 'Z'}
        </div>
        <div className={classNames('ixn-data-cell', 'activity')}>
          {props.ixn.activity ? props.ixn.activity : '\xa0'}
        </div>
        <div className={classNames('ixn-data-cell', 'track')}>
          {props.ixn.track ? props.ixn.track : '\xa0'}
        </div>
        <div className={classNames('ixn-data-cell', 'track-analyst', 'name')}>
          {props.ixn.trackAnalyst ? props.ixn.trackAnalyst : '\xa0'}
        </div>
        <div className={classNames('ixn-data-cell', 'status')}>
          <HtmlTooltip
            title={
              <div className={'status-menu'}>
                <StyledIxnStatusPickerOutline/>
                <InProgressButton buttonClass={classNames(classes.inProgress, classes.clickable)}
                                  onClick={() => submitStatusChange(IxnStatus.IN_PROGRESS)}/>
                <CompletedButton buttonClass={classNames(classes.completed, classes.clickable)}
                                 onClick={() => submitStatusChange(IxnStatus.COMPLETED)}/>
                <DoesNotMeetEeiButton buttonClass={classNames(classes.doesNotMeetEei, classes.clickable)}
                                      onClick={() => submitStatusChange(IxnStatus.DOES_NOT_MEET_EEI)}/>
              </div>
            }
            interactive
            disableHoverListener={props.addingOrEditing}
          >
            <div className={'status-wrapper'}>
              {props.ixn.status === IxnStatus.NOT_STARTED ?
                <NotStartedButton buttonClass={classes.statusUnclickable}/>
                : props.ixn.status === IxnStatus.IN_PROGRESS ?
                  <InProgressButton buttonClass={classes.statusUnclickable}/>
                  : props.ixn.status === IxnStatus.DOES_NOT_MEET_EEI ?
                    <DoesNotMeetEeiButton buttonClass={classes.statusUnclickable}/>
                    : <CompletedButton buttonClass={classes.statusUnclickable}/>}
            </div>
          </HtmlTooltip>
        </div>
        <div className={classNames('ixn-data-cell', 'lead-checker', 'name')}>
          {props.ixn.leadChecker ? props.ixn.leadChecker : '\xa0'}
        </div>
        <div className={classNames('ixn-data-cell', 'final-checker', 'name')}>
          {props.ixn.finalChecker ? props.ixn.finalChecker : '\xa0'}
        </div>
        <IxnDeleteButton handleClick={handleDeleteClick} className={'delete-ixn-button-container'}/>
      </Box>
    </div>
  );
};

export const StyledIxnRow = styled(IxnRow)`
 .ixn-data-cell {
    margin: 14px 8px 8px 8px;
    padding-bottom: 6px;
    overflow-wrap: break-word;
    border-bottom: 1px solid #FFFFFF;
  }
  
  .status {
    border: none;
  }
`;
