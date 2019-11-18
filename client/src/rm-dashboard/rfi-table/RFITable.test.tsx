import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { RFITable } from './RFITable';
import { StyledRegionForPending } from '../region--pending/RegionForPending';
import { StyledRFITableHeader } from './RFITableHeader';
import { StyledRegionForClosed } from '../region--closed/RegionForClosed';
import { StyledRegionForOpen } from '../region--open/RegionForOpen';


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

  it('should contain three regions for RFIs', () => {
    expect(subject.find(StyledRegionForPending).exists()).toBeTruthy();
    expect(subject.find(StyledRegionForClosed).exists()).toBeTruthy();
    expect(subject.find(StyledRegionForOpen).exists()).toBeTruthy();
  });
});
