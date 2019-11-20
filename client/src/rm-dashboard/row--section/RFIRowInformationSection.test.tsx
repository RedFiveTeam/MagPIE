import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRowInformationSection } from './RFIRowInformationSection';
import React from 'react';
import RFIModel from '../RFIModel';

describe('RFIRowInformationSection', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    subject = shallow(
      <RFIRowInformationSection rfi={new RFIModel('2020-00123', 'google.com', 'OPEN', 57483902, '1 FW', 1574259539,
        'CAN')}/>
    )
  });

  it('should format an ID to shorthand format', () => {
    expect(subject.find('.cell--id').text()).toBe('20-123');
  });

  it('should contain the RFI unit', () => {
    expect(subject.find('.cell--unit').text()).toBe('1 FW');
  });

  it('should contain the RFI LTIOV', () => {
    expect(subject.find('.cell--ltiov').text()).toBe('20 NOV 19');
  });

  it('should contain the RFI country code', () => {
    expect(subject.find('.cell--country').text()).toBe('CAN');
  });
});
