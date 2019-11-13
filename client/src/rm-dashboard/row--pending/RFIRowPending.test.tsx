import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRowPending } from './RFIRowPending';
import RFIModel from '../RFIModel';
import React from 'react';
import { StyledRFIRowInformationSection } from './RFIRowInformationSection';
import { StyledRFIRowButtonSection } from './RFIRowButtonSection';

describe('RFIRowPending', () => {
  let rfi: RFIModel;
  let subject: ShallowWrapper;

  beforeEach(() => {
    rfi = new RFIModel('2019-321', 'google.com', 'pending');

    subject = shallow(
      <RFIRowPending rfi={rfi} index={0}/>
    )
  });

  it('should display RFI information', () => {
    expect(subject.find(StyledRFIRowInformationSection).exists()).toBeTruthy();
    expect(subject.find(StyledRFIRowButtonSection).exists()).toBeTruthy();
  });
});
