import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { TargetModel } from '../../store/tgt/TargetModel';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { StyledIxnDashboardHeader } from './IxnDashboardHeader';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { exitIxnPage, saveRollup } from '../../store/ixn';
import theme, { rowStyles } from '../../resources/theme';
import IxnModel from '../../store/ixn/IxnModel';
import { useCookies } from 'react-cookie';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';
import { useSnackbar } from 'notistack';
import { TargetPostModel } from '../../store/tgt/TargetPostModel';
import { postRollupClick } from '../../store/metrics';
import { RollupClickModel } from '../../store/metrics/RollupClickModel';
import { RollupMode, StyledRollupView } from './RollupView';
import { IxnTableView } from './IxnTableView';

interface Props {
  className?: string
}

export const IxnDashboard: React.FC<Props> = props => {
  const moment = require('moment');

  const target: TargetModel = useSelector(({ixnState}: ApplicationState) => ixnState.target);
  const dateString: string = useSelector(({ixnState}: ApplicationState) => ixnState.dateString);
  const segments: SegmentModel[] = useSelector(({ixnState}: ApplicationState) => ixnState.segments);
  const ixns: IxnModel[] = useSelector(({ixnState}: ApplicationState) => ixnState.ixns);
  const autofocus: boolean = useSelector(({ixnState}: ApplicationState) => ixnState.autofocus);

  const [tgtAnalyst, setTgtAnalyst] = useState('');
  const [rollupMode, setRollupMode] = useState(false);

  const [userCookie, setUserCookie] = useCookies(['magpie']);

  const rowClasses = rowStyles();

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const displaySnackbar = (message: string) => {
    enqueueSnackbar(message, {
      action: (key) => DismissSnackbarAction(key, closeSnackbar, rowClasses.snackbarButton),
      variant: 'info',
    });
  };

  const dispatch = useDispatch();

  const handleCollapse = (segmentId: number) => {
    let segments = userCookie.magpie.segments;
    if (segments.includes(segmentId)) {
      segments.splice(segments.indexOf(segmentId), 1);
    } else {
      segments.push(segmentId);
    }
    setUserCookie('magpie', {...userCookie.magpie, segments: segments});
  };

  const handleExitIxnPage = () => {
    setTimeout(() => {
      dispatch(exitIxnPage());
    }, 250);
  };

  const handleShowRollup = () => {
    setRollupMode(true);
    postRollupClick(new RollupClickModel(target.id, userCookie.magpie.userName));
  };

  const handleExitRollupMode = () => {
    setRollupMode(false);
  };

  const handleSaveRollup = (mode: RollupMode, rollup: string) => {
    setRollupMode(false);
    let newTarget: TargetPostModel;
    if (mode === RollupMode.ALL_CALLOUTS) {
      newTarget = new TargetPostModel(target.id, target.rfiId, target.exploitDateId, target.name, target.mgrs,
                                      target.notes, target.description, target.status, target.hourlyRollup, rollup);
    } else {
      newTarget = new TargetPostModel(target.id, target.rfiId, target.exploitDateId, target.name, target.mgrs,
                                      target.notes, target.description, target.status, rollup, target.allCallouts);
    }
    dispatch(saveRollup(newTarget, dateString));
    displaySnackbar('Rollup Saved');
  };

  const handleDisplaySnackbar = (message: string) => {
    displaySnackbar(message);
  };

  return (
    <div className={classNames(props.className)}>
      <StyledIxnDashboardHeader
        target={target}
        dateString={dateString}
        exitIxnPage={handleExitIxnPage}
        disableRollupButton={rollupMode || ixns.length === 0}
        showRollup={handleShowRollup}
      />
      {
        rollupMode ?
          <StyledRollupView
            target={target}
            dateString={moment(dateString, 'MM/DD/YYYY').format('DDMMMYY').toUpperCase()}
            segments={segments}
            ixns={ixns}
            exitRollupMode={handleExitRollupMode}
            saveRollup={handleSaveRollup}
            displaySnackbar={handleDisplaySnackbar}
            userName={userCookie.magpie.userName}
          />
          :
          <IxnTableView
            target={target}
            segments={segments}
            ixns={ixns}
            autofocus={autofocus}
            tgtAnalyst={tgtAnalyst}
            setTgtAnalyst={setTgtAnalyst}
            collapsedSegments={userCookie.magpie.segments}
            collapse={handleCollapse}
            userName={userCookie.magpie.userName}
            dateString={moment(dateString, 'MM/DD/YYYY').format('DDMMMYY').toUpperCase()}
          />
      }
    </div>
  );
};

export const StyledIxnDashboard = styled(IxnDashboard)`
  font-size: ${theme.font.sizeRow};
  font-family: ${theme.font.familyRow};
  color: ${theme.color.fontPrimary};
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  
  .add-segment-button-container {
    height: 62px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .add-segment-button {
    cursor: pointer; 
    font-weight: bold;
    font-size: 16px;
    
    :hover {
      box-shadow: 0 0 8px #FFFFFF;
    }
  }
  
  .add-segment-button-disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .add-segment-vector {
    margin-left: -33px;
    margin-bottom: -4px;
    pointer-events: none;
  }
  
  AddDateVector {
    pointer-events: none;
  }
  
  .ixn-dash-body {
    height: calc(100vh - 141px);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    margin-top: -25px;
    padding-left: 8px;
  }
  
  .header-cell--analyst {
    width: 154px;
  }
  
  .header-cell--checker {
    width: 154px;
  }
  
  .header-cell--time {
    width: 106px;
  }
  
  .header-cell--activity {
    width: 414px;
  }
  
  .header-cell--id {
    text-align: center;
    padding-left: 10px;
    width: 83px;
  }
  
  .header-cell--status {
    width: 118px;
  }
  
  .header-cell--delete-spacer {
    width: 90px;
  }
  
  .hidden-input {
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
  
  .ixn-row-box {
    min-height: 62px;
    margin-top: 8px;
    background-color: ${theme.color.backgroundInformation};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;
    margin-bottom: 9px;
    padding-right: 7px;
  }
  
  .name {
    width: 146px;
  }
  
  .time {
    width: 98px;
  }

  .activity {
    width: 406px;
  }
  
  .track {
    width: 75px;
    text-align: center;
  }
  
  .status {
    width: 110px;
  }
  
  .delete-edit-button-container {
    display: flex;
    align-self: stretch;
    border-left: 4px solid ${theme.color.backgroundBase};
    padding-left: 4px;
    width: 90px;
    height: inherit;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex: 1 1 auto;
  }
`;
