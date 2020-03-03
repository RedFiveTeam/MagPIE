import '../../setupEnzyme';
import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { TargetModel } from '../../store/tgt/TargetModel';
import { SegmentDivider } from '../../dashboard/ixn/table/SegmentDivider';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import IxnModel from '../../store/ixn/IxnModel';

describe("Segment Divider", () => {
  const moment = require('moment');
  let subject: ReactWrapper;
  let submitSegmentSpy: jest.Mock = jest.fn();
  let target: TargetModel = new TargetModel(1, 1, 1, 'SDT12-123', '12QWE1231231231', 'These are the notes', 'This is a description');
  let segment: SegmentModel = new SegmentModel(1, 1, 1, 1,
    moment.unix(
        12 * 3600 + //HH
        34 * 60 + //MM
        56 //SS
    ).utc(),
     moment.unix(
         13 * 3600 + //HH
         2 * 60 + //MM
         0 //SS
    ).utc()
  );
  let deleteSegmentSpy: jest.Mock = jest.fn();

  beforeEach(() => {
    subject = mount(
      <SegmentDivider
        target={target}
        segment={segment}
        postSegment={submitSegmentSpy}
        postIxn={(ixn: IxnModel) => {}}
        deleteSegment={deleteSegmentSpy}
        setAddSegment={(addSegment: boolean) => {}}
        hasIxns={false}
      />
    );
  });

  it('should display the segments given to it', () => {
    expect(subject.find('.segment-start').text()).toContain('12:34:56Z');
    expect(subject.find('.segment-end').text()).toContain('13:02:00Z');
  });

  it('should contain a delete and edit button that call functions appropriately', () => {
    expect(subject.find('.delete-segment').exists()).toBeTruthy();
    expect(subject.find('.edit-segment').exists()).toBeTruthy();
    subject.find('.delete-segment').at(0).simulate('click');
    expect(deleteSegmentSpy).toHaveBeenCalledWith(segment);
  });
});
