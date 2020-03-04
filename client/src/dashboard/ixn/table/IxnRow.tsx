import * as React from 'react';
import styled from 'styled-components';
import IxnModel from '../../../store/ixn/IxnModel';
import { Box } from '@material-ui/core';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import classNames from 'classnames';
import { IxnDeleteButton } from './IxnDeleteButton';

interface MyProps {
  ixn: IxnModel;
  segment: SegmentModel;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  setEditIxn: (ixnId: number) => void;
  className?: string;
}

export const IxnRow: React.FC<MyProps> = props => {

  const handleDeleteClick = () => {
    props.deleteIxn(props.ixn);
  };

  const handleDoubleClick = () => {
    props.setEditIxn(props.ixn.id!);
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
`;
