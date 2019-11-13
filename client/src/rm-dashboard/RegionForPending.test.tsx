import { shallow, ShallowWrapper } from 'enzyme';
import { RegionForPending } from './RegionForPending';
import RFIModel from './RFIModel';
import React from 'react';
import { StyledRFIRegionDivider } from './RFIRegionDivider';
import { StyledRFIRowPending } from './row--pending/RFIRowPending';

describe('RegionForPending', () => {
  let subject: ShallowWrapper;

  let rfis = [
    new RFIModel('2019-321', 'google.com', 'NEW', 424123),
    new RFIModel('2019-322', 'yahoo.com', 'NEW', 435435543)
  ];

  beforeEach(() => {
    subject = shallow(
      <RegionForPending rfis={rfis}/>
    )
  });
  it('should have a region divider', () => {
    expect(subject.find(StyledRFIRegionDivider).exists()).toBeTruthy();
  });

  it('should display a list of Pending RFIs if given', () => {
    expect(subject.text()).not.toContain(
      'Congratulations! Your team opened all the new RFIs in GETS.'
    );
    expect(subject.find(StyledRFIRowPending).length).toBe(2);
  });

  it('should display a confirmation message when no RFIs given', () => {
    subject = shallow(
      <RegionForPending rfis={[]}/>
    );
    expect(subject.find('.region--pending').text()).toContain(
      'Congratulations! Your team opened all the new RFIs in GETS.'
    );
  });

});
