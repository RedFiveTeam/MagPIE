import { shallow, ShallowWrapper } from 'enzyme';
import { RFIRowInformationSection } from './RFIRowInformationSection';
import React from 'react';
import RFIModel, { RFIStatus } from '../RFIModel';
import moment from 'moment';
import IconShowMore from '../../resources/ShowMoreVector';

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
    expect(subject.find('.cell--description').text()).toBe('hi');
  });

  it('should have a see more button', () => {

    let rfi = new RFIModel('2020-00123', 'google.com', RFIStatus.OPEN, '1 FW', undefined, 'CAN', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
    subject = shallow(
      <RFIRowInformationSection
        rfi={rfi}
      />
    );

    expect(subject.find('.section--information').text().toLowerCase()).toContain('see more');
  });
});
