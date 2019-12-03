import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRowInformationSection } from './RFIRowInformationSection';
import React from 'react';
import RFIModel, { RFIStatus } from '../RFIModel';
import moment from 'moment';

describe('RFIRowInformationSection', () => {
  let subject: ShallowWrapper;

  beforeEach(() => {
    let rfi = new RFIModel('2020-00123', 'google.com', RFIStatus.OPEN, '1 FW', moment('2019-11-20').utc(), 'CAN', 'hi');
    subject = shallow(
      <RFIRowInformationSection
        rfi={rfi}
      />
    )
  });

  it('should format an ID to shorthand format', () => {
    expect(subject.find('.cell--id').text()).toBe('20-123');
  });

  it('should contain the RFI customer', () => {
    expect(subject.find('.cell--customer').text()).toBe('1 FW');
  });

  it('should contain the RFI LTIOV or dash', () => {
    expect(subject.find('.cell--ltiov').text()).toBe('20 NOV 19');

    let rfi = new RFIModel('2020-00123', 'google.com', RFIStatus.OPEN, '1 FW', undefined, 'CAN', 'hi');
    subject = shallow(
      <RFIRowInformationSection
        rfi={rfi}
      />
    );
    expect(subject.find('.cell--ltiov').text()).toBe('-');
  });

  it('should contain the RFI country code', () => {
    expect(subject.find('.cell--country').text()).toBe('CAN');
  });

  it('should contain the RFI request text', () => {
    expect(subject.find('.cell--requestText').text()).toBe('hi');
  });
});
