import '../../setupEnzyme';
import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { IxnRow } from '../../dashboard/ixn/table/IxnRow';
import IxnModel from '../../store/ixn/IxnModel';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';

describe('IxnRow', () => {
  const moment = require('moment');
  let subject: ReactWrapper;
  let ixn = new IxnModel(1, 1, 1, 1, 1,
    'Billy Bob',
    moment(
      (5 * 3600 +
        30 * 60 +
        15) * 1000),
    'Dudes did stuff',
    '123-234');

  let segment = new SegmentModel(1, 1, 1, 1,
    moment(
      (4 * 3600 +
        30 * 60 +
        15) * 1000),
    moment(
      (6 * 3600 +
        30 * 60 +
        15) * 1000)
  );

  it('should display the info given to it', () => {
    subject = mount(
      <IxnRow
        ixn={ixn}
        segment={segment}
        postIxn={(ixn: IxnModel) => {}}
      />
    );

    expect(subject.find('.exploit-analyst').text()).toContain('Billy Bob');
    expect(subject.find('.time').text()).toContain('05:30:15Z');
    expect(subject.find('.activity').text()).toContain('Dudes did stuff');
    expect(subject.find('.track').text()).toContain('123-234');
  });
});