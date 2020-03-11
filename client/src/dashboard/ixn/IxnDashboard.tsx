import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { TargetModel } from '../../store/tgt/TargetModel';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { StyledIxnDashboardHeader } from './IxnDashboardHeader';
import { Box, createMuiTheme } from '@material-ui/core';
import { crayonBox } from '../../resources/crayonBox';
import { ExploitationLogButtonVectorSmall } from '../../resources/icons/ExploitationLogButtonVector';
import { StyledIxnTable } from './table/IxnTable';
import { StyledSegmentDivider } from './table/SegmentDivider';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { deleteIxn, deleteSegment, updateIxn, updateSegment } from '../../store/ixn';
import theme from '../../resources/theme';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledSegmentRegion } from './table/SegmentRegion';
import IxnModel from '../../store/ixn/IxnModel';

interface Props {
  className?: string
}

export const IxnDashboard: React.FC<Props> = props => {
  const [addSegment, setAddSegment] = useState(false);
  const [editSegment, setEditSegment] = useState(-1);
  const [editIxn, setEditIxn] = useState(-1);
  const [tgtAnalyst, setTgtAnalyst] = React.useState('');

  const target: TargetModel = useSelector(({ixnState}: ApplicationState) => ixnState.target);
  const segments: SegmentModel[] = useSelector(({ixnState}: ApplicationState) => ixnState.segments);
  const ixns: IxnModel[] = useSelector(({ixnState}: ApplicationState) => ixnState.ixns);

  let addingOrEditing = addSegment || editSegment > 0 || editIxn > 0;

  const handleEditSegment = (segmentId: number) => {
    if (!addSegment && editSegment < 0)
      setEditSegment(segmentId);
  };

  const handleEditIxn = (ixnId: number) => {
    if (!addSegment && editSegment < 0 && editIxn < 0) {
      setEditIxn(ixnId);
    }
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: crayonBox.skyBlue,
      },
      secondary: {
        main: '#323232',
      },
    },
  });
  const dispatch = useDispatch();

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

  function printSegmentRegions(segmentList: SegmentModel[]) {
    return segmentList.map((segment: SegmentModel, index: number) =>
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
      />,
    );
  }

  return (
    <div className={classNames(props.className)}>
      <StyledIxnDashboardHeader
        target={target}
      />
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
          {printSegmentRegions(segments)}
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
                if (scrollToLocation !== null)
                  scrollToLocation!.scrollTo(0, scrollToLocation!.scrollHeight);
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
    background-color: #464646;
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
  
  .delete-ixn-button-container {
    display: flex;
    align-self: stretch;
  }
  
  .delete-ixn-button {
    border-left: 4px solid ${theme.color.backgroundBase};
    width: 90px;
    height: inherit;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex: 1 1 auto;
  }
`;
