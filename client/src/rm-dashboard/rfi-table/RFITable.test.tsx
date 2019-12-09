import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { StyledRegion } from './Region';
import { StyledRFITableHeader } from './RFITableHeader';
import { RFITable } from './RFITable';

describe('RFITable', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RFITable
        pendingRfis={[]}
        openRfis={[]}
        closedRfis={[]}
      />
    );
  });

  it('should display a header', () => {
    expect(subject.find(StyledRFITableHeader).exists()).toBeTruthy();
  });

  it('should contain three regions for RFIs', () => {
    expect(subject.find(StyledRegion).length).toBe(3);
  });
});
