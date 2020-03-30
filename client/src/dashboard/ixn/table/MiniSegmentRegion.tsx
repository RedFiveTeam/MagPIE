import * as React from 'react';
import styled from 'styled-components';
import { SegmentModel } from '../../../store/tgtSegment/SegmentModel';
import IxnModel from '../../../store/ixn/IxnModel';
import { StyledMiniSegmentDivider } from './MiniSegmentDivider';
import { StyledMiniIxnRow } from './MiniIxnRow';

interface MyProps {
  segment: SegmentModel;
  ixns: IxnModel[];
  className?: string;
}

export const MiniSegmentRegion: React.FC<MyProps> = (props) => {

  const printRows = () => {
    return props.ixns.map((ixn: IxnModel, index: number) =>
                        <StyledMiniIxnRow
                          ixn={ixn}
                          key={index}
                        />,
    );
  };

  return (
    <div className={props.className}>
      <StyledMiniSegmentDivider
        segment={props.segment}
      />
      {printRows()}
    </div>
  );
};

export const StyledMiniSegmentRegion = styled(MiniSegmentRegion)`
  display:flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
