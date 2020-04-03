import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { IxnRow } from '../../dashboard/ixn/table/IxnRow';
import IxnModel, { IxnStatus } from '../../store/ixn/IxnModel';
import { SegmentModel } from '../../store/tgtSegment/SegmentModel';
import { SnackbarProvider } from 'notistack';

describe('IxnRow', () => {
  const moment = require('moment');
  let subject: ReactWrapper;
  let ixn = new IxnModel(1, 1, 1, 1, 1, 'Billy Bob', moment(
    (5 * 3600 +
      30 * 60 +
      15) * 1000), 'Dudes did stuff', '123-234', '', IxnStatus.NOT_STARTED, '', '', "");

  let segment = new SegmentModel(1, 1, 1, 1,
    moment(
      (4 * 3600 +
        30 * 60 +
        15) * 1000),
    moment(
      (6 * 3600 +
        30 * 60 +
        15) * 1000),
  );

  it('should display the info given to it', () => {
    subject = mount(
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={15000}
        hideIconVariant
      >
        <IxnRow
          ixn={ixn}
          segment={segment}
          postIxn={jest.fn()}
          deleteIxn={jest.fn()}
          tgtAnalyst={''}
          setTgtAnalyst={jest.fn()}
          setEditIxn={jest.fn()}
          addingOrEditing={false}
          dateString={'12DEC12'}
          userName={'billy'}
        />
      </SnackbarProvider>
    );

    expect(subject.find('.exploit-analyst').text()).toContain('Billy Bob');
    expect(subject.find('.time').text()).toContain('05:30:15Z');
    expect(subject.find('.activity').text()).toContain('Dudes did stuff');
    expect(subject.find('.track').text()).toContain('123-234');
  });
});
