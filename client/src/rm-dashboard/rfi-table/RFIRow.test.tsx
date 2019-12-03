import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRow } from './RFIRow';
import RFIModel, { RFIStatus } from '../RFIModel';
import moment from 'moment';
import React from 'react';
import { StyledRFIRowInformationSection } from './RFIRowInformationSection';
import { StyledRFIRowButtonSection } from './RFIRowButtonSection';

describe('RFIRow', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RFIRow rfi={new RFIModel('id', 'url', RFIStatus.PENDING, 'customer', moment(), 'country', 'hi')}/>
    )
  });

  it('should display RFI information', () => {
    expect(subject.find(StyledRFIRowInformationSection).exists()).toBeTruthy();
    expect(subject.find(StyledRFIRowButtonSection).exists()).toBeTruthy();
  });
});
