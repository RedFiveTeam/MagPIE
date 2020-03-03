import * as React from 'react';
import { StyledSegmentDivider } from './SegmentDivider';
import styled from 'styled-components';
import { TargetModel } from '../../../store/tgt/TargetModel';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import IxnModel from '../../../store/ixn/IxnModel';
import { StyledIxnRow } from './IxnRow';

interface MyProps {
  target: TargetModel;
  segment: SegmentModel;
  ixns: IxnModel[];
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  postSegment: (segment: SegmentModel) => void;
  deleteSegment: (segment: SegmentModel) => void;
  tgtAnalyst: string;
  setTgtAnalyst: (tgtAnalyst: string) => void;
  setAddSegment: (addSegment: boolean) => void;
  editSegment: number;
  setEditSegment: (segmentId: number) => void;
  className?: string;
}

export const SegmentRegion: React.FC<MyProps> = (props) => {

  const printRows = () => {
    let ixns: (IxnModel | null)[] = props.ixns;
    if (!ixns.includes(null))
      ixns.push(null); //input row--mapped to force a re-render

    return ixns.map((ixn: IxnModel | null, index: number) =>
      <StyledIxnRow
        ixn={ixn}
        key={index}
        segment={props.segment}
        postIxn={props.postIxn}
        deleteIxn={props.deleteIxn}
        tgtAnalyst={props.tgtAnalyst}
        setTgtAnalyst={props.setTgtAnalyst}
      />,
    )
  };

  return (
    <div className={props.className}>
      <StyledSegmentDivider
        target={props.target}
        segment={props.segment}
        postSegment={props.postSegment}
        postIxn={props.postIxn}
        deleteSegment={props.deleteSegment}
        setAddSegment={props.setAddSegment}
        hasIxns={props.ixns.length > 0}
        editing={props.editSegment === props.segment.id}
        setEdit={props.setEditSegment}
      />
      {printRows()}
    </div>
  );
};

export const StyledSegmentRegion = styled(SegmentRegion)`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
