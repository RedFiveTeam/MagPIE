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
  postSegment: (segment: SegmentModel) => void;
  postIxn: (ixn: IxnModel) => void;
  deleteIxn: (ixn: IxnModel) => void;
  className?: string;
}

export const SegmentRegion: React.FC<MyProps> = (props) => {

  const printRows = () => {
    return props.ixns.map((ixn: IxnModel, index: number) =>
      <StyledIxnRow
        ixn={ixn}
        key={index}
        segment={props.segment}
        postIxn={props.postIxn}
        deleteIxn={props.deleteIxn}
      />
    )
  };

  return (
    <div className={props.className}>
      <StyledSegmentDivider
        target={props.target}
        segment={props.segment}
        postSegment={props.postSegment}
        postIxn={props.postIxn}
      />
      {printRows()}
      <StyledIxnRow
        ixn={null}
        segment={props.segment}
        postIxn={props.postIxn}
        deleteIxn={props.deleteIxn}
      />
    </div>
  );
};

export const StyledSegmentRegion = styled(SegmentRegion)`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;