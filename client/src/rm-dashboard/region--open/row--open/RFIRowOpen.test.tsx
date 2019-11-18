import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRowOpen } from './RFIRowOpen';
import RFIModel from '../../RFIModel';
import React from 'react';
import { StyledRFIRowInformationSection } from '../../row--section/RFIRowInformationSection';
import { StyledRFIRowButtonSection } from '../../row--section/RFIRowButtonSection';

describe('RFIRowOpen', () => {
  let rfi: RFIModel;
  let subject: ShallowWrapper;

  beforeEach(() => {
    rfi = new RFIModel('2019-321', 'google.com', 'open', 1234567, '633 ABW');

    subject = shallow(
      <RFIRowOpen rfi={rfi} index={0}/>
    )
  });

  it('should display RFI information', () => {
    expect(subject.find(StyledRFIRowInformationSection).exists()).toBeTruthy();
    expect(subject.find(StyledRFIRowButtonSection).exists()).toBeTruthy();
  });
});
