import * as React from 'react';
import { useState } from 'react';
import { StyledTableHeader } from '../components/header/TableHeader';
import { StyledIxnTable } from './table/IxnTable';
import { StyledSegmentDivider } from './table/SegmentDivider';
import { Box } from '@material-ui/core';
import classNames from 'classnames';
import { ExploitationLogButtonVectorSmall } from '../../resources/icons/ExploitationLogButtonVector';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { StyledSegmentRegion } from './table/SegmentRegion';
import { TargetModel } from '../../store/tgt/TargetModel';
import IxnModel from '../../store/ixn/IxnModel';
import { deleteIxn, deleteSegment, updateIxn, updateSegment } from '../../store/ixn';
import { useDispatch } from 'react-redux';
import { DismissSnackbarAction } from '../components/InformationalSnackbar';
import { useSnackbar } from 'notistack';
import theme, { rowStyles } from '../../resources/theme';
import { UndoSnackbarAction } from '../components/UndoSnackbarAction';

interface MyProps {
  target: TargetModel;
  segments: SegmentModel[];
  ixns: IxnModel[];
  autofocus: boolean;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  collapsedSegments: number[];
  collapse: (segmentId: number) => void;
  userName: string;
  dateString: string;
  readOnly: boolean;
  className?: string;
}

export const IxnTableView: React.FC<MyProps> = (props) => {
  const [addSegment, setAddSegment] = useState(false);
  const [editSegment, setEditSegment] = useState(-1);
  const [editIxn, setEditIxn] = useState(-1);
  const [addNote, setAddNote] = useState(-1);

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const classes = rowStyles();

  let addingOrEditing = addSegment || editSegment > 0 || editIxn > 0 || addNote > 0 || props.readOnly;

  const dispatch = useDispatch();

  const handleEditSegment = (segmentId: number) => {
    if (!addingOrEditing) {
      setEditSegment(segmentId);
    } else if (segmentId < 0) {
      setEditSegment(-1);
    }
  };

  const handleEditIxn = (ixnId: number) => {
    if (!addingOrEditing) {
      setEditIxn(ixnId);
    } else if (ixnId < 0) {
      setEditIxn(-1);
    }
  };

  const handleAddNote = (ixnId: number) => {
    if (!addingOrEditing) {
      setAddNote(ixnId);
    } else if (ixnId < 0) {
      setAddNote(-1);
    }
  };

  const handlePostSegment = (segment: SegmentModel) => {
    if (!props.readOnly) {
      setAddSegment(false);
      setTimeout(() => {
        setEditSegment(-1);
      }, 300);
      dispatch(updateSegment(segment));
    }
  };

  const handlePostIxn = (ixn: IxnModel) => {
    if (!props.readOnly) {
      if (addNote > 0) {
        enqueueSnackbar('Analyst Note Saved.', {
          action: (key) => DismissSnackbarAction(key, closeSnackbar, classes.snackbarButton),
          variant: 'info',
        });
      }
      setTimeout(() => {
        setEditIxn(-1);
        setAddNote(-1);
      }, 300);
      dispatch(updateIxn(ixn, props.userName));
    }
  };

  const handleDeleteIxn = (ixn: IxnModel) => {
    if (!props.readOnly) {
      enqueueSnackbar('Interaction deleted', {
        action: (key) =>
          UndoSnackbarAction(key, ixn, handlePostIxn, closeSnackbar, classes.snackbarButton),
        variant: 'info',
      });
      dispatch(deleteIxn(ixn));
    }
  };

  const handleDeleteSegment = (segment: SegmentModel) => {
    if (!props.readOnly) {
      enqueueSnackbar('You deleted ' + segment.startTime.format('HH:mm:ss') + 'Z-' +
                        segment.endTime.format('HH:mm:ss') + 'Z', {
                        action: (key) => UndoSnackbarAction(key, segment, handlePostSegment,
                                                            closeSnackbar, classes.snackbarButton),
                        variant: 'info',
                      });
      dispatch(deleteSegment(segment));
    }
  };

  function printSegmentRegions() {
    return props.segments.map(
      (segment: SegmentModel, index: number) =>
        <StyledSegmentRegion
          target={props.target}
          segment={segment}
          ixns={props.ixns.filter((ixn) => ixn.segmentId === segment.id)}
          key={index}
          postSegment={handlePostSegment}
          postIxn={handlePostIxn}
          deleteIxn={handleDeleteIxn}
          tgtAnalyst={props.tgtAnalyst}
          setTgtAnalyst={props.setTgtAnalyst}
          setAddSegment={setAddSegment}
          deleteSegment={handleDeleteSegment}
          editSegment={editSegment}
          setEditSegment={handleEditSegment}
          editIxn={editIxn}
          setEditIxn={handleEditIxn}
          addingOrEditing={addingOrEditing}
          autofocus={props.autofocus}
          collapsed={props.collapsedSegments.includes(segment.id as number)}
          setCollapsed={props.collapse}
          userName={props.userName}
          dateString={props.dateString}
          addNote={addNote}
          setAddNote={handleAddNote}
          readOnly={props.readOnly}
        />,
    );
  }

  return (
    <div className={'ixn-dash-body'}>
      {props.segments.length > 0 ?
        <StyledTableHeader
          headers={['Exploit Analyst', 'Time', 'Callout', 'Track ID', 'Track Analyst', 'Track Status', 'Lead Checker',
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
            target={props.target}
            segment={null}
            postSegment={handlePostSegment}
            postIxn={handlePostIxn}
            deleteSegment={handleDeleteSegment}
            setAddSegment={setAddSegment}
            hasIxns={false}
            setEdit={handleEditSegment}
            editing={true}
            disabled={false}
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
          borderColor={theme.color.primaryButton}
          bgcolor={theme.color.backgroundModal}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingRight={0.45}
          paddingLeft={1.8}
          fontSize={12}
          onClick={() => {
            if (!props.readOnly) {
              setAddSegment(true);
              setTimeout(() => {
                let scrollToLocation = document.getElementById('ixn-table-scrollable-region');
                if (scrollToLocation !== null) {
                  scrollToLocation!.scrollTo(0, scrollToLocation!.scrollHeight);
                }
              }, 50);
            }
          }}
          className={classNames(
            'add-segment-button',
            'no-select',
            (addSegment && editSegment < 0) || props.readOnly ? 'disabled' : null,
          )}
        >
          Add Segment
          <ExploitationLogButtonVectorSmall/>
        </Box>
        {/*Prevents user from tabbing out of page to address bar*/}
        <input className={'hidden-input'}/>
      </div>
    </div>
  );
};
