import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { TargetModel } from '../../store/tgt/TargetModel';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { StyledIxnDashboardHeader } from './IxnDashboardHeader';
import { Box, createMuiTheme, TextField } from '@material-ui/core';
import { crayonBox } from '../../resources/crayonBox';
import { ExploitationLogButtonVectorSmall } from '../../resources/icons/ExploitationLogButtonVector';
import { StyledIxnTable } from './table/IxnTable';
import { StyledSegmentDivider } from './table/SegmentDivider';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { deleteIxn, deleteSegment, exitIxnPage, saveRollup, updateIxn, updateSegment } from '../../store/ixn';
import theme, { longInputStyles, rowStyles } from '../../resources/theme';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledSegmentRegion } from './table/SegmentRegion';
import IxnModel from '../../store/ixn/IxnModel';
import { useCookies } from 'react-cookie';
import { StyledMiniSegmentRegion } from './table/MiniSegmentRegion';
import CopyToClipboard from 'react-copy-to-clipboard';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';
import { useSnackbar } from 'notistack';
import { TargetPostModel } from '../../store/tgt/TargetPostModel';
import { postRollupClick } from '../../store/metrics';
import { RollupClickModel } from '../../store/metrics/RollupClickModel';

interface Props {
  className?: string
}

export const IxnDashboard: React.FC<Props> = props => {
  const moment = require('moment');

  const target: TargetModel = useSelector(({ixnState}: ApplicationState) => ixnState.target);
  const dateString: string = useSelector(({ixnState}: ApplicationState) => ixnState.dateString);
  const segments: SegmentModel[] = useSelector(({ixnState}: ApplicationState) => ixnState.segments);
  const ixns: IxnModel[] = useSelector(({ixnState}: ApplicationState) => ixnState.ixns);

  const mapSegmentStrings = (): string => {
    let segmentString = '';
    for (let segment of segments) {
      let timeBlock = +segment.startTime.format('HHmm');
      let segmentEnd = +segment.endTime.format('HHmm');
      while(timeBlock + 100 - (timeBlock % 100) < segmentEnd) {
        segmentString += timeBlock.toString().padStart(4, '0') + 'Z - '
          + (timeBlock += 100 - (timeBlock % 100)).toString().padStart(4, '0') + 'Z: \n\n';
      }
      segmentString += timeBlock.toString().padStart(4, '0') + 'Z - ' +
        segmentEnd.toString().padStart(4, '0') + 'Z: \n\n';
    }
    return segmentString;
  };

  const initRollup = (): string => {
    return 'Activity Rollup (' + target.name + ')\n\n' +
      moment(dateString, 'MM/DD/YYYY').format('DDMMMYY').toUpperCase() + '\n\n' +
      mapSegmentStrings() +
      'Note:'
  };

  const autofocus: boolean = useSelector(({ixnState}: ApplicationState) => ixnState.autofocus);
  const [addSegment, setAddSegment] = useState(false);
  const [editSegment, setEditSegment] = useState(-1);
  const [editIxn, setEditIxn] = useState(-1);
  const [tgtAnalyst, setTgtAnalyst] = useState('');
  const [rollupMode, setRollupMode] = useState(false);
  const [rollup, setRollup] = useState('');

  const [userCookie, setUserCookie] = useCookies(['magpie']);

  const classes = longInputStyles();
  const rowClasses = rowStyles();

  let addingOrEditing = addSegment || editSegment > 0 || editIxn > 0;

  const handleEditSegment = (segmentId: number) => {
    if (!addSegment && editSegment < 0) {
      setEditSegment(segmentId);
    }
  };

  const handleEditIxn = (ixnId: number) => {
    if (!addSegment && editSegment < 0 && editIxn < 0) {
      setEditIxn(ixnId);
    } else if (ixnId < 0) {
      setEditIxn(-1);
    }
  };

  const theme = createMuiTheme(
    {
      palette: {
        primary: {
          main: crayonBox.skyBlue,
        },
        secondary: {
          main: '#323232',
        },
      },
    });

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const displaySnackbar = (message: string) => {
    enqueueSnackbar(message, {
      action: (key) => DismissSnackbarAction(key, closeSnackbar, rowClasses.snackbarButton),
      variant: 'info',
    });
  };

  const dispatch = useDispatch();

  const handleExitIxnPage = () => {
    setTimeout(() => {
      dispatch(exitIxnPage());
    }, 250);
  };

  const handlePostSegment = (segment: SegmentModel) => {
    setAddSegment(false);
    setTimeout(() => {
      setEditSegment(-1);
    }, 300);
    dispatch(updateSegment(segment));
  };

  const handlePostIxn = (ixn: IxnModel) => {
    setTimeout(() => {
      setEditIxn(-1);
    }, 300);
    dispatch(updateIxn(ixn));
  };

  const handleDeleteIxn = (ixn: IxnModel) => {
    dispatch(deleteIxn(ixn));
  };

  const handleDeleteSegment = (segment: SegmentModel) => {
    dispatch(deleteSegment(segment));
  };

  const handleShowRollup = () => {
    setRollup(target.hourlyRollup === '' ? initRollup() : target.hourlyRollup);
    setRollupMode(true);
    postRollupClick(new RollupClickModel(target.id, userCookie.magpie.userName));
  };

  const performCollapse = (segmentId: number) => {
    let segments = userCookie.magpie.segments;
    if (segments.includes(segmentId)) {
      segments.splice(segments.indexOf(segmentId), 1);
    } else {
      segments.push(segmentId);
    }
    setUserCookie('magpie', {...userCookie.magpie, segments: segments});
  };

  const handleCollapse = (segmentId: number) => {
    performCollapse(segmentId);
  };

  const handleSaveRollup = () => {
    setRollupMode(false);
    let newTarget: TargetPostModel = new TargetPostModel(
      target.id, target.rfiId, target.exploitDateId, target.name, target.mgrs, target.notes, target.description,
      target.status, rollup);
    dispatch(saveRollup(newTarget, dateString));
    displaySnackbar('Rollup Saved');
  };

  function printMiniSegmentRegions() {
    return segments.map(
      (segment: SegmentModel, index: number) =>
        <StyledMiniSegmentRegion
          segment={segment}
          ixns={ixns.filter((ixn) => ixn.segmentId === segment.id)}
          key={index}
        />,
    );
  }

  function printSegmentRegions() {
    return segments.map(
      (segment: SegmentModel, index: number) =>
        <StyledSegmentRegion
          target={target}
          segment={segment}
          ixns={ixns.filter((ixn) => ixn.segmentId === segment.id)}
          key={index}
          postSegment={handlePostSegment}
          postIxn={handlePostIxn}
          deleteIxn={handleDeleteIxn}
          tgtAnalyst={tgtAnalyst}
          setTgtAnalyst={setTgtAnalyst}
          setAddSegment={setAddSegment}
          deleteSegment={handleDeleteSegment}
          editSegment={editSegment}
          setEditSegment={handleEditSegment}
          editIxn={editIxn}
          setEditIxn={handleEditIxn}
          addingOrEditing={addingOrEditing}
          autofocus={autofocus}
          collapsed={userCookie.magpie.segments.includes(segment.id)}
          setCollapsed={handleCollapse}
          userName={userCookie.magpie.userName}
          dateString={moment(dateString, 'MM/DD/YYYY').format('DDMMMYY').toUpperCase()}
        />,
    );
  }

  return (
    <div className={classNames(props.className)}>
      <StyledIxnDashboardHeader
        target={target}
        dateString={dateString}
        exitIxnPage={handleExitIxnPage}
        disableRollupButton={rollupMode ||ixns.length === 0}
        showRollup={handleShowRollup}
      />
      {
        rollupMode ?
          <div className={'rollup-body'}>
            <div className={'rollup'}>
              <div className={classes.modalBody}>
                <form className={classNames('rollup-form')}
                >
                  <div className={classes.modalInputContainer}>
                    <TextField
                      className={classNames('rollup', classes.modalTextfield)}
                      value={rollup}
                      onChange={(event: ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) =>
                        setRollup(event.target.value)}
                      autoFocus
                      multiline
                      rows={25}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      inputProps={{
                        id: 'rollup-input',
                        className: 'rollup-input',
                      }}
                    />
                  </div>
                </form>
                <div className={classes.buttonSection}>
                  <div className={classes.spacer}>&nbsp;</div>
                  <div
                    className={classNames('cancel', classes.modalYes)}
                    onClick={() => {
                      setRollupMode(false);
                      setRollup(target.hourlyRollup === '' ? initRollup() : target.hourlyRollup);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    onClick={handleSaveRollup}
                    className={classNames('save', classes.modalNo)}
                  >
                    SAVE
                  </div>
                  <CopyToClipboard onCopy={() => displaySnackbar('Copied to Clipboard')} text={rollup}>
                    <div
                      className={classNames('copy-to-clipboard', classes.copyToClipboard)}
                    >
                      Copy to Clipboard
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <StyledIxnTable className={'mini-ixn-table-wrapper'}>
              {printMiniSegmentRegions()}
            </StyledIxnTable>
          </div>
          :
          <div className={'ixn-dash-body'}>
            {segments.length > 0 ?
              <StyledTableHeader
                headers={['Exploit Analyst', 'Time', 'Activity', 'Track ID', 'Track Analyst', 'Track Status', 'Lead Checker',
                  'Final Checker', 'delete-spacer']}
              />
              :
              null
            }
            <StyledIxnTable>
              {printSegmentRegions()}
              {addSegment ?
                <StyledSegmentDivider
                  className={'segment-divider-placeholder'}
                  target={target}
                  segment={null}
                  postSegment={handlePostSegment}
                  postIxn={handlePostIxn}
                  deleteSegment={handleDeleteSegment}
                  setAddSegment={setAddSegment}
                  hasIxns={false}
                  setEdit={handleEditSegment}
                  editing={true}
                />
                :
                null
              }
            </StyledIxnTable>
            <div className={'add-segment-button-container'}>
              <Box
                height={42}
                width={160}
                border={2}
                borderRadius={21}
                borderColor={crayonBox.safetyOrange}
                bgcolor={theme.palette.secondary.main}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                paddingRight={0.45}
                paddingLeft={1.8}
                fontSize={12}
                onClick={() => {
                  setAddSegment(true);
                  setTimeout(() => {
                    let scrollToLocation = document.getElementById('ixn-table-scrollable-region');
                    if (scrollToLocation !== null) {
                      scrollToLocation!.scrollTo(0, scrollToLocation!.scrollHeight);
                    }
                  }, 50);
                }}
                className={classNames(
                  'add-segment-button',
                  'no-select',
                  addSegment && editSegment < 0 ? 'add-segment-button-disabled' : null,
                )}
              >
                Add Segment
                <ExploitationLogButtonVectorSmall/>
              </Box>
              {/*Prevents user from tabbing out of page to address bar*/}
              <input className={'hidden-input'}/>
            </div>
          </div>
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
  
  .rollup-body {
    margin-top: -25px;
    width: 100%;
    height: calc(100vh - 116px);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 62px;
  }
  
  .mini-ixn-table-wrapper {
    padding-left: 0 !important;
  }
  
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
