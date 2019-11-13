import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRowClosed } from './RFIRowClosed';
import RFIModel from '../RFIModel';
import React from 'react';
import { StyledRFIRowInformationSection } from '../row--pending/RFIRowInformationSection';
import { StyledRFIRowButtonSection } from '../row--pending/RFIRowButtonSection';

describe('RFIRowPending', () => {
  let rfi: RFIModel;
  let subject: ShallowWrapper;

  beforeEach(() => {
    rfi = new RFIModel('2019-321', 'google.com', 'pending', 9873948734);

    subject = shallow(
      <RFIRowClosed rfi={rfi} index={0}/>
    )
  });

  it('should display RFI information', () => {
    expect(subject.find(StyledRFIRowInformationSection).exists()).toBeTruthy();
    expect(subject.find(StyledRFIRowButtonSection).exists()).toBeTruthy();
  });
});
