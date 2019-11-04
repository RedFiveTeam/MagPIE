import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { RFITable } from './RFITable';
import { StyledRegionForPending } from './RegionForPending';
import { StyledRFITableHeader } from './RFITableHeader';


describe('DisplayFact', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RFITable
        rfis={[]}
      />
    );
  });

  it('should display a header', () => {
    expect(subject.find(StyledRFITableHeader).exists()).toBeTruthy();
  });

  it('should contain a region for pending RFIs', () => {
    expect(subject.find(StyledRegionForPending).exists()).toBeTruthy();
  });
});
