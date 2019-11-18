import { shallow, ShallowWrapper } from 'enzyme';
import RFIModel from '../RFIModel';
import React from 'react';
import { StyledRFIRegionDivider } from '../rfi-table/RFIRegionDivider';
import { RegionForClosed } from './RegionForClosed';
import { StyledRFIRowClosed } from './row--closed/RFIRowClosed';

describe('RegionForClosed', () => {
  let subject: ShallowWrapper;

  let rfis = [
    new RFIModel('2019-321', 'google.com', 'CLOSED', 321455432, "1 FW"),
    new RFIModel('2019-322', 'yahoo.com', 'CLOSED', 421334, "1 FW"),
    new RFIModel('2019-323', 'aol.com', 'CLOSED', 5234543, "1 FW")
  ];

  beforeEach(() => {
    subject = shallow(
      <RegionForClosed rfis={rfis}/>
    )
  });
  it('should have a region divider', () => {
    expect(subject.find(StyledRFIRegionDivider).exists()).toBeTruthy();
  });

  it('should display a list of three recently closed RFIs if given', () => {
    expect(subject.text()).not.toContain(
      'Congratulations! Your team completed all the RFIs. #DGS-YES'
    );
    expect(subject.find(StyledRFIRowClosed).length).toBe(3);
  });
});
