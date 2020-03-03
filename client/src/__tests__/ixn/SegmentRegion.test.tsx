import '../../setupEnzyme';
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TargetModel } from '../../store/tgt/TargetModel';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { SegmentRegion } from '../../dashboard/ixn/table/SegmentRegion';
import { StyledSegmentDivider } from '../../dashboard/ixn/table/SegmentDivider';
import IxnModel from '../../store/ixn/IxnModel';
import { StyledIxnRow } from '../../dashboard/ixn/table/IxnRow';

describe("Segment Region", () => {
  const moment = require('moment');
  let subject: ShallowWrapper;
  let target: TargetModel = new TargetModel(1, 1, 1, 'WER19-123', '19XCV1234567890', '', '');
  let segment: SegmentModel = new SegmentModel(1, 1, 1, 1, moment(0), moment(1));
  let interactions: IxnModel[] = [
    new IxnModel(1, 1, 1, 1, 1, "Bob", moment(0), "Bob did stuff", "123-123"),
    new IxnModel(2, 1, 1, 1, 1, "Bob", moment(0), "Bob did stuff", "123-123"),
  ];
  subject = shallow(
    <SegmentRegion
      target={target}
      segment={segment}
      ixns={interactions}
      postSegment={(segment: SegmentModel) => {}}
      postIxn={(ixn: IxnModel) => {}}
      deleteIxn={(ixn: IxnModel) => {}}
      tgtAnalyst={''}
      setTgtAnalyst={(tgtAnalyst) => {}}
      deleteSegment={(segment: SegmentModel) => {}}
      setAddSegment={(addSegment: boolean) => {}}
    />
  );

  it('should display the segment divider', () => {
    expect(subject.find(StyledSegmentDivider).exists()).toBeTruthy();
    expect(subject.find(StyledSegmentDivider).props().segment).toEqual(segment);
  });

  it('should display a ixn input row', () => {
    expect(subject.find(StyledIxnRow).exists()).toBeTruthy();
  });

  it('should display the ixn given to it', () => {
    expect(subject.find(StyledIxnRow).length).toEqual(3);
  });
});
