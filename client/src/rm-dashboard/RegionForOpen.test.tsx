import { shallow, ShallowWrapper } from 'enzyme';
import RFIModel from './RFIModel';
import React from 'react';
import { StyledRFIRegionDivider } from './RFIRegionDivider';
import { RegionForOpen } from './RegionForOpen';
import { StyledRFIRowOpen } from './row--open/RFIRowOpen';

describe('RegionForOpen', () => {
  let subject: ShallowWrapper;

  let rfis = [
    new RFIModel('2019-321', 'google.com', 'OPEN', 534345),
    new RFIModel('2019-322', 'yahoo.com', 'OPEN', 4553454)
  ];

  beforeEach(() => {
    subject = shallow(
      <RegionForOpen rfis={rfis}/>
    )
  });
  it('should have a region divider', () => {
    expect(subject.find(StyledRFIRegionDivider).exists()).toBeTruthy();
  });

  it('should display a list of Open RFIs if given', () => {
    expect(subject.text()).not.toContain(
      'No Open found'
    );
    expect(subject.find(StyledRFIRowOpen).length).toBe(2);
  });

  it('should display a message when no RFIs given', () => {
    subject = shallow(
      <RegionForOpen rfis={[]}/>
    );
    expect(subject.find('.region--open').text()).toContain(
      'No Open found'
    );
  });

});
